const filterData = require("./filterData");
const platforms = require("../entities").platforms;

module.exports = (result, filters) => {
  const filteredDailyData = filterData(result, filters);
  const agg = platforms
    .filter(pf => pf.channelId === 1) //extract Seach channel related platforms
    .reduce((acc, item) => {
      acc[item.id] = {
        id: item.id,
        name: item.name,
        spend: 0,
        leads: 0,
        clicks: 0,
        impressions: 0,
        prospects: 0,
        conversions: 0,
        va: 0,
        isPlatformPresent: false,
      };
      return acc;
    }, {});

  for (let i = 0; i < filteredDailyData.length; i++) {
    if (agg[filteredDailyData[i].platforms]) {
      agg[filteredDailyData[i].platforms]["isPlatformPresent"] = true;

      agg[filteredDailyData[i].platforms]["spend"] +=
        filteredDailyData[i]["spend"];
      agg[filteredDailyData[i].platforms]["leads"] +=
        filteredDailyData[i]["leads"];
      agg[filteredDailyData[i].platforms]["prospects"] +=
        filteredDailyData[i]["prospects"];
      agg[filteredDailyData[i].platforms]["clicks"] +=
        filteredDailyData[i]["clicks"];
      agg[filteredDailyData[i].platforms]["impressions"] +=
        filteredDailyData[i]["impressions"];
      agg[filteredDailyData[i].platforms]["conversions"] +=
        filteredDailyData[i]["conversions"];
      agg[filteredDailyData[i].platforms]["va"] += filteredDailyData[i]["va"];
    }
  }

  return Object.values(agg)
    .filter(prod => prod.isPlatformPresent)
    .map(item => ({
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
        cvr:
          +item["conversions"] === 0
            ? +(0).toFixed(2)
            : +(item["spend"] / item["conversions"]).toFixed(2),
        cpva:
          +item["va"] === 0
            ? +(0).toFixed(2)
            : (+item["spend"] / +item["va"]).toFixed(2),
      },
    }));
};
