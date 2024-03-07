import { Checkbox, TimePicker } from '@fullscreendigital/carrefour-dex-fe'

export const buildColumns = ({
  toggleEmployee,
  updateEmplpyeeTime
}: {
  toggleEmployee: Function
  updateEmplpyeeTime: Function
}) => [
  {
    title: 'Angajat',
    field: 'fullName',
    align: 'left',
    type: 'string',
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
    render: (row: any) => (
      <TimePicker
        label=""
        value={row.shiftStart}
        onChange={newValue => updateEmplpyeeTime(row, newValue, 'shiftStart')}
        variant="outlined"
        style={{ width: '100%' }}
        forceDesktop
      />
    )
  },
  {
    title: 'Ora final de tura',
    field: 'shiftEnd',
    align: 'left',
    type: 'string',
    render: (row: any) => (
      <TimePicker
        label=""
        value={row.shiftEnd}
        onChange={newValue => updateEmplpyeeTime(row, newValue, 'shiftEnd')}
        variant="outlined"
        style={{ width: '100%' }}
        forceDesktop
      />
    )
  }
]
