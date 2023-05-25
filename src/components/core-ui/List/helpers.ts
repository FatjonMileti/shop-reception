import { get } from 'lodash'
import { renderComponent } from 'utils/dynamicRenderingService'

export const getRenderedColumns = columns =>
  columns.map(column => {
    const { render } = column

    if (render) {
      return {
        ...column,
        render: row => {
          const { UIComponent } = render

          if (UIComponent === 'TitleText') {
            return renderComponent({
              ...render,
              text: get(row, column.field)
            })
          }

          if (UIComponent === 'PlusMinusNumberInput') {
            return renderComponent({
              ...render,
              field: column.field,
              count: get(row, column.field)
            })
          }

          return renderComponent(render)
        }
      }
    }

    return column
  })
