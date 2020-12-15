const metaData = require("../entities");
const router = require("express").Router();

const reportFiltersMapping = {
  executive: {
    allowedFilters: [
      "time_aggregate",
      "channels",
      "platforms",
      "geo",
      "conversion_source",
      "campaign_brands",
      "categories",
      "buckets",
      "group_value",
      "targeting_type",
    ],
    channels: [1, 2, 3, 4],
    platforms: [1, 2, 3, 4, 5, 6, 7],
  },
};

const getFilteredData = (req, res) => {
  const report = req.query.dashboard_type;
  const filters = Object.keys(metaData)
    .filter(entityList =>
      reportFiltersMapping[report].allowedFilters.includes(entityList)
    )
    .reduce((acc, filter) => {
      switch (filter) {
        case "platforms":
          acc[filter] = metaData[filter].filter(platform =>
            reportFiltersMapping[report].platforms.includes(platform.id)
          );
          break;
        case "channels":
          acc[filter] = metaData[filter].filter(channel =>
            reportFiltersMapping[report].channels.includes(channel.id)
          );
          break;
        default:
          acc[filter] = metaData[filter];
      }
      return acc;
    }, {});

  res.json({ data: filters });
};

module.exports = app => {
  router.get("/", getFilteredData);

  return router;
};
