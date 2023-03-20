import * as React from 'react'
import { Box } from '@mui/material'
import { AsyncSelectInput } from '../AsyncSelectInput'
import { Table } from '../Table'
import { SelectOption } from './ComboBoxTableDefinitions'
import { getDefaultItemValue } from 'utils/helpers'

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
      <Box>
        <AsyncSelectInput {...combo} value={comboValue} setComboValue={setComboValue} />
      </Box>
      {comboValue && <Table {...table} comboValue={comboValue} />}
    </Box>
  )
}

export default ComboBoxTable
