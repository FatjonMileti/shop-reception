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
      try {
        const payload = {
          ...values,
          famCode: values.famCode.value,
          rayCode: values.rayCode.value,
          sfaCode: values.sfaCode.value,
          shopCode: values.shopCode.value,
          shopType: values.shopType.value,
          ubCode: values.ubCode.value
        }
        mutate(payload)
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
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('shopCode', option)}
            value={formik.values.shopCode}
            options={shopCodes || []}
            error={!!formik.errors.shopCode}
            helperText={formik.errors.shopCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Regula"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('shopType', option)}
            value={formik.values.shopType.value}
            options={shopTypes || []}
            error={!!formik.errors.shopType}
            helperText={formik.errors.shopType as string}
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
            required
            onChange={(event, option) => formik.setFieldValue('famCode', option)}
            value={formik.values.famCode}
            options={metiFamilies || []}
            error={!!formik.errors.famCode}
            helperText={formik.errors.famCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Subfamilie"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('sfaCode', option)}
            value={formik.values.sfaCode}
            options={metiSubfamilies || []}
            error={!!formik.errors.sfaCode}
            helperText={formik.errors.sfaCode as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Cod UB"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('ubCode', option)}
            value={formik.values.ubCode}
            options={metiUB || []}
            error={!!formik.errors.ubCode}
            helperText={formik.errors.ubCode as string}
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
            error={!!formik.errors.prodCode}
            helperText={formik.errors.prodCode as string}
            required
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          {isLoadingMutation ? (
            <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
          ) : (
            <>
              <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
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
