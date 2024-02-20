export const toTableRowItems = (items: SeriesNumber[]) => items.map((item: SeriesNumber) => ({
  id: item.id,
  series: item.society,
  startInterval: item.startInterval,
  currentNumber: item.currentNumber,
  year: item.year,
  society: item.society,
}))