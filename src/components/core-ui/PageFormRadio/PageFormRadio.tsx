import { useState, useEffect } from 'react'
import { RadioButtonGroup } from '@fullscreendigital/carrefour-dex-fe'
import { Paper } from '@mui/material'
import { renderComponent } from 'utils/dynamicRenderingService'
import s from './PageFormRadio.modules.scss'

const PageFormRadio = props => {
  const { defaultValue, forms, options, ...rest } = props

  const [value, setValue] = useState(null)

  useEffect(() => setValue(defaultValue), [defaultValue])

  const changeForm = (_, newValue) => setValue(newValue)

  return (
    <Paper className={s.pageFormRadioContainer}>
      <div className={s.pageFormRadioContent}>
        <RadioButtonGroup
          name="formSwitchGroup"
          value={value}
          options={options}
          onChange={changeForm}
          row
        />
        {forms.map(form =>
          renderComponent({
            ...form,
            visible: value === form.id
          })
        )}
      </div>
    </Paper>
  )
}

export default PageFormRadio
