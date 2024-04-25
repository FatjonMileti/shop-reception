import { Checkbox, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'

export const buildColumns = ({
  toggleEmployee,
  updateEmployeeTime,
  isXs,
  formik
}: {
  toggleEmployee: Function
  updateEmployeeTime: Function
  isXs: boolean
  formik: any
}) => [
  {
    title: 'Angajat',
    field: 'isPresent',
    render: row => (
      <Checkbox
        edge="start"
        checked={row.isPresent}
        onChange={() => toggleEmployee(row)}
        inputProps={{ 'aria-labelledby': `employee-${row.value}` }}
        label={row.fullName}
        style={{ fontSize: '12px !important' }}
      />
    )
  },
  {
    title: 'Departament',
    field: 'genericDepartment',
    render: row => (
      <span style={{ display: 'inline-block', lineHeight: '45px' }}>{row.genericDepartment}</span>
    )
  },
  {
    title: 'Ora inceput de tura',
    field: 'shiftStart',
    collapsible: true,
    render: row => (
      <TimePicker
        label=""
        value={dayjs(row.shiftStart)}
        onChange={newValue => updateEmployeeTime(row, newValue, 'shiftStart')}
        variant="outlined"
        style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
        // forceDesktop
        ampm={false}
        error={!!formik.errors.employees?.[row.index]?.shiftStart}
        helperText={formik.errors.employees?.[row.index]?.shiftStart as string}
        title="Selecteaza ora"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    )
  },
  {
    title: 'Ora final de tura',
    field: 'shiftEnd',
    collapsible: true,
    render: row => (
      <TimePicker
        label=""
        value={dayjs(row.shiftEnd)}
        onChange={newValue => updateEmployeeTime(row, newValue, 'shiftEnd')}
        variant="outlined"
        style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
        // forceDesktop
        ampm={false}
        error={!!formik.errors.employees?.[row.index]?.shiftEnd}
        helperText={formik.errors.employees?.[row.index]?.shiftEnd as string}
        title="Selecteaza ora"
        closeButtonLabel="Anuleaza"
        confirmButtonLabel="Confirma"
      />
    )
  }
]
