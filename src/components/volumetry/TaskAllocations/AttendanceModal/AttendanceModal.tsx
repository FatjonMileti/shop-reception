import { useEffect, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { getEmployeesAttendance } from '../../api'
import { useMutation } from 'react-query'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { handleQueryError } from 'utils/helpers'
import { toEmployeesAllocationPayload, toEmployeesAttendancePayload } from '../serializers'
import { EmployeeAttendance } from './EmployeeAttendance'
import { useMediaQuery } from '@mui/material'
import { AllocationList } from './AllocationList'

const AttendanceModal = props => {
  const { isModalOpen, closeModal, departmentId, setAllExpanded } = props

  const [employees, setEmployees] = useState([])
  const [activeStep, setActiveStep] = useState(0)

  const { showNotification } = useNotification()

  const { data: employeesShifts, isLoading: isEmployeesLoading } = getEmployeesAttendance(
    departmentId,
    showNotification,
    isModalOpen
  )

  const isXs = useMediaQuery('(max-width:624px)')

  useEffect(() => {
    if (employeesShifts) {
      setEmployees(employeesShifts)
    }
  }, [employeesShifts])

  const updateEmployeesAttendance = async values => {
    await makeCorePutRequest('/volumetry/workers-schedule', values)
  }

  const { mutate: mutateEmployeesAttendance } = useMutation(updateEmployeesAttendance, {
    onSuccess: res => {},
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la alocarea automata.', showNotification)
  })

  const autoAllocateEmployees = async () => {
    await makeCorePostRequest(
      '/volumetry/tasks/automatic-allocation',
      toEmployeesAllocationPayload(employees)
    )
  }

  const { mutate: allocateEmployees } = useMutation(autoAllocateEmployees, {
    onSuccess: res => {
      closeModal()
      setAllExpanded(true)
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
      mutateEmployeesAttendance(toEmployeesAttendancePayload(employees))
    }
  })

  const toggleEmployee = employee => {
    const newEmployees = employees.map(emp =>
      emp.workerId === employee.workerId
        ? { ...emp, isPresent: !emp.isPresent, shouldAllocate: !emp.isPresent }
        : emp
    )
    setEmployees(newEmployees)
  }

  const toggleAllocateEmployee = employee => {
    const newEmployees = employees.map(emp =>
      emp.workerId === employee.workerId ? { ...emp, shouldAllocate: !emp.shouldAllocate } : emp
    )
    setEmployees(newEmployees)
  }

  const updateEmplpyeeTime = (employee, value, field) => {
    const newEmployees = employees.map(emp =>
      emp.workerId === employee.workerId ? { ...emp, [field]: value } : emp
    )
    setEmployees(newEmployees)
  }

  const resetModal = () => {
    setActiveStep(0)
    formik.resetForm()
  }

  console.log(employees)

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={
        activeStep === 0
          ? 'Confirma angajatii prezenti'
          : 'Confirma angajatii pe care vrei sa ii aloci'
      }
      modalWidth="80%"
    >
      {activeStep === 0 && (
        <EmployeeAttendance
          isEmployeesLoading={isEmployeesLoading}
          employees={employees}
          toggleEmployee={toggleEmployee}
          updateEmplpyeeTime={updateEmplpyeeTime}
          closeModal={closeModal}
          handleSubmit={formik.handleSubmit}
          increaseStep={() => setActiveStep(1)}
          isXs={isXs}
        />
      )}
      {activeStep === 1 && (
        <AllocationList
          employees={employees}
          toggleEmployee={toggleAllocateEmployee}
          isXs={isXs}
          closeModal={closeModal}
          allocateEmployees={allocateEmployees}
          resetModal={resetModal}
        />
      )}
    </Modal>
  )
}

export default AttendanceModal
