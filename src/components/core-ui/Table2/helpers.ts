import { get } from 'lodash'
import { renderComponent } from 'utils/dynamicRenderingService'
import { toFiltersUrl } from './serializers'
import { formatUIDate, getDefaultItemValue } from 'utils/helpers'
import { FilterParams, FilterSchema, Filter } from './TableDefinitions'

const getInitialFilterParam = (searchParams: FilterParams, filter: FilterSchema): string => {
  const { variable, defaultValue } = filter

  if (!variable && !defaultValue) return filter.type == 'date' ? null : ''

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

          if (UIComponent === 'MultivalueCell' || UIComponent === 'IconCell') {
            return renderComponent({
              ...render,
              value: row[field]
            })
          }

          if (UIComponent === 'ImageCell') {
            return renderComponent({
              ...render,
              imageUrl: row.imageUrl,
              value: row[field]
            })
          }

          if (
            UIComponent === 'BooleanIcon' ||
            UIComponent === 'BooleanText' ||
            UIComponent === 'DescriptionText'
          ) {
            const value = get(row, field)
            return renderComponent({
              ...render,
              value
            })
          }

          if (UIComponent === 'Switch') {
            if (get(row, column.field) !== '') {
              return renderComponent({
                ...render,
                value: get(row, column.field),
                pathId: row.id
              })
            } else {
              return null
            }
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

  const searchBy = searchFields.reduce(
    (acc, field) => (acc = acc ? `${acc}${encodeURIComponent('|')}${field}` : field),
    ''
  )

  return `&searchBy=${searchBy}&searchValue=${encodeURIComponent(searchText)}`
}

const getFilterUrlValues = (filters: Filter[]) =>
  filters.reduce(
    (acc, filter) => {
      const valuesArray = filter.value
      const encodedValue = Array.isArray(valuesArray) ? `[${valuesArray.join(';')}]` : valuesArray
      acc = [
        acc[0] ? `${acc[0]}${encodeURIComponent('|')}${filter.name}` : filter.name,
        acc[1]
          ? `${acc[1]}${encodeURIComponent(`|${encodedValue}`)}`
          : `${encodeURIComponent(encodedValue)}`
      ]
      return acc
    },
    ['', '']
  )

export const getFiltersGetUrl = (filters: Filter[]) => {
  if (!filters.length) return ''

  const [filterBy, filterValue] = getFilterUrlValues(filters)

  return `&filterBy=${filterBy}&filterValue=${filterValue}`
}

export const getSearchGetUrl = (searchFields: string[], searchText: string) => {
  if (!searchText) return ''
  const searchBy = encodeURIComponent(searchFields.join('|'))
  const searchValue = encodeURIComponent(searchText)

  return `&searchBy=${searchBy}&searchValue=${searchValue}`
}

export const getCustomFiltersGetUrl = (filters: Filter[]) => {
  if (!filters.length) return ''

  const [filterBy, filterValue] = getFilterUrlValues(filters)

  return `&${filterBy}=${filterValue}`
}

export const getAllFilters = (filters: Filter[]) =>
  filters.filter(filter => filter.value !== undefined && filter.value !== '' && filter.value !== null)

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

export const renderTableFooter = (footerElements, summary) =>
  footerElements.map(element => {
    return renderComponent({ ...element, data: summary, key: element.id })
  })
