import { get, set } from 'lodash'
import { toItemPayload } from 'utils/serializers'

export const toTableObjects = result =>
  result.map(row => {
    Object.keys(row).map(key => {
      if (row[key].value) {
        const { value, label } = row[key]
        row[key] = label
        row[`${key}Value`] = value
      }
    })
    return row
  })

export const toTableGETUrl = ({
  url,
  searchText,
  tableActions,
  filters,
  page,
  rowsPerPage,
  order,
  orderBy
}) => {
  let searchFieldsUrl = ''
  if (searchText) {
    tableActions.searchAction.searchFields.map(field => {
      searchFieldsUrl = `${searchFieldsUrl}&${field}=${searchText}`
    })
  }

  let filtersUrl = ''
  if (filters) {
    debugger
    Object.keys(filters).map(key => {
      filtersUrl = `${filtersUrl}&${key}=${filters[key]}`
    })
  }

  return `${url}?page=${page}&size=${rowsPerPage}&order=${order}&orderBy=${orderBy}${searchFieldsUrl}${filtersUrl}`
}

const toSearchFieldsPayload = (searchFields, searchText) =>
  searchFields ? searchFields.map(field => set({}, field, searchText)) : ''

export const toTablePOSTPayload = ({
  page,
  rowsPerPage,
  order,
  orderBy,
  searchText,
  searchFields,
  filters
}) => ({
  page,
  rowsPerPage,
  order,
  orderBy,
  ...toSearchFieldsPayload(searchFields, searchText),
  ...toItemPayload(filters)
})

export const toTableRowItems = (items, columns) => {
  columns.forEach(column => {
    if (column.field.includes('.')) {
      items.forEach((item, index) => {
        items[index][column.field] = get(item, column.field)
      })
    }
  })

  return items
}

export const toFiltersUrl = (tableFilters, linkFilters) => {
  let url = ''
  Object.keys(tableFilters).map(key => {
    if (linkFilters.includes(key)) {
      url = `${url}&${key}=${tableFilters[key]}`
    }
  })
  return url
}
