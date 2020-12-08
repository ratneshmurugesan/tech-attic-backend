module.exports = (dailyData, selectedFilters) => {
  const filteredData = dailyData.filter(
    campaign =>
      new Date(campaign.date) >= new Date(selectedFilters.startDate) &&
      new Date(campaign.date) <= new Date(selectedFilters.endDate) &&
      //Single values
      campaign.campaign_subscription.toString() ===
        selectedFilters.campaignSubscriptionId.toString() &&
      //Multi values
      selectedFilters.geoIds.includes(campaign.geo.toString()) &&
      selectedFilters.platformIds.includes(campaign.platforms.toString()) &&
      selectedFilters.programIds.includes(campaign.program.toString()) &&
      selectedFilters.keywordIds.includes(campaign.keyword.toString()) &&
      selectedFilters.regionIds.includes(campaign.region.toString())
  );

  return filteredData;
};
