import { createElement, useMemo, useState } from 'react'
import { Grid } from '@mui/material'
import { getGridSize } from 'components/core-ui/ModalWithForm/helpers'
import { Components } from 'utils/dynamicRenderingConstants'
import { getNumberValue, getPercentValue } from './helpers'

const Item = ({
  name,
  formItemsPerRow,
  gridSize,
  UIComponent,
  type,
  value,
  handleInputChange,
  editItem,
  rest,
  extraUrlParams,
  errors
}) => {
  const key = rest.payloadKey || name

  const handleOnBeforeInput = event => {
    // console.log("[item] onBeforeInput | event: ", event)
    if (/^[0-9]*$/.test(event.data) == false) event.preventDefault()
  }

  return (
    <Grid item key={name} xs={12} sm={formItemsPerRow ? getGridSize(formItemsPerRow) : gridSize}>
      {createElement(Components[UIComponent], {
        ...rest,
        type: type === 'percent' ? 'number' : type,
        value: value,
        editItem,
        ...(type === 'date' ? { inputFormat: 'DD/MM/YYYY' } : {}),
        name,
        extraUrlParams,
        error: !!errors[name],
        ...(errors[name] ? { helperText: errors[name] } : {}),
        onChange: (arg, variable) => {
          switch (type) {
            case 'date':
              handleInputChange(arg, name, type)
              break
            case 'checkbox':
              handleInputChange(arg.target.checked, key, type)
              break
            case 'autocomplete':
              handleInputChange(arg?.value || arg, key, type)
              handleInputChange(arg?.label || arg, name, type)
              break
            case 'static':
              handleInputChange(arg?.value, key, type)
              break
            case 'countyCitySelect':
              handleInputChange(arg?.value, rest[variable].payloadKey, type)
              handleInputChange(arg?.label, rest[variable].name, type)
              break
            case 'file':
              if (arg) {
                handleInputChange(arg?.target.files[0], 'fileObject')
              } else {
                handleInputChange(null, 'fileObject')
              }
              break
            case 'percent':
              handleInputChange(getPercentValue(arg?.target?.value), key, type)
              break
            default:
              handleInputChange(arg?.target?.value, key, type)
              break
          }
        },
        ...(type == 'percent' ? { onBeforeInput: handleOnBeforeInput } : {})
      })}
    </Grid>
  )
}

export default Item
