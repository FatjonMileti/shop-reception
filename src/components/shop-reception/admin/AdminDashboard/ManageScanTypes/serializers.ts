export const toTableRowItems = (items: ScanType[]) =>
  items.map((item: ScanType) => ({
    id: item.id,
    active: item.active || false,
    start: item.start || '',
    end: item.end || '',
    shopType: item.shopType || { key: '', value: '' },
    regionName: item.regionName || '',
    shopCode: item.shopCode || '',
    shopName: item.shopName || '',
    type: item.type || { key: '', value: '' }
  }))
