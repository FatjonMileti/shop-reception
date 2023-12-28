import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import * as yup from 'yup'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { getFormInitialValues } from './helpers'

interface EditAllocationModalProps {
  isModalOpen: boolean
  closeModal: Function
  task: any // TODO: To add interface when db schema is defined
  setShouldRefreshData: Function
  editItem?: any // TODO: To add interface when db schema is defined
  employee?: any // TODO: To add type when db schema is defined
}

const validationSchema = yup.object({
  id: yup.string().nonNullable(),
  volume: yup.string().nonNullable(),
  message: yup.string()
})

const EditAllocationModal = (props: EditAllocationModalProps) => {
  const { isModalOpen, closeModal, editItem, employee, setShouldRefreshData, task } = props

  const { showNotification } = useNotification()

  const editCurrentAllocation = async values => {
    await makeCorePutRequest(
      `/volumetry/taskAllocation/details/${editItem ? editItem?.id : employee.employee.id}`,
      values
    )
  }

  const { isLoading, mutate } = useMutation(editCurrentAllocation, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: editItem ? 'Alocarea a fost editata cu succes' : 'Taskul a fost oprit cu succes',
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la ${
          editItem ? 'editarea alocarii' : 'oprirea taskului'
        }. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: getFormInitialValues(editItem),
    validationSchema: validationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      mutate(values)
      resetForm()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={editItem ? 'Editeaza alocare' : 'Opreste task'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Task:', name: task?.taskName },
              { label: 'Departament/Raion:', name: task?.department?.name },
              {
                label: 'Angajat:',
                name: editItem ? editItem?.employee?.name : employee?.employee?.name
              }
            ]}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            variant="outlined"
            name="volume"
            label="Volum"
            value={formik.values.volume}
            width="100%"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('volume', (event.target as HTMLInputElement).value)
            }
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="textarea"
            variant="outlined"
            name="message"
            label="Mesaj"
            value={formik.values.customText}
            width="100%"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('customText', (event.target as HTMLInputElement).value)
            }
            rows={7}
            required={!!employee}
          />
        </Grid>

        <Grid xs={12} item>
          <Grid container spacing={2}>
            <Grid md={6} xs={12} item></Grid>
            <Grid md={6} xs={12} item className={s.modalButtons}>
              <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
              <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditAllocationModal
