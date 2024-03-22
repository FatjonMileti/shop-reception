export const toTableRowItems = (items: SubFamilyValidityThreshold[]) =>
  items.map((item: SubFamilyValidityThreshold) => ({
    id: item.id,
    sfaCode: item.sfaCode,
    sfaName: item.sfaName,
    famCode: item.famCode,
    famName: item.famName,
    rayCode: item.rayCode,
    rayName: item.rayName,
    validityLimit: item.validityLimit
  }))
