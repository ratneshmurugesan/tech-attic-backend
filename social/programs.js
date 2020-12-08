const filterData = require("./filterData");
const categories = require("../entities").categories;

module.exports = (result, filters) => {
  const filteredDailyData = filterData(result, filters);

  const programData = categories.map(category => ({
    ...category,
    ...{
      items: filteredDailyData
        .filter(dailyData => dailyData.categories === category.id)
        .reduce((acc, pgm) => {
          acc[pgm.program] = {
            program: pgm.program_name,
            spend: 0,
            leads: 0,
            prospects: 0,
            va: 0,
            clicks: 0,
            impressions: 0,
          };
          return acc;
        }, {}),
    },
  }));

  for (let i = 0; i < programData.length; i++) {
    for (let j = 0; j < filteredDailyData.length; j++) {
      const pgmId = filteredDailyData[j].program;
      const pgmItemObj = programData[i].items[pgmId];
      pgmItemObj &&
        Object.keys(pgmItemObj).length &&
        (pgmItemObj["spend"] += filteredDailyData[j]["spend"]);
      pgmItemObj &&
        Object.keys(pgmItemObj).length &&
        (pgmItemObj["leads"] += filteredDailyData[j]["leads"]);
      pgmItemObj &&
        Object.keys(pgmItemObj).length &&
        (pgmItemObj["prospects"] += filteredDailyData[j]["prospects"]);
      pgmItemObj &&
        Object.keys(pgmItemObj).length &&
        (pgmItemObj["va"] += filteredDailyData[j]["va"]);
      pgmItemObj &&
        Object.keys(pgmItemObj).length &&
        (pgmItemObj["clicks"] += filteredDailyData[j]["clicks"]);
      pgmItemObj &&
        Object.keys(pgmItemObj).length &&
        (pgmItemObj["impressions"] += filteredDailyData[j]["impressions"]);
    }
  }

  const pgmData = programData.map(programData => ({
    ...programData,
    ...{
      items: Object.values(programData.items).map(item => ({
        ...item,
        ...{
          cpl:
            +item["spend"] === 0
              ? +(0).toFixed(2)
              : +(+item["spend"] / +item["leads"]).toFixed(2),
          cpp:
            +item["spend"] === 0
              ? +(0).toFixed(2)
              : +(+item["spend"] / +item["prospects"]).toFixed(2),
          cpva:
            +item["spend"] === 0
              ? +(0).toFixed(2)
              : +(+item["spend"] / +item["va"]).toFixed(2),
          ctr:
            +item["clicks"] === 0
              ? +(0).toFixed(2)
              : +((+item["clicks"] / +item["impressions"]) * 100).toFixed(2),
        },
      })),
    },
  }));

  return pgmData.map(program => ({
    ...program,
  }));
};
