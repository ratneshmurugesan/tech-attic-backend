const router = require("express").Router();

const dailyGenSocialData = require("../helpers/dailySocialDataGenerator");

const { extractSelectedFiltersParams } = require("../helpers/utils");

const cards = require("./cards");
const categories = require("./categorySummary");
const programs = require("./programs");
const headlineOne = require("./headlineOne");
const headlineTwo = require("./headlineTwo");
const headlineThree = require("./headlineThree");
const descriptionOne = require("./descriptionOne");
const descriptionTwo = require("./descriptionTwo");

module.exports = _ => {
  router.get("/cards", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: cards(dailyGenSocialData, selectedFilters),
    });
  });

  router.get("/categories/tablereport", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: categories(dailyGenSocialData, selectedFilters),
    });
  });

  router.get("/program/table_with_legend", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: programs(dailyGenSocialData, selectedFilters),
    });
  });

  router.get("/headline_one", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: headlineOne(dailyGenSocialData, selectedFilters),
    });
  });

  router.get("/headline_two", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: headlineTwo(dailyGenSocialData, selectedFilters),
    });
  });

  router.get("/headline_three", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: headlineThree(dailyGenSocialData, selectedFilters),
    });
  });

  router.get("/description_one", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: descriptionOne(dailyGenSocialData, selectedFilters),
    });
  });

  router.get("/description_two", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: descriptionTwo(dailyGenSocialData, selectedFilters),
    });
  });
  return router;
};
