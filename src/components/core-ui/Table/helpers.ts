import { get } from 'lodash'
import { renderComponent } from 'utils/dynamicRenderingService'
import { toFiltersUrl } from './serializers'
import { getItemDefaults, getDefaultItemValue } from 'utils/helpers'
import { FilterParams, FilterSchema } from './TableDefinitions'

export const getInitialFilterParams = (searchParams, filters: FilterSchema[]): FilterParams => {
  let params = {}

  if (searchParams.length) {
    searchParams.forEach((value, key) => {
      // filter.variable is a path of search params which is for default value
      const filterKey = filters.find(filter => filter.variable === key)?.name
      params[filterKey] = value
    })
  } else {
    params = getItemDefaults(filters)
  }

  return params
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

export const convertFilterSchemaToFilterConfig = (filterSchema: FilterSchema) => {
  const { name, type, defaultValue, label, ...componentProps } = filterSchema
  return {
    name,
    label,
    type,
    value: getDefaultItemValue(defaultValue) ?? null,
    filter: renderComponent({ ...componentProps, label })
  }
}
