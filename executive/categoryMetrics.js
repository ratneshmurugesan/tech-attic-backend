const { getDateColln, timeAggMap } = require("../helpers/dateUtils");
const { categories } = require("../entities");
const filterData = require("./filterData");

module.exports = (data, selectedFilters) => {
  const filteredDailyData = filterData(data, selectedFilters);
  const { startDate, endDate, timeAgg } = selectedFilters;
  const selectedCategories = categories.filter(ch =>
    selectedFilters.categoryIds.includes(ch.id.toString())
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
        selectedCategories.length &&
        selectedCategories.reduce((acc, val) => {
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

    aggData[timeKey][dayData.categories]["leads"] += dayData["leads"];
    aggData[timeKey][dayData.categories]["visits"] += dayData["visits"];
    aggData[timeKey][dayData.categories]["spend"] += dayData["spend"];
    aggData[timeKey][dayData.categories]["applications"] +=
      dayData["applications"];
    aggData[timeKey][dayData.categories]["prospects"] += dayData["prospects"];
    aggData[timeKey][dayData.categories]["va"] += dayData["va"];
    aggData[timeKey][dayData.categories]["cpva"] += dayData["cpva"];
    aggData[timeKey][dayData.categories][timeAgg] = timeKey;
  }

  const aggregatedData = []
    .concat(
      ...Object.values(aggData).map(categories => Object.values(categories))
    )
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
