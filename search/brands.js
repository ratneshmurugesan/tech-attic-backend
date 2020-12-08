const filterData = require("./filterData");
const brandNonbrand = require("../entities").brandNonBrand;

module.exports = (dailyGen, selectedFilters) => {
  const filteredDailyData = filterData(dailyGen, selectedFilters);
  const agg = brandNonbrand.reduce((acc, item) => {
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
      isItemPresent: false,
    };
    return acc;
  }, {});

  for (let i = 0; i < filteredDailyData.length; i++) {
    agg[filteredDailyData[i].brand]["isItemPresent"] = true;
    agg[filteredDailyData[i].brand]["spend"] += filteredDailyData[i]["spend"];
    agg[filteredDailyData[i].brand]["leads"] += filteredDailyData[i]["leads"];
    agg[filteredDailyData[i].brand]["prospects"] +=
      filteredDailyData[i]["prospects"];
    agg[filteredDailyData[i].brand]["clicks"] += filteredDailyData[i]["clicks"];
    agg[filteredDailyData[i].brand]["impressions"] +=
      filteredDailyData[i]["impressions"];
    agg[filteredDailyData[i].brand]["conversions"] +=
      filteredDailyData[i]["conversions"];
    agg[filteredDailyData[i].brand]["va"] += filteredDailyData[i]["va"];
  }

  return Object.values(agg)
    .filter(prod => prod.isItemPresent)
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
