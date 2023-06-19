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
      if (column.field.includes('.')) {
        items[index][column.field] = get(item, column.field) || ''
      } else {
        if (item[column.field] === null || item[column.field] === undefined) {
          items[index][column.field] = column.type === 'date' ? null : ''
        } else {
          items[index][column.field] = item[column.field]
        }
      }
    })
  })

  return items
}
