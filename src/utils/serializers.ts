import { Filter } from 'components/core-ui/Table/TableDefinitions'
import { get, set } from 'lodash'

export const toItemPayload = (item: { [key: string]: string }) => {
  let payload = {}

  Object.keys(item).forEach(key => {
    const element = document.getElementById(key) as HTMLInputElement
    if (!element || !element.disabled) {
      set(payload, key, item[key])
    }
  })

  return payload
}

export const toFormDataPayload = (item: { [key: string]: string }) => {
  const formData = Object.keys(item).reduce((formData, key) => {
    if (key !== 'imageUrl' && item[key]) {
      formData.append(key, item[key])
    }
    return formData
  }, new FormData())

  return formData
}

export const toArrayItemPayload = (item: Filter[]) => {
  let payload = {}

  item.map(i => {
    set(payload, i.name, i.value)
  })

  return payload
}

export const toTableRowItems = (items, columns) => {
  columns.map(column => {
    items.map((item, index) => {
      let value
      if (column.field.includes('.')) {
        value = get(item, column.field)
      } else {
        value = item[column.field]
      }

      if (value === null || value === undefined) {
        items[index][column.field] = ''
      } else {
        items[index][column.field] = value
      }
    })
  })
  return items
}

export const toProductStockKeyValuePairs = (infoItems, items) =>
  infoItems.map(item => ({ key: item.label, value: items[item.name] }))

export const toDynamicTableItems = items =>
  items.map(item => {
    const newList = item.list.reduce((acc, i) => {
      acc[i.name] = i
      return acc
    }, {})

    return { ...item, list: newList }
  })
