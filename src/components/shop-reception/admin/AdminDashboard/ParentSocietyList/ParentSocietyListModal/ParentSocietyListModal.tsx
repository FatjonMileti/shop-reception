import { useMemo } from 'react'
import { Input, Button } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, validationSchema } from './helpers'
import { useNotification } from 'hooks'
import { handleQueryError } from 'utils/helpers'
import { useMutation } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'

interface ParentSocietyListModalProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: ParentSociety
}

const ParentSocietyListModal: React.FC<ParentSocietyListModalProps> = props => {
  const { showNotification } = useNotification()
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const mutateParentSociety = async values => {
    await makeCorePostRequest('/shop-reception/parentSociety', values)
  }

  const { isLoading, mutate } = useMutation(mutateParentSociety, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
      showNotification({
        message: `Societatea a fost ${isEdit ? 'editata' : 'creata'} cu succes`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(
        error,
        `A aparut o eroare la ${isEdit ? 'editarea' : 'crearea'} societatii.`,
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
        ...(editItem && { id: editItem.id })
      }
      mutate(payload)
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza societatea' : 'Adauga societate'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.parentSocietyName}
            onChange={event =>
              formik.setFieldValue('parentSocietyName', (event.target as HTMLInputElement).value)
            }
            label="Societate"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.parentSocietyName}
            helperText={formik.errors.parentSocietyName as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.businessName}
            onChange={event =>
              formik.setFieldValue('businessName', (event.target as HTMLInputElement).value)
            }
            label="Denumire Comerciala"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.businessName}
            helperText={formik.errors.businessName as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.regNumber}
            onChange={event =>
              formik.setFieldValue('regNumber', (event.target as HTMLInputElement).value)
            }
            label="Nr. Registrul Comertului"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.regNumber}
            helperText={formik.errors.regNumber as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.vatId}
            onChange={event =>
              formik.setFieldValue('vatId', (event.target as HTMLInputElement).value)
            }
            label="CUI"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.vatId}
            helperText={formik.errors.vatId as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.fiscalAddress}
            onChange={event =>
              formik.setFieldValue('fiscalAddress', (event.target as HTMLInputElement).value)
            }
            label="Adresa"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.fiscalAddress}
            helperText={formik.errors.fiscalAddress as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.bankAccount}
            onChange={event =>
              formik.setFieldValue('bankAccount', (event.target as HTMLInputElement).value)
            }
            label="Iban"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.bankAccount}
            helperText={formik.errors.bankAccount as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.bankName}
            onChange={event =>
              formik.setFieldValue('bankName', (event.target as HTMLInputElement).value)
            }
            label="Banca"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.bankName}
            helperText={formik.errors.bankName as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.socialCap}
            onChange={event =>
              formik.setFieldValue('socialCap', (event.target as HTMLInputElement).value)
            }
            label="Capital social"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.socialCap}
            helperText={formik.errors.socialCap as string}
            required
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
