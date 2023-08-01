import { get, set } from 'lodash'
import { toArrayItemPayload } from 'utils/serializers'
import { Filter } from './TableDefinitions'
import {
  getFiltersGetUrl,
  getSearchFieldsGetUrl,
  getAllFilters,
  getTableQueryUrl,
  getCustomFiltersGetUrl
} from './helpers'

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
  tableFilters,
  page,
  rowsPerPage,
  order,
  orderBy,
  hasGeneralSearch,
  generalSearchText,
  extraUrlParams,
  extraCustomUrlParams
}: {
  url: string
  searchText: string
  searchFields: string[]
  filters: Filter[]
  tableFilters?: Filter[]
  page?: number
  rowsPerPage?: number
  order: string
  orderBy: string
  hasGeneralSearch: boolean
  generalSearchText: string
  extraUrlParams?: Filter[]
  extraCustomUrlParams?: Filter[]
}) => {
  const tableQueryUrl = getTableQueryUrl({ page, size: rowsPerPage, order, orderBy })
  const searchFieldsUrl = getSearchFieldsGetUrl(searchFields, searchText)
  const filtersUrl = getFiltersGetUrl(
    getAllFilters(filters.concat(tableFilters).concat(extraUrlParams ?? []))
  )
  const customFiltersUrl = extraCustomUrlParams
    ? getCustomFiltersGetUrl(getAllFilters(extraCustomUrlParams))
    : ''
  const generalSearchUrl =
    hasGeneralSearch && generalSearchText ? `&keyword=${generalSearchText}` : ''

  return `${url}?${tableQueryUrl}${searchFieldsUrl}${filtersUrl}${generalSearchUrl}${customFiltersUrl}`
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
  tableFilters,
  hasGeneralSearch,
  generalSearchText,
  extraUrlParams,
  extraCustomUrlParams
}: {
  page: number
  rowsPerPage: number
  order: string
  orderBy: string
  searchText: string
  searchFields: string[]
  filters: Filter[]
  tableFilters?: Filter[]
  hasGeneralSearch: boolean
  generalSearchText: string
  extraUrlParams?: Filter[]
  extraCustomUrlParams?: Filter[]
}) => ({
  page,
  rowsPerPage,
  order,
  orderBy,
  ...toSearchFieldsPayload(searchFields, searchText),
  ...toArrayItemPayload(
    getAllFilters([
      ...filters,
      ...tableFilters,
      ...(extraUrlParams ?? []),
      ...(extraCustomUrlParams ?? [])
    ])
  ),
  ...(hasGeneralSearch && generalSearchText ? { keyword: generalSearchText } : {})
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
