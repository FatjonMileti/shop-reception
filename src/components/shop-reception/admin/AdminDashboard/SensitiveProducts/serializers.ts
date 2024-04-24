export const toTableRowItems = (items: SensitiveProduct[]) =>
  items.map((item: SensitiveProduct) => ({
    id: item.id,
    shopCode: item.shopCode || '',
    shopName: item.shopName || '',
    prodName: item.prodName || '',
    ubName: item.ubName || '',
    sfaName: item.sfaName || '',
    famName: item.famName || '',
    rayName: item.rayName || '',
    shopType: item.shopType || { key: '', value: '' }
  }))
