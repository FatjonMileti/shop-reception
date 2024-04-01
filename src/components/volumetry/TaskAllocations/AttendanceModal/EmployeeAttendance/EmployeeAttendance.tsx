import { Box, CircularProgress, Grid, Paper } from '@mui/material'
import { Button, Checkbox, Table, TimePicker, FormTable } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { EmployeeAttendanceProps } from 'components/volumetry/interfaces'
import { Fragment, useMemo } from 'react'
import { buildColumns } from './helpers'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'
import dayjs from 'dayjs'
import cn from 'classnames'
import es from './EmployeeAttendance.modules.scss'

const EmployeeAttendance = (props: EmployeeAttendanceProps) => {
  const {
    isEmployeesLoading,
    employees,
    toggleEmployee,
    updateEmployeeTime,
    closeModal,
    handleSubmit,
    increaseStep,
    isXs,
    formik
  } = props

  const columns = [
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
      title: 'Ora inceput de tura',
      field: 'shiftStart',
      render: row => (
        <TimePicker
          label=""
          value={row.shiftStart}
          onChange={newValue => updateEmployeeTime(row, newValue, 'shiftStart')}
          variant="outlined"
          style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
          forceDesktop
          ampm={false}
        />
      )
    },
    {
      title: 'Ora final de tura',
      field: 'shiftEnd',
      render: row => (
        <TimePicker
          label=""
          value={row.shiftEnd}
          onChange={newValue => updateEmployeeTime(row, newValue, 'shiftEnd')}
          variant="outlined"
          style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
          forceDesktop
          ampm={false}
        />
      )
    }
  ]

  const submitStep = async () => {
    await handleSubmit()
    increaseStep()
  }

  const tableColumns = useMemo(
    () => buildColumns({ toggleEmployee, updateEmployeeTime, isXs }) as TableHeaderType[],
    [employees]
  )

  const checkSelected = formik.values.employees.some(
    employee => employee.isPresent || employee.shouldAllocate
  )
  const selectOrDeselectAll = employees => {
    formik.setFieldValue(
      'employees',
      employees.map(employee => ({
        ...employee,
        isPresent: checkSelected ? false : true,
        shouldAllocate: checkSelected ? false : true
      }))
    )
  }

  return isEmployeesLoading ? (
    <div style={{ display: 'flex' }}>
      <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
    </div>
  ) : (
    <Box>
      <Button
        variant="contained"
        label={checkSelected ? 'Debifeaza toti angajatii' : 'Bifeaza toti angajatii'}
        onClick={() => selectOrDeselectAll(employees)}
        style={{ marginBottom: '1em' }}
      />
      <Box style={{ height: '60vh', overflowY: 'scroll' }}>
        <FormTable columns={columns} rows={employees} />
        {/* <Box className={es.container}>
          <Grid container>
            <Grid item xs={12} md={4} className={cn(es.item, es.headerItem)}>
              Angajat
            </Grid>
            <Grid item xs={12} md={4} className={cn(es.item, es.headerItem)}>
              Ora inceput de tura
            </Grid>
            <Grid item xs={12} md={4} className={cn(es.item, es.headerItem)}>
              Ora final de tura
            </Grid>
          </Grid>
          {employees.map(employee => (
            <Grid container key={employee.id} className={es.bodyItemContainer}>
              <Grid item xs={12} md={4} className={cn(es.item, es.bodyItem)}>
                <Checkbox
                  edge="start"
                  checked={employee.isPresent}
                  onChange={() => toggleEmployee(employee)}
                  inputProps={{ 'aria-labelledby': `employee-${employee.value}` }}
                  label={employee.fullName}
                  style={{ fontSize: '12px !important' }}
                />
              </Grid>
              <Grid item xs={12} md={4} className={cn(es.item, es.bodyItem)}>
                <TimePicker
                  label=""
                  value={employee.shiftStart}
                  onChange={newValue => updateEmployeeTime(employee, newValue, 'shiftStart')}
                  variant="outlined"
                  style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
                  forceDesktop
                  ampm={false}
                />
              </Grid>
              <Grid item xs={12} md={4} className={cn(es.item, es.bodyItem)}>
                <TimePicker
                  label=""
                  value={employee.shiftEnd}
                  onChange={newValue => updateEmployeeTime(employee, newValue, 'shiftEnd')}
                  variant="outlined"
                  style={isXs ? { width: '100%', minWidth: '200px' } : { width: '100%' }}
                  forceDesktop
                  ampm={false}
                />
              </Grid>
            </Grid>
          ))}
        </Box> */}
      </Box>
      <Box className={s.modalButtons} style={{ width: '50%', float: 'right', marginTop: '20px' }}>
        <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
        <Button variant="contained" label="Continua" onClick={submitStep} />
      </Box>
    </Box>
  )
}

export default EmployeeAttendance
