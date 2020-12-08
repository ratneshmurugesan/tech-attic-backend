const router = require("express").Router();

const dailyGenData = require("../helpers/dailyDataGenerator");
const { extractSelectedFiltersParams } = require("../helpers/utils");

const cards = require("./cards");
const channels = require("./channelSummary");
const categories = require("./categorySummary");
const channelMetrics = require("./channelMetrics");
const categoryMetrics = require("./categoryMetrics");



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

  //metrics-timeline
  router.get("/channels/metrics-timeline", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: channelMetrics(dailyGenData, selectedFilters),
    });
  });
  router.get("/categories/metrics-timeline", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: categoryMetrics(dailyGenData, selectedFilters),
    });
  });
  return router;
};
