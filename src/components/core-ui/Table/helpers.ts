import { get } from 'lodash'
import { renderComponent } from 'utils/dynamicRenderingService'
import { toFiltersUrl } from './serializers'
import { getItemDefaultsAsArray, getDefaultItemValue } from 'utils/helpers'
import { FilterParams, FilterSchema, Filter } from './TableDefinitions'

const getInitialFilterParam = (searchParams: FilterParams, filter: FilterSchema): FilterParams => {
  const { variable, defaultValue } = filter
  return searchParams[variable] ?? getDefaultItemValue(defaultValue)
}

export const getRenderedColumns = (columns, tableFilters) =>
  columns.map(column => {
    const { render, field } = column

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
              children: row[field]
            })
          }
          return renderComponent(render)
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
  const { name, type, defaultValue, label, required, ...componentProps } = filterSchema
  return {
    name,
    label,
    type,
    required,
    value: getInitialFilterParam(searchParams, filterSchema),
    filter: renderComponent({ ...componentProps, label })
  }
}

export const getSearchFieldsGetUrl = (searchFields: string[], searchText: string) => {
  if (!searchText) return ''

  const searchBy = searchFields.reduce(
    (acc, field) => (acc = acc ? `${acc}|${field}` : field),
    ''
  )

  return `&searchBy=${searchBy}&searchValue=${searchText}`
}

export const getFiltersGetUrl = (filters: Filter[]) => {
  if (!filters.length) return ''

  const [filterBy, filterValue] = filters.reduce(
    (acc, filter) =>
      (acc = [
        acc[0] ? `${acc[0]}|${filter.name}` : filter.name,
        acc[1] ? `${acc[1]}|${filter.value}` : filter.value
      ]),
    ['', '']
  )
  return `&filterBy=${filterBy}&filterValue=${filterValue}`
}
