const { getDateColln, timeAggMap } = require("../helpers/dateUtils");
const { channels } = require("../entities");
const filterData = require("./filterData");

module.exports = (data, selectedFilters) => {
  const filteredDailyData = filterData(data, selectedFilters);
  const { startDate, endDate, timeAgg } = selectedFilters;
  const selectedChannels = channels.filter(ch =>
    selectedFilters.channelIds.includes(ch.id.toString())
  );
  if (!startDate || !endDate || !timeAgg) return [];
  const aggTimeFreq = [
    ...new Set(
      getDateColln(startDate, endDate).map(timeAggMap[timeAgg]["timeAggLabel"])
    ),
  ];
  const aggData = aggTimeFreq
    .map(t => {
      return (
        selectedChannels.length &&
        selectedChannels.reduce((acc, val) => {
          acc[val.id] = {
            ...val,
            ...{
              spend: 0,
              visits: 0,
              leads: 0,
              prospects: 0,
              applications: 0,
              va: 0,
              conversions: 0,
              cpv: 0,
              cpl: 0,
              cpp: 0,
              cpa: 0,
              cpva: 0,
              cpc: 0,
            },
            ...{
              [timeAgg]: t,
              name: val.name,
            },
          };
          return acc;
        }, {})
      );
    })
    .reduce((acc, val) => {
      if (val) acc[Object.values(val)[0][timeAgg]] = val;
      return acc;
    }, {});
  for (let i = 0; i < filteredDailyData.length; i++) {
    const dayData = filteredDailyData[i];
    const timeKey = timeAggMap[timeAgg]["timeAggLabel"](dayData.date);

    aggData[timeKey][dayData.channels]["leads"] += dayData["leads"];
    aggData[timeKey][dayData.channels]["visits"] += dayData["visits"];
    aggData[timeKey][dayData.channels]["spend"] += dayData["spend"];
    aggData[timeKey][dayData.channels]["applications"] +=
      dayData["applications"];
    aggData[timeKey][dayData.channels]["prospects"] += dayData["prospects"];
    aggData[timeKey][dayData.channels]["va"] += dayData["va"];
    aggData[timeKey][dayData.channels]["cpva"] += dayData["cpva"];
    aggData[timeKey][dayData.channels][timeAgg] = timeKey;
  }

  const aggregatedData = []
    .concat(...Object.values(aggData).map(channels => Object.values(channels)))
    .map(datum => {
      return Object.assign(
        datum,
        {
          cpv:
            datum["visits"] === 0
              ? +(0).toFixed(2)
              : +(datum["spend"] / datum["visits"]).toFixed(2),
          cpl:
            datum["leads"] === 0
              ? +(0).toFixed(2)
              : +(datum["spend"] / datum["leads"]).toFixed(2),
          cpp:
            datum["prospects"] === 0
              ? +(0).toFixed(2)
              : +(datum["spend"] / datum["prospects"]).toFixed(2),
          cpa:
            datum["applications"] === 0
              ? +(0).toFixed(2)
              : +((datum["spend"] / datum["applications"]) * 100).toFixed(2),
          cpva:
            datum["va"] === 0
              ? +(0).toFixed(2)
              : +((datum["spend"] / datum["va"]) * 1000).toFixed(2),
        },
        {
          [timeAgg]: +datum[timeAgg],
        }
      );
    });
  return aggregatedData;
};
