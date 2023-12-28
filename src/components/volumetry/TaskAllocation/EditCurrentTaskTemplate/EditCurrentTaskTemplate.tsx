import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
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
import { toCurrentTaskPayload } from './serializers'

interface EditCurrentTaskTemplateProps {
  isModalOpen: boolean
  closeModal: Function
  editItem: any // TODO: To add interface when db schema is defined
  setShouldRefreshData: Function
}

const validationSchema = yup.object({
  id: yup.string().nonNullable(),
  volume: yup.string().nonNullable()
})

const EditCurrentTaskTemplate = (props: EditCurrentTaskTemplateProps) => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const editCurrentTemplate = async values => {
    await makeCorePutRequest(`/volumetry/task/${editItem?.id}`, values)
  }

  const { isLoading, mutate } = useMutation(editCurrentTemplate, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: 'Volumul a fost editat cu succes',
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la editarea volumului. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      id: editItem?.id || 0,
      totalVolume: editItem?.volume?.total || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(toCurrentTaskPayload(values))
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'}>
      <Grid container spacing={4}>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}

        <Grid xs={12} item>
          <FormInfoItems items={[{ label: 'Nume:', name: editItem['taskName'] }]} />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            name="totalVolume"
            label="Volum"
            variant="outlined"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('totalVolume', event.target.value)
            }
            value={formik.values.totalVolume}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditCurrentTaskTemplate
