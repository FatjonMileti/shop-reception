import { useEffect, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { setEmployeesAttendance } from '../../api'
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
  const { showNotification } = useNotification()

  const isXs = useMediaQuery('(max-width:624px)')

  const [activeStep, setActiveStep] = useState(0)
  const [allocateEmployeesAllSelected, setAllocateEmployeesAllSelected] = useState(true)

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      employees: []
    },
    // validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutateEmployeesAttendance(toEmployeesAttendancePayload(values.employees))
    }
  })

  const { data: employeesShifts, isLoading: isEmployeesLoading } = setEmployeesAttendance(
    departmentId,
    showNotification,
    isModalOpen,
    values => formik.setFieldValue('employees', values)
  )

  useEffect(() => {
    const newEmployees = formik.values.employees.map(emp => ({
      ...emp,
      shouldAllocate: allocateEmployeesAllSelected
    }))
    formik.setFieldValue('employees', newEmployees)
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
      toEmployeesAllocationPayload(formik.values.employees)
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

  const toggleEmployee = employee => {
    const newEmployees = formik.values.employees.map(emp =>
      emp.workerId === employee.workerId
        ? { ...emp, isPresent: !emp.isPresent, shouldAllocate: !emp.isPresent }
        : emp
    )
    formik.setFieldValue('employees', newEmployees)
  }

  const toggleAllocateEmployee = employee => {
    const newEmployees = formik.values.employees.map(emp =>
      emp.workerId === employee.workerId ? { ...emp, shouldAllocate: !emp.shouldAllocate } : emp
    )
    formik.setFieldValue('employees', newEmployees)
  }

  const updateEmplpyeeTime = (employee, value, field) => {
    const newEmployees = formik.values.employees.map(emp =>
      emp.workerId === employee.workerId ? { ...emp, [field]: value } : emp
    )
    formik.setFieldValue('employees', newEmployees)
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
      modalWidth="60%"
    >
      {
        [
          <EmployeeAttendance
            isEmployeesLoading={isEmployeesLoading}
            employees={formik.values.employees}
            toggleEmployee={toggleEmployee}
            updateEmplpyeeTime={updateEmplpyeeTime}
            closeModal={resetModal}
            handleSubmit={formik.handleSubmit}
            increaseStep={() => setActiveStep(1)}
            isXs={isXs}
          />,
          <AllocationList
            employees={formik.values.employees.filter(employee => employee.isPresent)}
            toggleEmployee={toggleAllocateEmployee}
            closeModal={resetModal}
            allocateEmployees={allocateEmployees}
            allocateEmployeesAllSelected={allocateEmployeesAllSelected}
            setAllocateEmployeesAllSelected={setAllocateEmployeesAllSelected}
          />
        ][activeStep]
      }
    </Modal>
  )
}

export default AttendanceModal
