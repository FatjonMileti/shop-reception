export const toProcessedEditItem = (editItem, processedFormItems) =>
  processedFormItems.reduce((acc, item) => {
    const { UIComponent, city, county, payloadKey, name } = item

    if (UIComponent === 'CountyCitySelect') {
      acc[city.payloadKey] = editItem[city.payloadKey]
      acc[county.payloadKey] = editItem[county.payloadKey]
    } else {
      acc[payloadKey || name] = editItem[payloadKey || name]
    }

    return acc
  }, {})
