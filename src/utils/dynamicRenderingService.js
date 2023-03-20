import { createElement } from 'react'
import { Components } from './dynamicRenderingConstants'

export const renderComponent = JSONSchema => {
  // Don't render anything if the payload is falsey.
  if (!JSONSchema) return null

  const { UIComponent, id, children, ...rest } = JSONSchema

  return createElement(
    Components[UIComponent],
    {
      id: id,
      key: id,
      ...rest
    },
    children && (typeof children === 'string' ? children : children.map(c => renderComponent(c)))
  )
}
