const filterData = require("./filterData");

module.exports = (result, filters) => {
  const filteredDailyData = filterData(result, filters);

  const aggData = filteredDailyData.reduce((acc, dma) => {
    acc[dma.dma_name] = {
      spend: 0,
      leads: 0,
      clicks: 0,
      conversions: 0,
      impressions: 0,
      applications: 0,
      prospects: 0,
      va: 0,
    };
    return acc;
  }, {});

  for (let i = 0; i < filteredDailyData.length; i++) {
    aggData[filteredDailyData[i].dma_name].spend += filteredDailyData[i].spend;
    aggData[filteredDailyData[i].dma_name].leads += filteredDailyData[i].leads;
    aggData[filteredDailyData[i].dma_name].clicks +=
      filteredDailyData[i].clicks;
    aggData[filteredDailyData[i].dma_name].conversions +=
      filteredDailyData[i].conversions;
    aggData[filteredDailyData[i].dma_name].impressions +=
      filteredDailyData[i].impressions;
    aggData[filteredDailyData[i].dma_name].applications +=
      filteredDailyData[i].applications;
    aggData[filteredDailyData[i].dma_name].prospects +=
      filteredDailyData[i].prospects;
    aggData[filteredDailyData[i].dma_name].va += filteredDailyData[i].va;
  }

  Object.keys(aggData).map(dma =>
    Object.assign(aggData[dma], {
      ctr:
        aggData[dma]["impressions"] > 0
          ? (aggData[dma]["clicks"] / aggData[dma]["impressions"]) * 100
          : 0,
      cpa:
        aggData[dma]["applications"] === 0
          ? +(0).toFixed(2)
          : +(aggData[dma]["spend"] / aggData[dma]["applications"]).toFixed(2),
      cpva:
        aggData[dma]["va"] === 0
          ? +(0).toFixed(2)
          : +(aggData[dma]["spend"] / aggData[dma]["va"]).toFixed(2),
    })
  );

  return aggData;
};
