const filterData = require("./filterData");
const { channels } = require("../entities");

module.exports = (dailyGenData, selectedFilters) => {
  const filteredDailyData = filterData(dailyGenData, selectedFilters);
  const agg = {
    spend: 0,
    leads: 0,
    prospects: 0,
    applications: 0,
    va: 0,
    cpl: 0,
    cpp: 0,
    cpa: 0,
    cpva: 0,
  };

  const responseObj = channels.reduce((acc, channel) => {
    acc[channel.id] = { ...agg, ...channel };
    return acc;
  }, {});

  for (let i = 0; i < filteredDailyData.length; i++) {
    const data = filteredDailyData[i];
    responseObj[data["channels"]]["spend"] += +data["spend"];
    responseObj[data["channels"]]["leads"] += +data["leads"];
    responseObj[data["channels"]]["prospects"] += +data["prospects"];
    responseObj[data["channels"]]["applications"] += +data["applications"];
    responseObj[data["channels"]]["va"] += +data["va"];
  }

  for (let i = 0; i < channels.length; i++) {
    const id = channels[i].id;
    responseObj[id]["cpl"] = +(
      responseObj[id]["spend"] / responseObj[id]["leads"] || 0
    ).toFixed(2);
    responseObj[id]["cpp"] = +(
      responseObj[id]["spend"] / responseObj[id]["prospects"] || 0
    ).toFixed(2);
    responseObj[id]["cpa"] = +(
      responseObj[id]["spend"] / responseObj[id]["applications"] || 0
    ).toFixed(2);
    responseObj[id]["cpva"] = +(
      responseObj[id]["spend"] / responseObj[id]["va"] || 0
    ).toFixed(2);
  }

  const response = Object.values(responseObj).filter(chl =>
    selectedFilters.channelIds.includes(chl.id.toString())
  );

  return response;
};
