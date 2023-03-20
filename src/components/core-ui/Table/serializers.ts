import { get, set } from 'lodash'
import { toArrayItemPayload } from 'utils/serializers'
import { Filter } from './TableDefinitions'
import { SelectOption } from 'components/core-ui/ComboBoxTable/ComboBoxTableDefinitions'
import { getFiltersGetUrl, getSearchFieldsGetUrl } from './helpers'

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

const getAllFilters = (filters: Filter[], comboValue: SelectOption) =>
  filters.concat(comboValue ? [{ name: comboValue.label, value: comboValue.value }] : [])

export const toTableGETUrl = ({
  url,
  searchText,
  searchFields,
  filters,
  comboValue,
  page,
  rowsPerPage,
  order,
  orderBy
}: {
  url: string
  searchText: string
  searchFields: string[]
  filters: Filter[]
  comboValue: SelectOption
  page: number
  rowsPerPage: number
  order: string
  orderBy: string
}) => {
  const searchFieldsUrl = getSearchFieldsGetUrl(searchFields, searchText)
  const a  = getAllFilters(filters, comboValue)
  debugger
  const filtersUrl = getFiltersGetUrl(getAllFilters(filters, comboValue))

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
  filters,
  comboValue
}: {
  page: number,
  rowsPerPage: number
  order: string,
  orderBy: string,
  searchText: string,
  searchFields: string[],
  filters: Filter[],
  comboValue: SelectOption
}) => ({
  page,
  rowsPerPage,
  order,
  orderBy,
  ...toSearchFieldsPayload(searchFields, searchText),
  ...toArrayItemPayload(getAllFilters(filters, comboValue))
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
  tableFilters.map(filter => {
    if (linkFilters.includes(filter.name)) {
      url = `${url}&${filter.name}=${filter.value}`
    }
  })
  return url
}
