export const toPayload = (item) => ({
  id: item.id,
  packagingCode: item.packagingCode,
  additionalCodes: item.additionalCodes,
  name: item.name,
  main: item.main,
  combination: item.combination,
  active: item.active,
  return: item.return,
  generatedBarcode: item.generatedBarcode
})