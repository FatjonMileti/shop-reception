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
import { AttendanceModalProps } from 'components/volumetry/interfaces'

const AttendanceModal = (props: AttendanceModalProps) => {
  const { isModalOpen, closeModal, departmentId } = props

  const [employees, setEmployees] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const [allocateEmployeesAllSelected, setAllocateEmployeesAllSelected] = useState(true)

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

  useEffect(() => {
    const newEmployees = employees.map(emp => ({
      ...emp,
      shouldAllocate: allocateEmployeesAllSelected
    }))
    setEmployees(newEmployees)
  }, [allocateEmployeesAllSelected])

  const updateEmployeesAttendance = async values => {
    await makeCorePutRequest('/volumetry/workers-schedule', values)
  }

  const { mutate: mutateEmployeesAttendance } = useMutation(updateEmployeesAttendance, {
    onSuccess: () => {},
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
    onSuccess: () => {
      resetModal()
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
    closeModal()
    setActiveStep(0)
    formik.resetForm()
  }

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
          closeModal={closeModal}
          allocateEmployees={allocateEmployees}
          allocateEmployeesAllSelected={allocateEmployeesAllSelected}
          setAllocateEmployeesAllSelected={setAllocateEmployeesAllSelected}
        />
      )}
    </Modal>
  )
}

export default AttendanceModal
