import { get } from 'lodash'
import { useMemo } from 'react'
import { Item } from './Item'

const FormItem = ({
  name,
  type,
  editItem,
  formItemsPerRow,
  rest,
  handleInputChange,
  gridSize,
  UIComponent,
  extraUrlParams
}) => {
  const value = useMemo(() => {
    if (type === 'countyCitySelect') {
      return {
        county: {
          label: get(editItem, rest.county.name),
          value: get(editItem, rest.county.payloadKey)
        },
        city: {
          label: get(editItem, rest.city.name),
          value: get(editItem, rest.city.payloadKey)
        }
      }
    } else {
      const editItemValue = get(editItem, name)
      if (editItemValue == '' && type === 'date') {
        return null // value=undefined => current date | value=null => input left blank
      }
      return editItemValue || ''
    }
  }, [
    type,
    editItem,
    name,
    rest.county?.name,
    rest.county?.payloadKey,
    rest.city?.name,
    rest.city?.payloadKey
  ])

  return (
    <Item
      editItem={editItem}
      name={name}
      formItemsPerRow={formItemsPerRow}
      gridSize={gridSize}
      UIComponent={UIComponent}
      type={type}
      value={value}
      handleInputChange={handleInputChange}
      rest={rest}
      key={name}
      extraUrlParams={extraUrlParams}
    />
  )
}

export default FormItem
