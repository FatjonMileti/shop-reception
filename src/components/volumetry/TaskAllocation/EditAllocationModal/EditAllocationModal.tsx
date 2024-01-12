import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { ChangeEvent, MouseEvent } from 'react'
import { useMutation } from 'react-query'
import { makeCorePutRequest } from 'utils/api'
import * as yup from 'yup'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { getFormInitialValues } from './helpers'
import { handleQueryError } from 'components/volumetry/utils'

interface EditAllocationModalProps {
  isModalOpen: boolean
  closeModal: Function
  task: any // TODO: To add interface when db schema is defined
  setShouldRefreshData: Function
  editItem?: any // TODO: To add interface when db schema is defined
  employee?: any // TODO: To add type when db schema is defined
}

const validationSchema = yup.object({
  workload: yup.number().required('Acest camp este obligatoriu.'),
  comment: yup.string()
})

const EditAllocationModal = (props: EditAllocationModalProps) => {
  const { isModalOpen, closeModal, editItem, employee, setShouldRefreshData, task } = props
  const { showNotification } = useNotification()

  const editCurrentAllocation = async values => {
    await makeCorePutRequest(`/volumetry/tasks/${editItem ? editItem?.id : employee.id}`, {
      ...values,
      ...(employee ? { action: 'STOP' } : {})
    })
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
    onError: error => {
      handleQueryError(
        error,
        `A aparut o eroare la ${editItem ? 'editarea alocarii' : 'oprirea taskului'}.`,
        showNotification
      )
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: getFormInitialValues(editItem || employee),
    validationSchema: validationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      mutate(values)
      resetForm()
    }
  })

  const cancel = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    closeModal()
  }

  const submit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    formik.handleSubmit()
  }

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={cancel}
      modalTitle={editItem ? 'Editeaza alocare' : 'Opreste task'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Task:', name: task?.taskName },
              { label: 'Departament/Raion:', name: task?.rayonsOrDepartment },
              {
                label: 'Angajat:',
                name: employee?.workerFullName
              }
            ]}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="number"
            variant="outlined"
            name="workload"
            label="Volum"
            value={formik.values.workload}
            width="100%"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('workload', (event.target as HTMLInputElement).value)
            }
            error={!!formik.errors.workload}
            helperText={formik.errors.workload as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="textarea"
            variant="outlined"
            name="comment"
            label="Mesaj"
            value={formik.values.comment}
            width="100%"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('comment', (event.target as HTMLInputElement).value)
            }
            rows={7}
          />
        </Grid>

        <Grid xs={12} item>
          <Grid container spacing={2}>
            <Grid md={6} xs={12} item></Grid>
            <Grid md={6} xs={12} item className={s.modalButtons}>
              <Button variant="outlined" label="Anuleaza" onClick={event => cancel(event)} />
              <Button variant="contained" label="Salveaza" onClick={event => submit(event)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditAllocationModal
