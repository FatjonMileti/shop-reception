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
  comboValue,
  gridSize,
  UIComponent
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
      return editItemValue
    }
  }, [type, editItem, name, rest.county?.name, rest.county?.payloadKey])

  return (
    <Item
      name={name}
      formItemsPerRow={formItemsPerRow}
      gridSize={gridSize}
      UIComponent={UIComponent}
      type={type}
      value={value}
      comboValue={comboValue}
      handleInputChange={handleInputChange}
      rest={rest}
      key={name}
    />
  )
}

export default FormItem
