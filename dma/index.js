const router = require("express").Router();

const dmaDailyData = require("../helpers/dmaDataGenerator");
const { extractSelectedFiltersParams } = require("../helpers/utils");
const report = require("./report");

module.exports = app => {
  router.get("/report", function (req, res, next) {
    const selectedFilters = extractSelectedFiltersParams(req);

    res.json({
      data: report(dmaDailyData, selectedFilters),
    });
  });
  return router;
};
