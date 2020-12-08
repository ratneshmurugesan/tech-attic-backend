const router = require("express").Router();

const dailyGenSearchData = require("../helpers/dailySearchDataGenerator");

const categories = require("./categorySummary");
const engines = require("./engines");
const brands = require("./brands");
const keywords = require("./keywords");
const keywordCategories = require("./keywordCategories");

const headlineOne = require("./headlineOne");
const headlineTwo = require("./headlineTwo");
const headlineThree = require("./headlineThree");
const descriptionOne = require("./descriptionOne");
const descriptionTwo = require("./descriptionTwo");

const { extractSelectedFiltersParams } = require("../helpers/utils");

module.exports = app => {
  router.get("/categories/tablereport", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: categories(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/brands", function (req, res, next) {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: brands(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/engines", function (req, res, next) {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: engines(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/keywords", function (req, res, next) {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: keywords(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/keyword-categories", function (req, res, next) {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: keywordCategories(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/headline_one", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: headlineOne(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/headline_two", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: headlineTwo(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/headline_three", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: headlineThree(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/description_one", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: descriptionOne(dailyGenSearchData, selectedFilters),
    });
  });

  router.get("/description_two", (req, res, next) => {
    const selectedFilters = extractSelectedFiltersParams(req);
    res.json({
      data: descriptionTwo(dailyGenSearchData, selectedFilters),
    });
  });

  return router;
};
