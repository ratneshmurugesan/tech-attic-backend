const router = require("express").Router();

const dailyGenData = require("../helpers/dailyDataGenerator");
const { extractSelectedFiltersParams } = require("../helpers/utils");

const cards = require("./cards");
const channels = require("./channelSummary");
const categories = require("./categorySummary");

module.exports = _ => {
  router.get("/cards", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: cards(dailyGenData, selectedFilters),
    });
  });

  //tablereport
  router.get("/channels/tablereport", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: channels(dailyGenData, selectedFilters),
    });
  });
  router.get("/categories/tablereport", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: categories(dailyGenData, selectedFilters),
    });
  });

  return router;
};
