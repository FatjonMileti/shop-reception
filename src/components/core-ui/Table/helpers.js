import get from 'lodash/get'
import { renderComponent } from 'utils/dynamicRenderingService'
import { toFiltersUrl } from './serializers'

export const getInitialTableFilters = (searchParams, filters) => {
  let params = {}
  searchParams.forEach((value, key) => {
    const filterKey = filters.find(filter => filter.variable === key)?.name
    params[filterKey] = value
  })

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
