import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from './TaskAllocation.modules.scss'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { Input } from 'components/core-ui/Input'
import { ChangeEvent } from 'react'
import { useFormik } from 'formik'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { useNotification } from 'hooks'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { getEmployeesOptions } from '../api'
import { handleQueryError } from '../utils'

interface AssignEmployeeProps {
  isModalOpen: boolean
  closeModal: Function
  taskName: string
  rayonsOrDepartment: string
  standardProductivity: string
  setShouldRefreshData: Function
  taskTemplateId: string
}

const AssignEmployee = (props: AssignEmployeeProps) => {
  const {
    isModalOpen,
    closeModal,
    taskName,
    rayonsOrDepartment,
    standardProductivity,
    setShouldRefreshData,
    taskTemplateId
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

      setShouldRefreshData(true)
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la asignarea angajatului.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      workerId: null,
      taskTemplateId: taskTemplateId,
      workload: 0
    },
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        workload: values.workload,
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
              { label: 'Departament/Raion:', name: rayonsOrDepartment },
              { label: 'UM:', name: standardProductivity }
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
            />
          )}
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            name="volume"
            label="Volum"
            variant="outlined"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('workload', event.target.value)
            }
            value={formik.values.workload}
            style={{ width: '100%' }}
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
