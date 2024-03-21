export const toTableRowItems = (items: ScanType[]) =>
  items.map((item: ScanType) => ({
    id: item.id,
    active: item.active,
    start: item.start,
    end: item.end,
    shopType: item.shopType,
    regionName: item.regionName,
    shopCode: item.shopCode,
    shopName: item.shopName,
    type: item.type
  }))
