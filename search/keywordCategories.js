const filterData = require("./filterData");
const campaigns = require("../entities").campaigns;

module.exports = (data, filters) => {
  const filteredDailyData = filterData(data, filters);
  const distinctKeywordCategories = Array.from(
    new Set(campaigns.filter(c => !!c.keywordCat).map(c => c.keywordCat))
  );

  const agg = distinctKeywordCategories.reduce((acc, keywordCategory) => {
    acc[keywordCategory] = {
      ...{ keyword_category: keywordCategory },
      ...{
        spend: 0,
        leads: 0,
        clicks: 0,
        impressions: 0,
        prospects: 0,
        conversions: 0,
        va: 0,
        isItemPresent: false,
      },
    };
    return acc;
  }, {});
  for (let i = 0; i < filteredDailyData.length; i++) {
    if (agg[filteredDailyData[i].keywordCat]) {
      agg[filteredDailyData[i].keywordCat]["isItemPresent"] = true;
      agg[filteredDailyData[i].keywordCat]["spend"] +=
        filteredDailyData[i]["spend"];
      agg[filteredDailyData[i].keywordCat]["leads"] +=
        filteredDailyData[i]["leads"];
      agg[filteredDailyData[i].keywordCat]["prospects"] +=
        filteredDailyData[i]["prospects"];
      agg[filteredDailyData[i].keywordCat]["clicks"] +=
        filteredDailyData[i]["clicks"];
      agg[filteredDailyData[i].keywordCat]["impressions"] +=
        filteredDailyData[i]["impressions"];
      agg[filteredDailyData[i].keywordCat]["conversions"] +=
        filteredDailyData[i]["conversions"];
      agg[filteredDailyData[i].keywordCat]["va"] += filteredDailyData[i]["va"];
    }
  }

  return Object.values(agg)
    .filter(data => data.isItemPresent)
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
    }))
    .sort((a, b) => b.spend - a.spend);
};
