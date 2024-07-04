import { useMemo } from 'react'
import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'

interface SGRProductsProps {
  isOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: SGRProducts
  shopTypes: AutocompleteOption[]
  shopCodes: AutocompleteOption[]
  metiRayons: AutocompleteOption[]
  metiFamilies: AutocompleteOption[]
  metiSubfamilies: AutocompleteOption[]
  metiUB: AutocompleteOption[]
}

const SGRProductsForm: React.FC<SGRProductsProps> = props => {
  const {
    isOpen,
    closeModal,
    isEdit,
    editItem,
    setShouldRefreshData,
    shopTypes,
    shopCodes,
    metiRayons,
    metiFamilies,
    metiSubfamilies,
    metiUB
  } = props
  const { showNotification } = useNotification()

  const mutateSgrProduct = async values => {
    editItem
      ? await makeCorePutRequest(`/shop-reception/products/sgr/${editItem.id}`, values)
      : await makeCorePostRequest('/shop-reception/products/sgr', values)
  }

  const { isLoading: isLoadingMutation, mutate } = useMutation(mutateSgrProduct, {
    onSuccess: () => {
      closeModal()
      showNotification({
        message: `Produsul a fost ${editItem ? 'modificat' : 'creat'} cu succes.`,
        type: 'success'
      })
      setShouldRefreshData(true)
      formik.resetForm()
      closeModal()
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la ${
          editItem ? 'modificarea' : 'crearea'
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
        shopType: values.shopType?.value ||  null,
        ubCode: values.ubCode?.value || values.ubCode || null
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
      modalTitle={`${isEdit ? 'Editeaza' : 'Adauga'} regula produse SGR`}
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
            value={formik.values.shopCode}
            options={shopCodes || []}
            disabled={formik.values.shopCode === null && formik.values.shopType !== null}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Regula"
            onChange={(event, option) => {
              formik.setFieldValue('shopCode', null)
              formik.setFieldValue('shopType', option)
            }}
            value={formik.values.shopType?.value}
            options={shopTypes || []}
            disabled={formik.values.shopType === null && formik.values.shopCode !== null}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Raion"
            disableClearable
            required
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
          {isLoadingMutation ? (
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          ) : (
            <>
              <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
              <Button
                variant="contained"
                label={isEdit ? 'Editeaza' : 'Salveaza'}
                onClick={() => formik.handleSubmit()}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Modal>
  )
}

export default SGRProductsForm
