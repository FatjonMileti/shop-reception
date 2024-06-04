export const toTableRowItems = (items: SGRProducts[]) =>
  items.map((item: SGRProducts) => ({
    id: item.id,
    shopCode: item.shopCode || '',
    shopName: item.shopName || '',
    prodName: item.prodName || '',
    ubName: item.ubName || '',
    sfaName: item.sfaName || '',
    famName: item.famName || '',
    rayName: item.rayName || '',
    shopType: item.shopType || []
  }))
