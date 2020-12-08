const filterData = require("./filterData");
const products = require("../entities").products;

module.exports = (result, filters) => {
  const filteredDailyData = filterData(result, filters);
  const agg = products.reduce((acc, prod) => {
    acc[prod.id] = {
      id: prod.id,
      name: prod.name,
      spend: 0,
      target: 0,
      revenue: 0,
      clicks: 0,
      impressions: 0,
      transactions: 0,
      isProdPresent: false,
    };
    return acc;
  }, {});

  for (let i = 0; i < filteredDailyData.length; i++) {
    agg[filteredDailyData[i].product]["spend"] += filteredDailyData[i]["spend"];
    agg[filteredDailyData[i].product]["target"] +=
      filteredDailyData[i]["target"];
    agg[filteredDailyData[i].product]["revenue"] +=
      filteredDailyData[i]["revenue"];
    agg[filteredDailyData[i].product]["clicks"] +=
      filteredDailyData[i]["clicks"];
    agg[filteredDailyData[i].product]["impressions"] +=
      filteredDailyData[i]["impressions"];
    agg[filteredDailyData[i].product]["transactions"] +=
      filteredDailyData[i]["transactions"];
  }

  return Object.values(agg).map(item => ({
    ...item,
    ...{
      ctr:
        +item["impressions"] === 0
          ? +(0).toFixed(2)
          : +((+item["clicks"] / +item["impressions"]) * 100).toFixed(2),
      cpt:
        +item["transactions"] === 0
          ? +(0).toFixed(2)
          : +(item["spend"] / item["transactions"]).toFixed(2),
      cvr:
        +item["clicks"] === 0
          ? +(0).toFixed(2)
          : +(+item["transactions"] / +item["clicks"]).toFixed(2),
      roas:
        +item["spend"] === 0
          ? +(0).toFixed(2)
          : +(+item["revenue"] / +item["spend"]).toFixed(2),
    },
  }));
};
