export const toProductStockKeyValuePairs = (infoItems, items) =>
  infoItems.map(item => ({ key: item.label, value: items[item.name] }))
