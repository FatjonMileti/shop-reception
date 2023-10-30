export const toProcessedEditItem = (editItem, processedFormItems) =>
  processedFormItems.reduce((acc, item) => {
    const { UIComponent, payloadKey, name } = item

    if (UIComponent === 'CountyCitySelect') {
      if (editItem['newDeliveryAddress.county.id']) {
        acc.newDeliveryAddress = {
          city : {
            id: editItem['newDeliveryAddress.city.id'],
            name: editItem['newDeliveryAddress.city.name']
          },
          county: {
            id: editItem['newDeliveryAddress.county.id'],
            name: editItem['newDeliveryAddress.county.name']
          },
          address: editItem['newDeliveryAddress.address']
        }
      } else {
        acc.city = {
          id: editItem['city.id'],
          name: editItem['city.name']
        }

        acc.county = {
          id: editItem['county.id'],
          name: editItem['county.name']
        }
      }
    } else {
      acc[payloadKey || name] = editItem[payloadKey || name]
    }

    return acc
  }, {})
