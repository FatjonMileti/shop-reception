import { Modal } from 'components/core-ui/Modal'
import { Grid } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { handleQueryError } from 'utils/helpers'
import { useMemo } from 'react'

interface CreateEditResponsibleProps {
  isModalOpen: boolean
  closeModal: Function
  editItem?: TransportResponsible
  setShouldRefreshData: Function
}

const CreateEditResponsible: React.FC<CreateEditResponsibleProps> = props => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const mutateResponsible = async values => {
    editItem
      ? await makeCorePutRequest(
          `/shop-reception/return-truck-carrier-responsible/${editItem.id}`,
          values
        )
      : await makeCorePostRequest(`/shop-reception/return-truck-carrier-responsible`, values)
  }

  const { isLoading, mutate } = useMutation(mutateResponsible, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
      showNotification({
        message: `Responsabilul a fost ${editItem ? 'editat' : 'adaugat'} cu succes!`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(
        error,
        `Eroare la ${editItem ? 'editarea responsabilului' : 'adaugarea responsabilului.'}`,
        showNotification
      )
  })

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: TransportResponsible) => {
      mutate(values)
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={editItem ? 'Editeaza colaborator' : 'Adauga colaborator'}
      modalWidth="50%"
    >
      <Grid container spacing={4}>
        <Grid xs={6} item>
          <Input
            type="text"
            name="firstName"
            label="Prenume"
            fullWidth
            variant="outlined"
            value={formik.values.firstName}
            onChange={event => formik.setFieldValue('firstName', event.currentTarget.value)}
            error={!!formik.errors.firstName}
            helperText={formik.errors.firstName as string}
            required
          />
        </Grid>
        <Grid xs={6} item>
          <Input
            type="text"
            name="name"
            label="Nume"
            fullWidth
            variant="outlined"
            value={formik.values.lastName}
            onChange={event => formik.setFieldValue('lastName', event.currentTarget.value)}
            error={!!formik.errors.lastName}
            helperText={formik.errors.lastName as string}
            required
          />
        </Grid>
        <Grid xs={6} item>
          <Input
            type="text"
            name="email"
            label="Adresa de mail"
            fullWidth
            variant="outlined"
            value={formik.values.email}
            onChange={event => formik.setFieldValue('email', event.currentTarget.value)}
            error={!!formik.errors.email}
            helperText={formik.errors.email as string}
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

export default CreateEditResponsible
