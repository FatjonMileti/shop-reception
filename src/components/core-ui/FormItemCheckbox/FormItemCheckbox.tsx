import { useState } from 'react'
import { Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { FormItemCheckboxProps } from './FormItemCheckboxDefinitions'
import { Box } from '@mui/material'
import { renderComponent } from 'utils/dynamicRenderingService'

const FormItemCheckbox = (props: FormItemCheckboxProps) => {
  const { checkboxLabel, formItems, onChange, value, name } = props

  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setChecked(event.target.checked)
  }

  return (
    <Box>
      <Checkbox label={checkboxLabel} checked={checked} onChange={handleCheckboxChange} />
      {checked &&
        formItems.map(formItem =>
          renderComponent({ ...formItem, onChange: arg => {
            onChange(arg, name)
          }, value })
        )}
    </Box>
  )
}

export default FormItemCheckbox
