module.exports = (dailyGenData, selectedFilters) => {
  const filteredExecutiveData = dailyGenData.filter(
    campaign =>
      new Date(campaign.date) >= new Date(selectedFilters.startDate) &&
      new Date(campaign.date) <= new Date(selectedFilters.endDate) &&
      //Single values
      campaign.conversionSource.toString() === selectedFilters.convSrcId &&
      //Multi values
      selectedFilters.groupValueIds.includes(campaign.groupValue.toString()) &&
      selectedFilters.targetingTypeIds.includes(
        campaign.targetingType.toString()
      ) &&
      selectedFilters.geoIds.includes(campaign.geo.toString()) &&
      selectedFilters.bucketIds.includes(campaign.buckets.toString()) &&
      selectedFilters.channelIds.includes(campaign.channels.toString()) &&
      selectedFilters.platformIds.includes(campaign.platforms.toString()) &&
      selectedFilters.campaignBrandIds.includes(
        campaign.campaignBrands.toString()
      ) &&
      selectedFilters.categoryIds.includes(campaign.categories.toString())
  );

  return filteredExecutiveData;
};
