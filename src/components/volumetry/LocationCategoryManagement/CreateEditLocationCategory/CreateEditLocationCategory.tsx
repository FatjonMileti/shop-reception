import { useNotification } from 'hooks'
import { ChangeEvent, useMemo } from 'react'
import { getInitialValues, getValidationSchema, toLocationCategoryPayload } from './helpers'
import { useFormik } from 'formik'
import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMutation } from 'react-query'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { handleQueryError } from 'utils/helpers'
import { CreateEditLocationCategoryProps } from 'components/volumetry/interfaces'
import { locationTypeOptions } from '../helpers'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

const CreateEditLocationCategory: React.FC<CreateEditLocationCategoryProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const submitCategory = async values => {
    if (editItem) {
      await makeCorePutRequest(`/volumetry/locations/categories/${editItem.id}`, values)
    } else {
      await makeCorePostRequest('/volumetry/locations/categories', values)
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
      mutate(toLocationCategoryPayload(values))
      resetForm()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza business unit' : 'Creeaza business unit'}
    >
      <Grid container spacing={4}>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        <Grid xs={12} item>
          <Input
            type="text"
            name="name"
            label="Nume business unit"
            fullWidth
            variant="outlined"
            value={formik.values.categoryName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('categoryName', event.currentTarget.value)
            }
            error={!!formik.errors.categoryName}
            helperText={formik.errors.categoryName as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <Input
            type="textarea"
            name="description"
            label="Descriere"
            style={{ width: '100%' }}
            rows={4}
            variant="outlined"
            value={formik.values.description}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('description', event.currentTarget.value)
            }
            error={!!formik.errors.description}
            helperText={formik.errors.description as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <AsyncAutocomplete
            variant="outlined"
            name="locationType"
            label="Tip magazin"
            value={formik.values.locationType}
            options={locationTypeOptions}
            onChange={value => formik.setFieldValue('locationType', value)}
            error={!!formik.errors.locationType}
            helperText={formik.errors.locationType as string}
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
