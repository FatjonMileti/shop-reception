import * as React from 'react'
import { Box, Paper } from '@mui/material'
import { AsyncSelectInput } from '../AsyncSelectInput'
import { Table } from '../Table'
import { SelectOption } from './ComboBoxTableDefinitions'
import { getDefaultItemValue } from 'utils/helpers'
import s from './ComboBoxTable.modules.scss'

const ComboBoxTable = props => {
  const { table, combo } = props

  const [comboValue, setComboValue] = React.useState<SelectOption | null>(null)

  React.useEffect(() => {
    if (combo.defaultValue) {
      setComboValue(getDefaultItemValue(combo.defaultValue))
    }
  }, [combo.defaultValue])

  return (
    <Box>
      <Paper className={s.comboContainer}>
        <AsyncSelectInput {...combo} value={comboValue} setComboValue={setComboValue} />
      </Paper>
      {comboValue && <Table {...table} comboValue={{ ...comboValue, name: combo.name }} />}
    </Box>
  )
}

export default ComboBoxTable
