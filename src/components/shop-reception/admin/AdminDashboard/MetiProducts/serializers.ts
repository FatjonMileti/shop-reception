export const toTableRowItems = (items: MetiProduct[]) =>
  items.map((item: MetiProduct) => ({
    id: item.id,
    code: item.code || '',
    name: item.name || '',
    unit: item.unit || '',
    lifetimeDays: item.lifetimeDays || 0,
    rayon: item.rayon || '',
    family: item.family || '',
    subFamily: item.subFamily || '',
    validityLimit: item.validityLimit || 0
  }))
