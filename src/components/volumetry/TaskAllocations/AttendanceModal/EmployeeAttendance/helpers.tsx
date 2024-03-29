import { Checkbox, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'

export const buildColumns = ({
  toggleEmployee,
  updateEmployeeTime,
  isXs
}: {
  toggleEmployee: Function
  updateEmployeeTime: Function
  isXs: boolean
}) => [
  {
    title: 'Angajat',
    field: 'fullName',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: (row: any) => (
      <Checkbox
        edge="start"
        checked={row.isPresent}
        onChange={() => toggleEmployee(row)}
        inputProps={{ 'aria-labelledby': `employee-${row.value}` }}
        label={row.fullName}
        // style={
        //   isXs ? { marginLeft: 0 } : { lineHeight: '70px', display: 'inline-block', marginLeft: 0 }
        // }
      />
    )
  },
  {
    title: 'Ora inceput de tura',
    field: 'shiftStart',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: (row: any) => (
      <TimePicker
        label=""
        value={row.shiftStart || dayjs()}
        onAccept={newValue => updateEmployeeTime(row, newValue, 'shiftStart')}
        onChange={() => {}}
        variant="outlined"
        style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
        forceDesktop
        ampm={false}
      />
    ),
    collapsible: true
  },
  {
    title: 'Ora final de tura',
    field: 'shiftEnd',
    align: 'left',
    type: 'string',
    disableSorting: true,
    render: (row: any) => (
      <TimePicker
        label=""
        value={row.shiftEnd || dayjs()}
        onAccept={newValue => updateEmployeeTime(row, newValue, 'shiftEnd')}
        onChange={() => {}}
        variant="outlined"
        style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
        forceDesktop
        ampm={false}
      />
    ),
    collapsible: true
  }
]
