import get from 'lodash/get'

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
  tableFilters,
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
  if (tableFilters) {
    Object.keys(tableFilters).map(key => {
      filtersUrl = `${filtersUrl}&${key}=${tableFilters[key]}`
    })
  }

  return `${url}?page=${page}&size=${rowsPerPage}&order=${order}&orderBy=${orderBy}${searchFieldsUrl}${filtersUrl}`
}

export const toTablePOSTPayload = ({
  page,
  rowsPerPage,
  order,
  orderBy,
  searchFieldsPayload,
  tableFilters
}) => ({
  page,
  rowsPerPage,
  order,
  orderBy,
  ...searchFieldsPayload,
  ...tableFilters
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
