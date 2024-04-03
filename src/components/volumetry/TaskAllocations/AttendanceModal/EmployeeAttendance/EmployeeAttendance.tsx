import { useMemo } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Button, FormTable } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { EmployeeAttendanceProps } from 'components/volumetry/interfaces'
import { buildColumns } from './helpers'

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

  const submitStep = async () => {
    await handleSubmit()
    increaseStep()
  }

  const columns = useMemo(
    () => buildColumns({ toggleEmployee, updateEmployeeTime, isXs }),
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
      <Box style={{ height: '55vh', overflowY: 'scroll' }}>
        <FormTable columns={columns} rows={employees} />
      </Box>
      <Box className={s.modalButtons} style={{ width: '50%', float: 'right', marginTop: '20px' }}>
        <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
        <Button variant="contained" label="Continua" onClick={submitStep} />
      </Box>
    </Box>
  )
}

export default EmployeeAttendance
