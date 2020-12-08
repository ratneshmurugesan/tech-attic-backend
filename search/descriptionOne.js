const filterData = require("./filterData");

module.exports = (data, filters) => {
  const filteredDailyData = filterData(data, filters);
  const distinctDescriptionOnes = [
    ...new Set(filteredDailyData.map(datum => datum.descriptionOne)),
  ].filter(descriptionOne => !!descriptionOne);
  const agg = distinctDescriptionOnes.reduce((acc, val) => {
    acc[val] = {
      name: val,
      spend: 0,
      leads: 0,
      clicks: 0,
      impressions: 0,
      prospects: 0,
      conversions: 0,
      va: 0,
    };
    return acc;
  }, {});

  for (let i = 0; i < filteredDailyData.length; i++) {
    if (!filteredDailyData[i].descriptionOne) continue;
    agg[filteredDailyData[i].descriptionOne]["spend"] +=
      filteredDailyData[i]["spend"];
    agg[filteredDailyData[i].descriptionOne]["clicks"] +=
      filteredDailyData[i]["clicks"];
    agg[filteredDailyData[i].descriptionOne]["leads"] +=
      filteredDailyData[i]["leads"];
    agg[filteredDailyData[i].descriptionOne]["impressions"] +=
      filteredDailyData[i]["impressions"];
    agg[filteredDailyData[i].descriptionOne]["prospects"] +=
      filteredDailyData[i]["prospects"];
    agg[filteredDailyData[i].descriptionOne]["conversions"] +=
      filteredDailyData[i]["conversions"];
    agg[filteredDailyData[i].descriptionOne]["va"] +=
      filteredDailyData[i]["va"];
  }

  return Object.values(agg).map(item => ({
    ...item,
    ...{
      ctr:
        +item["impressions"] === 0
          ? +(0).toFixed(2)
          : +((+item["clicks"] / +item["impressions"]) * 100).toFixed(2),
      cpc:
        +item["conversions"] === 0
          ? +(0).toFixed(2)
          : +(+item["spend"] / +item["conversions"]).toFixed(2),
      cpva:
        +item["va"] === 0
          ? +(0).toFixed(2)
          : +(+item["spend"] / +item["va"]).toFixed(2),
    },
  }));
};
