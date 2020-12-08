const extractSelectedFiltersParams = req => ({
  startDate: req.query.start_date,
  endDate: req.query.end_date,

  //SingleSelect Ids
  convSrcId: req.query.conversion_source || null,
  timeAgg: req.query.time_aggregate || null,
  campaignSubscriptionId: req.query.campaign_subscription || null,

  //MultiSelect Ids
  geoIds: (req.query.geo && req.query.geo.split(",")) || [],
  groupValueIds:
    (req.query.group_value && req.query.group_value.split(",")) || [],
  targetingTypeIds:
    (req.query.targeting_type && req.query.targeting_type.split(",")) || [],
  bucketIds: (req.query.buckets && req.query.buckets.split(",")) || [],
  channelIds: (req.query.channels && req.query.channels.split(",")) || [],
  platformIds: (req.query.platforms && req.query.platforms.split(",")) || [],
  campaignBrandIds:
    (req.query.campaign_brands && req.query.campaign_brands.split(",")) || [],
  categoryIds: (req.query.categories && req.query.categories.split(",")) || [],
  regionIds: (req.query.regions && req.query.regions.split(",")) || [],
  keywordIds: (req.query.keywords && req.query.keywords.split(",")) || [],
  programIds: (req.query.programs && req.query.programs.split(",")) || [],
  matchTypeIds: (req.query.match_type && req.query.match_type.split(",")) || [],
  brandNonBrandIds:
    (req.query.brandNonBrand && req.query.brandNonBrand.split(",")) || [],
  dmaIds: (req.query.dma_regions && req.query.dma_regions.split(",")) || [],
});

const monthMap = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

module.exports = {
  extractSelectedFiltersParams,
  monthMap,
};
