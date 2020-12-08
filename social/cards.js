const filterData = require("./filterData");

module.exports = (dailyGenData, selectedFilters) => {
  const filteredDailyData = filterData(dailyGenData, selectedFilters);
  const agg = {
    spend: 0,
    spend_target: 0,
    visits: 0,
    leads: 0,
    prospects: 0,
    applications: 0,
    applications_target: 0,
    va: 0,
    conversions: 0,
    cpv: 0,
    cpl: 0,
    cpp: 0,
    cpa: 0,
    cpva: 0,
    cpc: 0,
  };

  for (let i = 0; i < filteredDailyData.length; i++) {
    agg["visits"] += +filteredDailyData[i]["visits"];
    agg["spend"] += +filteredDailyData[i]["spend"];
    agg["spend_target"] += +filteredDailyData[i]["spend_target"];
    agg["leads"] += +filteredDailyData[i]["leads"];
    agg["prospects"] += +filteredDailyData[i]["prospects"];
    agg["applications"] += +filteredDailyData[i]["applications"];
    agg["applications_target"] += +filteredDailyData[i]["applications_target"];

    agg["va"] += +filteredDailyData[i]["va"];
    agg["conversions"] += +filteredDailyData[i]["conversions"];
  }
  agg["cpv"] = +(agg["spend"] / agg["visits"] || 0).toFixed(2);
  agg["cpl"] = +(agg["spend"] / agg["leads"] || 0).toFixed(2);
  agg["cpp"] = +(agg["spend"] / agg["prospects"] || 0).toFixed(2);
  agg["cpa"] = +(agg["spend"] / agg["applications"] || 0).toFixed(2);
  agg["cpva"] = +(agg["spend"] / agg["va"] || 0).toFixed(2);
  agg["cpc"] = +(agg["spend"] / agg["conversions"] || 0).toFixed(2);

  return [
    {
      visits: agg["visits"],
      spend: agg["spend"],
      spend_target: agg["spend_target"] - agg["spend"],

      leads: agg["leads"],
      applications: agg["applications"],
      applications_target: agg["applications_target"] - agg["applications"],

      prospects: agg["prospects"],
      va: agg["va"],

      conversions: agg["conversions"],

      cpv: agg["cpv"],
      cpl: agg["cpl"],
      cpp: agg["cpp"],
      cpa: agg["cpa"],
      cpva: agg["cpva"],
      cpc: agg["cpc"],
    },
  ];
};
