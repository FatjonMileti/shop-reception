import { get } from 'lodash'
import { renderComponent } from 'utils/dynamicRenderingService'
import { toFiltersUrl } from './serializers'
import { formatUIDate, getDefaultItemValue } from 'utils/helpers'
import { FilterParams, FilterSchema, Filter } from './TableDefinitions'
import { ComboValue } from '../ComboBoxTable/ComboBoxTableDefinitions'

const getInitialFilterParam = (searchParams: FilterParams, filter: FilterSchema): string => {
  const { variable, defaultValue } = filter

  if (!variable && !defaultValue) return ''

  return searchParams[variable] ?? getDefaultItemValue(defaultValue)
}

export const getRenderedColumns = (columns, tableFilters) =>
  columns.map(column => {
    const { render, field, type } = column

    if (render) {
      return {
        ...column,
        render: row => {
          const { UIComponent, idKeyName, href, linkFilters } = render

          if (UIComponent === 'Link') {
            const id = get(row, idKeyName)
            let linkHref = `${href}?id=${id}`

            if (linkFilters?.length) {
              linkHref = `${linkHref}${toFiltersUrl(tableFilters, linkFilters)}`
            }

            return renderComponent({
              ...render,
              href: linkHref,
              children: row[field],
              style: { textDecoration: 'none' }
            })
          }

          if(UIComponent === 'MultivalueCell' || UIComponent === 'IconCell'){
            return renderComponent({
              ...render,
              value: row[field],
            })
          }
          
          if (UIComponent === 'BooleanIcon') {
            const value = get(row, field)
            return renderComponent({
              ...render,
              value
            })
          }

          return renderComponent(render)
        }
      }
    } else if (type === 'date') {
      return {
        ...column,
        render: row => {
          const date = get(row, field)
          return formatUIDate(date)
        }
      }
    } else {
      return column
    }
  })

export const convertFilterSchemaToFilterConfig = (
  filterSchema: FilterSchema,
  searchParams: FilterParams
) => {
  const { name, defaultValue, label, required, hidden, ...componentProps } = filterSchema

  return {
    name,
    label,
    type: componentProps.type,
    required,
    hidden,
    value: getInitialFilterParam(searchParams, filterSchema),
    filter: renderComponent({ ...componentProps, label })
  }
}

export const getSearchFieldsGetUrl = (searchFields: string[], searchText: string) => {
  if (!searchText) return ''

  const searchBy = searchFields.reduce((acc, field) => (acc = acc ? `${acc}|${field}` : field), '')

  return `&searchBy=${searchBy}&searchValue=${encodeURIComponent(searchText)}`
}

export const getFiltersGetUrl = (filters: Filter[]) => {
  if (!filters.length) return ''

  const [filterBy, filterValue] = filters.reduce(
    (acc, filter) =>
      (acc = [
        acc[0] ? `${acc[0]}${encodeURIComponent('|')}${filter.name}` : filter.name,
        acc[1]
          ? `${acc[1]}${encodeURIComponent(`|${filter.value}`)}`
          : `${encodeURIComponent(filter.value)}`
      ]),
    ['', '']
  )
  return `&filterBy=${filterBy}&filterValue=${filterValue}`
}

export const getAllFilters = (filters: Filter[], comboValue: ComboValue) =>
  filters
    .filter(filter => filter.value)
    .concat(comboValue ? [{ name: comboValue.name, value: comboValue.value }] : [])

export const getTableQueryUrl = params =>
  Object.keys(params).reduce(
    (acc, key) =>
      (acc =
        params[key] || params[key] === 0
          ? acc
            ? `${acc}&${key}=${params[key]}`
            : `${key}=${params[key]}`
          : acc),
    ''
  )

export const download = (url, filters) => {
  // TODO use the downloadFile helper from utils
  const a = document.createElement('a')
  const href = filters.reduce((acc, filter) => `${acc}/${filter.value}`, url)
  // TODO replace download url when BE is ready
  // a.href = href
  a.href =
    'https://apps.carrefour.ro/stage_carrefour_assistant_api/api/reports-export/2023-04-01/2023-05-22'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const renderTableFooter = (footerElements, summary) =>
  footerElements.map(element => {
    return renderComponent({ ...element, data: summary, key: element.id })
  })
