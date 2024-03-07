import { Box, CircularProgress, Grid } from '@mui/material'
import { Button, Checkbox, TimePicker, Table } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { EmployeeAttendanceProps } from 'components/volumetry/interfaces'
import { useMemo } from 'react'
import { buildColumns } from './helpers'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'

const EmployeeAttendance = (props: EmployeeAttendanceProps) => {
  const {
    isEmployeesLoading,
    employees,
    toggleEmployee,
    updateEmplpyeeTime,
    closeModal,
    handleSubmit,
    increaseStep,
    isXs
  } = props

  const submitStep = async () => {
    await handleSubmit()
    increaseStep()
  }

  const tableColumns = useMemo(
    () => buildColumns({ toggleEmployee, updateEmplpyeeTime }) as TableHeaderType[],
    [employees]
  )

  return isEmployeesLoading ? (
    <div style={{ display: 'flex' }}>
      <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
    </div>
  ) : (
    <Box>
      <Box style={{ height: '60vh', overflowY: 'scroll' }}>
        <Table
          hideCheckbox
          orderBy="name"
          order="desc"
          columns={tableColumns}
          rows={employees}
          isLoading={false}
          disablePagination
        />
        {/* {employees.map(employee => (
          <Grid container>
            <Grid item xs={12} md={4}>
              <Checkbox
                edge="start"
                checked={employee.isPresent}
                onChange={() => toggleEmployee(employee)}
                inputProps={{ 'aria-labelledby': `employee-${employee.value}` }}
                label={`${employee.fullName} (${employee.genericDepartment})`}
                style={
                  isXs
                    ? { marginLeft: 0 }
                    : { lineHeight: '70px', display: 'inline-block', marginLeft: 0 }
                }
              />
            </Grid>
            <Grid item xs={12} md={4} style={{ paddingRight: '40px' }}>
              <TimePicker
                label="Ora inceput de tura"
                value={employee.shiftStart}
                onChange={newValue => updateEmplpyeeTime(employee, newValue, 'shiftStart')}
                required
                variant="outlined"
                style={{ width: '100%' }}
                forceDesktop
              />
            </Grid>
            <Grid item xs={12} md={4} style={{ paddingRight: '40px' }}>
              <TimePicker
                label="Ora final de tura"
                value={employee.shiftEnd}
                onChange={newValue => updateEmplpyeeTime(employee, newValue, 'shiftEnd')}
                required
                variant="outlined"
                style={{ width: '100%' }}
                forceDesktop
              />
            </Grid>
          </Grid>
        ))} */}
      </Box>
      <Box className={s.modalButtons} style={{ width: '50%', float: 'right', marginTop: '20px' }}>
        <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
        <Button variant="contained" label="Continua" onClick={submitStep} />
      </Box>
    </Box>
  )
}

export default EmployeeAttendance
