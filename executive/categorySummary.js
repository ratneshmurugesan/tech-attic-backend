const filterData = require("./filterData");
const { categories } = require("../entities");

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

  const responseObj = categories.reduce((acc, category) => {
    acc[category.id] = { ...agg, ...category };
    return acc;
  }, {});

  for (let i = 0; i < filteredDailyData.length; i++) {
    const data = filteredDailyData[i];
    responseObj[data["categories"]]["spend"] += +data["spend"];
    responseObj[data["categories"]]["leads"] += +data["leads"];
    responseObj[data["categories"]]["prospects"] += +data["prospects"];
    responseObj[data["categories"]]["applications"] += +data["applications"];
    responseObj[data["categories"]]["va"] += +data["va"];
  }

  for (let i = 0; i < categories.length; i++) {
    const id = categories[i].id;
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

  const response = Object.values(responseObj).filter(category =>
    selectedFilters.categoryIds.includes(category.id.toString())
  );

  return response;
};
