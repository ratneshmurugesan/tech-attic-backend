const router = require("express").Router();

const executive = require("../executive");
const social = require("../social");
const search = require("../search");
const dma = require("../dma");

module.exports = app => {
  router.use("/executive", executive(app));
  router.use("/social", social(app));
  router.use("/search", search(app));
  router.use("/dma", dma(app));
  return router;
};
