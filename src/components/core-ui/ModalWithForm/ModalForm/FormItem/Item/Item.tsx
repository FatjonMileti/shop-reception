import { createElement } from 'react'
import { Grid } from '@mui/material'
import { getGridSize } from 'components/core-ui/ModalWithForm/helpers'
import { Components } from 'utils/dynamicRenderingConstants'

const Item = ({
  name,
  formItemsPerRow,
  gridSize,
  UIComponent,
  type,
  value,
  comboValue,
  handleInputChange,
  rest
}) => {
  const key = rest.payloadKey || name

  return (
    <Grid
      item
      key={name}
      xs={12}
      sm={formItemsPerRow ? getGridSize(formItemsPerRow) : gridSize}
    >
      {createElement(Components[UIComponent], {
        ...rest,
        type,
        value,
        comboValue,
        ...(type === 'date' ? { inputFormat: 'DD/MM/YYYY' } : {}),
        name,
        onChange: (arg, variable) => {
          switch (type) {
            case 'date':
              handleInputChange(arg, name, type)
              break
            case 'checkbox':
              handleInputChange(arg.target.checked, key, type)
              break
            case 'autocomplete':
              handleInputChange(arg?.value, key, type)
              handleInputChange(arg?.label, name, type)
              break
            case 'countyCitySelect':
              handleInputChange(arg?.value, rest[variable].payloadKey, type)
              handleInputChange(arg?.label, rest[variable].name, type)
              break
            default:
              handleInputChange(arg.target.value, key, type)
              break
          }
        }
      })}
    </Grid>
  )
}

export default Item
