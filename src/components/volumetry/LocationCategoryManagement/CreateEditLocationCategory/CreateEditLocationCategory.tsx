import { useNotification } from 'hooks'
import { ChangeEvent, useMemo } from 'react'
import { getInitialValues, getValidationSchema } from './helpers'
import { useFormik } from 'formik'
import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMutation } from 'react-query'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { handleQueryError } from 'utils/helpers'
import { CreateEditLocationCategoryProps } from 'components/volumetry/interfaces'

const CreateEditLocationCategory: React.FC<CreateEditLocationCategoryProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const submitCategory = async values => {
    if (editItem) {
      await makeCorePutRequest(`/volumetry/categories/${editItem.id}`, values)
    } else {
      await makeCorePostRequest('/volumetry/categories', values)
    }
  }

  const { isLoading, mutate } = useMutation(submitCategory, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: 'Categoria a fost salvata cu succes',
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la salvarea categoriei.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      mutate(values)
      resetForm()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza categorie' : 'Creeaza categorie'}
    >
      <Grid container spacing={4}>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        <Grid xs={12} item>
          <Input
            type="text"
            name="name"
            label="Nume categorie"
            fullWidth
            variant="outlined"
            value={formik.values.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('name', event.currentTarget.value)
            }
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
            required
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

export default CreateEditLocationCategory
