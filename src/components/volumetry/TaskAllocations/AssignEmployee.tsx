import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from './TaskAllocations.modules.scss'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { Input } from 'components/core-ui/Input'
import { ChangeEvent } from 'react'
import { useFormik } from 'formik'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { getEmployeesOptions } from '../api'
import { handleQueryError } from 'utils/helpers'
import * as yup from 'yup'
import { AssignEmployeeProps } from './TaskAllocationsDefinitions'

const AssignEmployee = (props: AssignEmployeeProps) => {
  const {
    isModalOpen,
    closeModal,
    taskName,
    departmentAlias,
    workloadMeasurementUnit,
    setShouldRefreshData,
    taskTemplateId,
    setSelectedRowId
  } = props
  const { showNotification } = useNotification()

  const { data: employeeOptions, isLoading: isEmployeeOptionsLoading } = getEmployeesOptions(
    showNotification,
    isModalOpen
  )

  const assignEmployee = async values => {
    await makeCorePostRequest(`/volumetry/tasks`, values)
  }

  const { isLoading, mutate } = useMutation(assignEmployee, {
    onSuccess: res => {
      closeModal()
      showNotification({
        message: 'Anagajatul a fost asignat cu succes',
        type: 'success'
      })

      setSelectedRowId(taskTemplateId)
      setShouldRefreshData(true)
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la asignarea angajatului.', showNotification)
  })

  const validationSchema = yup.object({
    workerId: yup.number().required('Acest camp este obligatoriu.'),
    taskTemplateId: yup.number().required('Acest camp este obligatoriu.'),
    allocatedWorkload: yup.number().required('Acest camp este obligatoriu.')
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: validationSchema,
    initialValues: {
      workerId: null,
      taskTemplateId: taskTemplateId,
      allocatedWorkload: 0
    },
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        allocatedWorkload: values.allocatedWorkload,
        workerId: values.workerId,
        taskTemplateId: values.taskTemplateId
      }
      mutate(payload)
      resetForm()
      closeModal()
    }
  })
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle="Selecteaza angajat"
      modalWidth="50%"
    >
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Task:', name: taskName },
              { label: 'Departament/Raion:', name: departmentAlias },
              { label: 'UM:', name: workloadMeasurementUnit }
            ]}
          />
        </Grid>

        <Grid xs={12} item>
          {!isEmployeeOptionsLoading && (
            <AsyncAutocomplete
              variant="outlined"
              name="workerId"
              label="Selecteaza angajat"
              options={employeeOptions}
              onChange={(employee: any) => formik.setFieldValue('workerId', employee?.value)}
              groupBy={option => option.groupBy}
              error={!!formik.errors.workerId}
              helperText={formik.errors.workerId as string}
              required
            />
          )}
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            name="allocatedWorkload"
            label="Volum alocat"
            variant="outlined"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('allocatedWorkload', event.target.value)
            }
            value={formik.values.allocatedWorkload}
            style={{ width: '100%' }}
            error={!!formik.errors.allocatedWorkload}
            helperText={formik.errors.allocatedWorkload as string}
            required
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label={'Anuleaza'} onClick={() => closeModal()} />
          <Button variant="contained" label={'Salveaza'} onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AssignEmployee
