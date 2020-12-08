module.exports = (collection, selectedFilters) => {
  const filteredData = collection.filter(
    campaignData =>
      new Date(campaignData.date) >= new Date(selectedFilters.startDate) &&
      new Date(campaignData.date) <= new Date(selectedFilters.endDate) &&
      //Single values
      campaignData.campaign_subscription.toString() ===
        selectedFilters.campaignSubscriptionId &&
      //Multi values
      selectedFilters.geoIds.includes(campaignData.geo.toString()) &&
      selectedFilters.programIds.includes(campaignData.program.toString()) &&
      selectedFilters.keywordIds.includes(campaignData.keyword.toString()) &&
      selectedFilters.platformIds.includes(campaignData.platforms.toString()) &&
      selectedFilters.regionIds.includes(campaignData.region.toString()) &&
      selectedFilters.brandNonBrandIds.includes(
        campaignData.brand.toString()
      ) &&
      selectedFilters.matchTypeIds.includes(campaignData.match_type.toString())
  );

  return filteredData;
};
