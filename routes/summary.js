const router = require("express").Router();

const executive = require("../executive");

module.exports = app => {
  router.use("/executive", executive(app));
  return router;
};
