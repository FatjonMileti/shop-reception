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
import s from 'components/core-ui/Modal/Modal.modules.scss'

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

  const createUpdateProduct = async (values: any) => {
    isEdit
      ? await makeCorePutRequest(`/shop-reception/products/sensitives/${editItem.id}`, values)
      : await makeCorePostRequest(`/shop-reception/products/sensitives`, values)
  }

  const { isLoading, mutate } = useMutation(createUpdateProduct, {
    onSuccess: () => {
      closeModal()
      showNotification({
        message: `Produsul a fost ${editItem ? 'actualizat' : 'creat'} cu succes.`,
        type: 'success'
      })

      setShouldRefreshData(true)
      formik.resetForm()
      closeModal()
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la ${
          editItem ? 'actualizarea' : 'crearea'
        } produsului. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const payload = {
        ...values,
        famCode: values.famCode?.value || values.famCode || null,
        rayCode: values.rayCode?.value || values.rayCode || null,
        sfaCode: values.sfaCode?.value || values.sfaCode || null,
        shopCode: values.shopCode?.value || values.shopCode || null,
        ubCode: values.ubCode?.value || values.ubCode || null
      }

      mutate(payload)
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
        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Magazin"
            disableClearable
            // required
            onChange={(event, option) => formik.setFieldValue('shopCode', option)}
            defaultValue={{ value: editItem?.shopType.key, label: editItem?.shopType.value }}
            options={shopTypes || []}
            // error={!!formik.errors.shopCode}
            // helperText={formik.errors.shopCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Raion"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('rayCode', option)}
            value={formik.values.rayCode}
            options={metiRayons || []}
            error={!!formik.errors.rayCode}
            helperText={formik.errors.rayCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Familie"
            disableClearable
            // required
            onChange={(event, option) => formik.setFieldValue('famCode', option)}
            value={formik.values.famCode}
            options={metiFamilies || []}
            // error={!!formik.errors.famCode}
            // helperText={formik.errors.famCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Subfamilie"
            disableClearable
            // required
            onChange={(event, option) => formik.setFieldValue('sfaCode', option)}
            value={formik.values.sfaCode}
            options={metiSubfamilies || []}
            // error={!!formik.errors.sfaCode}
            // helperText={formik.errors.sfaCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Cod UB"
            disableClearable
            // required
            onChange={(event, option) => formik.setFieldValue('ubCode', option)}
            value={formik.values.ubCode}
            options={metiUB || []}
            // error={!!formik.errors.ubCode}
            // helperText={formik.errors.ubCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.prodCode}
            onChange={event =>
              formik.setFieldValue('prodCode', (event.target as HTMLInputElement).value)
            }
            label="Cod produs"
            variant="outlined"
            style={{ width: '100%' }}
            // error={!!formik.errors.prodCode}
            // helperText={formik.errors.prodCode as string}
            // required
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

export default SensitiveProduct
