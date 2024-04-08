import { useMemo } from 'react'
import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { Grid } from '@mui/material'
import { AutocompleteOption } from 'components/volumetry/interfaces'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'

interface SensitiveProductProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: SensitiveProduct
  shopTypes: AutocompleteOption[]
  metiRayons: AutocompleteOption[]
  metiFamilies: AutocompleteOption[]
  metiSubfamilies: AutocompleteOption[]
  metiUB: AutocompleteOption[]
}

const SensitiveProduct: React.FC<SensitiveProductProps> = props => {
  const {
    isModalOpen,
    closeModal,
    isEdit,
    editItem,
    setShouldRefreshData,
    shopTypes,
    metiRayons,
    metiFamilies,
    metiSubfamilies,
    metiUB
  } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const createUpdateProduct = async (values: any) => {
    isEdit
      ? await makeCorePutRequest(`/shop-reception/sensitives/${editItem.id}`, values)
      : await makeCorePostRequest(`/shop-reception/sensitives`, values)
  }

  const { isLoading, mutate } = useMutation(createUpdateProduct, {
    onSuccess: res => {
      showNotification({
        message: `Data ${isEdit ? 'updated' : 'created'} successfully`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to ${isEdit ? 'update' : 'create'} data, ${formatErrorMessage(
          res
        )}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        mutate(values)
        formik.resetForm()
        setShouldRefreshData(true)
        closeModal()
      } catch (error) {
        showNotification({
          message: `Error while data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editează regulă produse sensibile' : 'Adaugă regulă produse sensibile'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            variant="outlined"
            label="Selectează magazin"
            disableClearable
            options={shopTypes}
            onChange={(e, option) => formik.setFieldValue('shopCode', option.value)}
            defaultValue={shopTypes?.find(shopType => shopType.value === formik.values.shopCode)}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            variant="outlined"
            label="Selectează raion"
            disableClearable
            options={metiRayons}
            onChange={(e, option) => formik.setFieldValue('rayCode', option.value)}
            defaultValue={metiRayons?.find(metiRayon => metiRayon.value === formik.values.rayCode)}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            variant="outlined"
            label="Familie"
            disableClearable
            options={metiFamilies}
            onChange={(e, option) => formik.setFieldValue('famCode', option.value)}
            defaultValue={metiFamilies?.find(
              metiFamily => metiFamily.value === formik.values.famCode
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            variant="outlined"
            label="Subfamilie"
            disableClearable
            options={metiSubfamilies}
            onChange={(e, option) => formik.setFieldValue('sfaCode', option.value)}
            defaultValue={metiSubfamilies?.find(
              metiSubfamily => metiSubfamily.value === formik.values.sfaCode
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            variant="outlined"
            label="Cod UB"
            disableClearable
            options={metiUB}
            onChange={(e, option) => formik.setFieldValue('ubCode', option.value)}
            defaultValue={metiUB?.find(ub => ub.value === formik.values.ubCode)}
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            variant="outlined"
            label="Cod produs"
            type="text"
            fullWidth
            onChange={(e: any) => formik.setFieldValue('prodCode', e.target.value)}
            defaultValue={formik.values.prodCode}
          />
        </Grid>

        <Grid item xs={12} container justifyContent="space-between">
          <Grid>
            <Button size="large" variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          </Grid>

          <Grid>
            <Button
              size="large"
              variant="contained"
              label="Salveaza"
              onClick={() => formik.handleSubmit()}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default SensitiveProduct
