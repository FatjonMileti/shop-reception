import { useMemo } from 'react'
import { Input, Button, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { Grid } from '@mui/material'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'

interface DLCProductsFormProps {
  isOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: DLCProducts
  shopTypes: AutocompleteOption[]
  metiRayons: AutocompleteOption[]
  metiFamilies: AutocompleteOption[]
  metiSubfamilies: AutocompleteOption[]
  metiUB: AutocompleteOption[]
  shopCodes: AutocompleteOption[]
}

const DLCProductsForm: React.FC<DLCProductsFormProps> = props => {
  const {
    isOpen,
    closeModal,
    isEdit,
    editItem,
    setShouldRefreshData,
    shopTypes,
    metiRayons,
    metiFamilies,
    metiSubfamilies,
    metiUB,
    shopCodes
  } = props
  const { showNotification } = useNotification()

  const mutateDlcProduct = async values => {
    editItem
      ? await makeCorePutRequest(`/shop-reception/products/short-dlc/${editItem.id}`, values)
      : await makeCorePostRequest('/shop-reception/products/short-dlc', values)
  }

  const { isLoading, mutate } = useMutation(mutateDlcProduct, {
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
        ubCode: values.ubCode?.value || values.ubCode || null,
        shopType: values.shopType?.value || null
      }

      mutate(payload)
    }
  })

  const metiFamiliesOptions = useMemo(() => {
    if (formik.values.rayCode?.value) {
      const options = typeof metiFamilies !== 'undefined' && metiFamilies.filter(
        family => formik.values.rayCode?.value === family.value.toString().slice(0, 2)
      )

      return options
    }

    return []
  }, [formik.values.rayCode?.value, metiFamilies])

  const metiSubfamiliesOption = useMemo(() => {
    if (formik.values.famCode?.value) {
      const options = typeof metiSubfamilies !== 'undefined' && metiSubfamilies.filter(
        subFamily => formik.values.famCode?.value === subFamily.value.toString().split('_')[0]
      )

      return options
    }

    return []
  }, [formik.values.famCode?.value, metiSubfamilies])

  const ubCodeOptions = useMemo(() => {
    if (formik.values.sfaCode?.value) {
      const options = typeof metiUB !== 'undefined' && metiUB.filter(
        ubCode =>
          formik.values.sfaCode?.value === ubCode.value.toString().split('_').slice(1).join('_')
      )
      return options
    }

    return []
  }, [formik.values.sfaCode?.value, metiUB])


  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      modalTitle={`${isEdit ? 'Editeaza' : 'Adauga'} regula produse cu DLC scurt`}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
      <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Magazin"
            onChange={(event, option) => {
              formik.setFieldValue('shopType', null)
              formik.setFieldValue('shopCode', option)
            }}
            defaultValue={editItem && { value: editItem.shopCode, label: editItem.shopCode }}
            options={shopCodes || []}
            disabled={formik.values.shopCode === null && formik.values.shopType !== null}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Regula magazin"
            onChange={(event, option) => {
              formik.setFieldValue('shopCode', null)
              formik.setFieldValue('shopType', option)
            }}
            defaultValue={
              editItem && { value: editItem.shopType.key, label: editItem.shopType.value }
            }
            options={shopTypes || []}
            disabled={formik.values.shopType === null && formik.values.shopCode !== null}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Raion"
            onChange={(event, option) => {
              formik.setFieldValue('rayCode', option)
              formik.setFieldValue('famCode', null)
              formik.setFieldValue('sfaCode', null)
              formik.setFieldValue('ubCode', null)
            }}
            value={formik.values.rayCode}
            options={metiRayons || []}
            error={!!formik.errors.rayCode}
            helperText={formik.errors.rayCode as string}
            disabled={formik.values.shopType === null && formik.values.shopCode !== null}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Familie"
            disableClearable
            onChange={(event, option) => {
              formik.setFieldValue('famCode', option)
              formik.setFieldValue('sfaCode', null)
              formik.setFieldValue('ubCode', null)
            }}
            value={formik.values.famCode}
            options={metiFamiliesOptions || []}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Subfamilie"
            disableClearable
            onChange={(event, option) => {
              formik.setFieldValue('sfaCode', option)
              formik.setFieldValue('ubCode', null)
            }}
            value={formik.values.sfaCode}
            options={metiSubfamiliesOption || []}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Cod UB"
            disableClearable
            onChange={(event, option) => formik.setFieldValue('ubCode', option)}
            value={formik.values.ubCode}
            options={ubCodeOptions || []}
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

export default DLCProductsForm
