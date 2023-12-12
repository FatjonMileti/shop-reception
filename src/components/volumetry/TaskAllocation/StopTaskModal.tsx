import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'

import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { useFormik } from 'formik'
import { makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { ChangeEvent } from 'react'

interface StopTaskModalProps {
  isModalOpen: boolean
  closeModal: Function
  employee: any // TODO: To add type when db schema is defined
  task: any // TODO: To add type when db schema is defined
}

const StopTaskModal: React.FC<StopTaskModalProps> = props => {
  const { isModalOpen, closeModal, employee, task } = props
  const { showNotification } = useNotification()

  const submitStopTask = async values => {
    await makeCorePutRequest(`/volumetry/taskAllocation/details/${employee.employee.id}`, values)
  }

  const { isLoading, mutate } = useMutation(submitStopTask, {
    onSuccess: res => {
      closeModal()
      showNotification({
        message: `Taskul a fost oprit cu succes!`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      customText: ''
    },
    onSubmit: async (values, { resetForm }) => {
      mutate(values)
      resetForm()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={'Selecteaza angajat'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Task:', name: task.taskName },
              { label: 'Dep.:', name: task.department.name },
              { label: 'Angajat:', name: employee.employee.name }
            ]}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="textarea"
            variant="outlined"
            name="mandatory"
            label="Mesaj"
            value={formik.values.customText}
            width="100%"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('customText', (event.target as HTMLInputElement).value)
            }
            rows={7}
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default StopTaskModal
