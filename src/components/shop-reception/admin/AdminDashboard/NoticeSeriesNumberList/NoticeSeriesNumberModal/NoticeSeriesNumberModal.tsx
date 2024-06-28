import { useMemo } from 'react'
import { Input, Button, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, validationSchema } from './helpers'
import { useNotification } from 'hooks'
import { handleQueryError } from 'utils/helpers'
import { useMutation } from 'react-query'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'

interface NoticeSeriesNumberModalProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: NoticeSeriesNumber
  societyOptions: AutocompleteOption[]
}

const ParentSocietyListModal: React.FC<NoticeSeriesNumberModalProps> = props => {
  const { showNotification } = useNotification()
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData, societyOptions } = props

  const mutateNoticeSeriesNumber = async values => {
    isEdit
      ? await makeCorePutRequest(`/shop-reception/notice-series-numbers/${editItem.id}`, values)
      : await makeCorePostRequest(`/shop-reception/notice-series-numbers`, values)
  }

  const { isLoading, mutate } = useMutation(mutateNoticeSeriesNumber, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
      showNotification({
        message: `Seria a fost ${isEdit ? 'editata' : 'creata'} cu succes`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(
        error,
        `A aparut o eroare la ${isEdit ? 'editarea' : 'crearea'} seriei.`,
        showNotification
      )
  })

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const payload = {
        ...values,
        parentSociety: values.parentSociety.value
      }
      mutate(payload)
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza serie' : 'Adauga serie'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Societate"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('parentSociety', option)}
            value={formik.values.parentSociety}
            options={societyOptions || []}
            error={!!formik.errors.parentSociety}
            helperText={formik.errors.parentSociety as string}
            disabled={isEdit}
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.noticeSeries}
            onChange={event =>
              formik.setFieldValue('noticeSeries', (event.target as HTMLInputElement).value)
            }
            label="Serie"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.noticeSeries}
            helperText={formik.errors.noticeSeries as string}
            required
            disabled={isEdit}
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="number"
            value={formik.values.noticeMinNumber}
            onChange={event =>
              formik.setFieldValue('noticeMinNumber', (event.target as HTMLInputElement).value)
            }
            label="Numar de inceput"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.noticeMinNumber}
            helperText={formik.errors.noticeMinNumber as string}
            required
            disabled={isEdit}
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="number"
            value={formik.values.noticeMaxNumber}
            onChange={event =>
              formik.setFieldValue('noticeMaxNumber', (event.target as HTMLInputElement).value)
            }
            label="Numar de sfarsit"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.noticeMaxNumber}
            helperText={formik.errors.noticeMaxNumber as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="number"
            value={formik.values.year}
            onChange={event =>
              formik.setFieldValue('year', (event.target as HTMLInputElement).value)
            }
            label="An"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.year}
            helperText={formik.errors.year as string}
            required
            disabled={isEdit}
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button
            variant="contained"
            label={isEdit ? 'Editeaza' : 'Salveaza'}
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ParentSocietyListModal
