import { get, set } from 'lodash'
import { toArrayItemPayload } from 'utils/serializers'
import { Filter } from './TableDefinitions'
import { ComboValue } from 'components/core-ui/ComboBoxTable/ComboBoxTableDefinitions'
import { getFiltersGetUrl, getSearchFieldsGetUrl, getAllFilters, getTableQueryUrl } from './helpers'

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
  comboValue: ComboValue
  page: number
  rowsPerPage: number
  order: string
  orderBy: string
}) => {
  const tableQueryUrl = getTableQueryUrl({ page, size: rowsPerPage, order, orderBy })
  const searchFieldsUrl = getSearchFieldsGetUrl(searchFields, searchText)
  const filtersUrl = getFiltersGetUrl(getAllFilters(filters, comboValue))

  return `${url}?${tableQueryUrl}${searchFieldsUrl}${filtersUrl}`
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
  page: number
  rowsPerPage: number
  order: string
  orderBy: string
  searchText: string
  searchFields: string[]
  filters: Filter[]
  comboValue: ComboValue
}) => ({
  page,
  rowsPerPage,
  order,
  orderBy,
  ...toSearchFieldsPayload(searchFields, searchText),
  ...toArrayItemPayload(getAllFilters(filters, comboValue))
})

export const toFiltersUrl = (tableFilters, linkFilters) => {
  let url = ''
  tableFilters.map(filter => {
    if (linkFilters.includes(filter.name)) {
      url = `${url}&${filter.name}=${filter.value}`
    }
  })
  return url
}
