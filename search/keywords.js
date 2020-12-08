const filterData = require("./filterData");
const campaigns = require("../entities").campaigns;
const keywords = require("../entities").keywords;

module.exports = (data, filters) => {
  const filteredDailyData = filterData(data, filters);
  const distinctKeywordCats = Array.from(
    new Set(campaigns.filter(c => !!c.keyword).map(c => c.keyword))
  );
  const distinctKeywordTexts = Array.from(
    new Set(
      campaigns
        .filter(c => !!c.keyword_text)
        .map(c => ({ keyword_text: c.keyword_text, id: c.keyword }))
    )
  );
  const agg = distinctKeywordCats.reduce((acc, keyword) => {
    acc[keyword] = {
      ...{
        name: distinctKeywordTexts.filter(textObj => textObj.id === keyword)[0]
          .keyword_text,
        keyword_category: keywords.filter(obj => obj.id === keyword)[0].name,
      },
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
    agg[filteredDailyData[i].keyword]["isItemPresent"] = true;
    agg[filteredDailyData[i].keyword]["keyword_category"] =
      filteredDailyData[i]["keywordCat"];
    agg[filteredDailyData[i].keyword]["spend"] += filteredDailyData[i]["spend"];
    agg[filteredDailyData[i].keyword]["leads"] += filteredDailyData[i]["leads"];
    agg[filteredDailyData[i].keyword]["prospects"] +=
      filteredDailyData[i]["prospects"];
    agg[filteredDailyData[i].keyword]["clicks"] +=
      filteredDailyData[i]["clicks"];
    agg[filteredDailyData[i].keyword]["impressions"] +=
      filteredDailyData[i]["impressions"];
    agg[filteredDailyData[i].keyword]["conversions"] +=
      filteredDailyData[i]["conversions"];
    agg[filteredDailyData[i].keyword]["va"] += filteredDailyData[i]["va"];
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
