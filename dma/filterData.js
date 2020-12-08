module.exports = (collection, selectedFilters) => {
  const filteredData = collection.filter(
    d =>
      new Date(d.date) >= new Date(selectedFilters.startDate) &&
      new Date(d.date) <= new Date(selectedFilters.endDate) &&
      selectedFilters.channelIds.includes(d.channels.toString()) &&
      selectedFilters.platformIds.includes(d.platforms.toString()) &&
      selectedFilters.dmaIds.includes(d.dma_id.toString())
  );

  return filteredData;
};
