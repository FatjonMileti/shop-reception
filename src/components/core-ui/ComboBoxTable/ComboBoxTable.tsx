import * as React from 'react'
import { Box, Paper } from '@mui/material'
import { Table } from '../Table'
import { SelectOption } from './ComboBoxTableDefinitions'
import { getDefaultItemValue } from 'utils/helpers'
import { renderComponent } from 'utils/dynamicRenderingService'
import s from './ComboBoxTable.modules.scss'

const ComboBoxTable = props => {
  const { table, combo } = props

  const [comboValue, setComboValue] = React.useState<SelectOption>({ label: '', value: '' })

  return (
    <Box>
      <Paper className={s.comboContainer}>
        {renderComponent({
          ...combo,
          value: comboValue.value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>{
            setComboValue({ label: e.target.value, value: e.target.value })
          },
          setComboValue
        })}
      </Paper>
      {comboValue.value && <Table {...table} comboValue={{ ...comboValue, name: combo.name }} />}
    </Box>
  )
}

export default ComboBoxTable
