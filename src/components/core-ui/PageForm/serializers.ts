export const toProcessedEditItem = (editItem, processedFormItems) =>
  processedFormItems.reduce((acc, item) => {
    acc[item.name] = editItem[item.name]
    return acc
  }, {})
