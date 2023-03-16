import { get } from 'lodash'
import { renderComponent } from 'utils/dynamicRenderingService'
import { toFiltersUrl } from './serializers'
import { getItemDefaultsAsArray, getDefaultItemValue } from 'utils/helpers'
import { FilterParams, FilterSchema } from './TableDefinitions'

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

export const convertFilterSchemaToFilterConfig = (filterSchema: FilterSchema, searchParams: FilterParams[]) => {
  const { name, type, defaultValue, label, ...componentProps } = filterSchema
  return {
    name,
    label,
    type,
    value: getInitialFilterParam(searchParams, filterSchema),
    filter: renderComponent({ ...componentProps, label })
  }
}
