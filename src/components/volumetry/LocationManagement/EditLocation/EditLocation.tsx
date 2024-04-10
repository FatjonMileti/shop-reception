import { EditLocationProps, LocationItemPayload } from 'components/volumetry/interfaces'
import { useNotification } from 'hooks'
import { ChangeEvent, useMemo } from 'react'
import { getInitialValues, getValidationSchema } from './helpers'
import { useFormik } from 'formik'
import { Modal } from 'components/core-ui/Modal'
import { Grid } from '@mui/material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useMutation } from 'react-query'
import { makeCorePatchRequest, makeCorePutRequest } from 'utils/api'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { getCategoriesOptions, getRegionsOptions } from 'components/volumetry/api'
import { handleQueryError } from 'utils/helpers'
import { toLocationPayload } from './serializers'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

const EditLocation: React.FC<EditLocationProps> = props => {
  const { isModalOpen, closeModal, editItem, editItemId, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const submitLocation = async (values: LocationItemPayload) => {
    await makeCorePatchRequest(`/volumetry/locations/${editItemId}/volumetry-category`, values)
  }

  const { mutate } = useMutation(submitLocation, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: 'Schimbarile pentru locatie au fost salvate cu succes',
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la salvarea locatiei.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      mutate(toLocationPayload(values))
      resetForm()
    }
  })

  const { data: regionsOptions } = getRegionsOptions(showNotification, editItemId)

  const { data: categoriesOptions } = getCategoriesOptions(showNotification, editItemId)

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Editeaza locatie">
      <Grid container spacing={4}>
        <Grid xs={12} item>
          <FormInfoItems items={[{ label: 'Nume:', name: editItem?.locationName ?? '' }]} />
        </Grid>
        <Grid xs={12} item>
          <AsyncAutocomplete
            variant="outlined"
            name="category"
            label="Business unit"
            value={formik.values.category}
            options={categoriesOptions || []}
            onChange={value => formik.setFieldValue('category', value)}
            error={!!formik.errors.category}
            helperText={formik.errors.category as string}
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
export default EditLocation
