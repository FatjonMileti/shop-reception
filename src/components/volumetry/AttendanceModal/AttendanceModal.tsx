import { useEffect, useState } from 'react'
import { ChangeEvent } from 'react'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { getEmployeesAttendance } from '../api'
import { useMutation } from 'react-query'
import { makeCorePostRequest } from 'utils/api'
import { handleQueryError } from '../utils'
import { toAllocateEmployeesPayload } from '../TaskAllocations/serializers'

const AttendanceModal = props => {
  const { isModalOpen, closeModal } = props

  const [employees, setEmployees] = useState([])

  const { showNotification } = useNotification()

  const isXs = useMediaQuery('(max-width:624px)')

  const { data: employeesShifts, isLoading: isEmployeesLoading } = getEmployeesAttendance(
    showNotification,
    isModalOpen
  )

  useEffect(() => {
    if (employeesShifts) {
      setEmployees(employeesShifts)
    }
  }, [employeesShifts])

  const allocateEmployees = async values => {
    await makeCorePostRequest(`/volumetry/tasks/automate`, values)
  }

  const { isLoading, mutate } = useMutation(allocateEmployees, {
    onSuccess: res => {
      closeModal()
      showNotification({
        message: 'Alocarea automata a rulat cu succes',
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la alocarea automata.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {},
    // validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      debugger
      mutate(toAllocateEmployeesPayload(employees))
    }
  })

  const toggleEmployee = employee => {
    const newEmployees = employees.map(emp =>
      emp.workerId === employee.workerId ? { ...emp, isPresent: !emp.isPresent } : emp
    )
    setEmployees(newEmployees)
  }

  const updateEmplpyeeTime = (employee, value, field) => {
    const newEmployees = employees.map(emp =>
      emp.workerId === employee.workerId ? { ...emp, [field]: value } : emp
    )
    setEmployees(newEmployees)
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={'Confirma angajatii prezenti'}
      modalWidth="80%"
    >
      {isEmployeesLoading ? (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      ) : (
        <Box>
          {employees.map(employee => (
            <Grid container>
              <Grid item xs={12} md={4}>
                <Checkbox
                  edge="start"
                  checked={employee.isPresent}
                  onChange={() => toggleEmployee(employee)}
                  inputProps={{ 'aria-labelledby': `employee-${employee.value}` }}
                  label={`${employee.fullName} (${employee.genericDepartment})`}
                  style={isXs ? {} : { lineHeight: '70px', display: 'inline-block' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Input
                  type="text"
                  name="startTime"
                  label="Ora de inceput"
                  variant="outlined"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateEmplpyeeTime(employee, event.target.value, 'startTime')
                  }
                  value={employee.startTime}
                  style={{ display: 'inline-block' }}
                  // error={!!formik.errors.workload}
                  // helperText={formik.errors.workload as string}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Input
                  type="text"
                  name="endTime"
                  label="Ora de final"
                  variant="outlined"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateEmplpyeeTime(employee, event.target.value, 'endTime')
                  }
                  value={employee.endTime}
                  style={{ display: 'inline-block' }}
                  // error={!!formik.errors.workload}
                  // helperText={formik.errors.workload as string}
                  required
                />
              </Grid>
            </Grid>
          ))}
          <Box
            className={s.modalButtons}
            style={{ width: '50%', float: 'right', marginTop: '20px' }}
          >
            <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
            <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
          </Box>
        </Box>
      )}
    </Modal>
  )
}

export default AttendanceModal
