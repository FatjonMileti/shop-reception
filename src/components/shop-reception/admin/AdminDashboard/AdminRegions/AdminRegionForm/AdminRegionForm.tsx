import { useMemo } from 'react'
import { Input, Checkbox, Autocomplete, Button } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification, useSearchInput } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { CircularProgress, Grid } from '@mui/material'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: AdminRegion
}

const AdminRegionForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const mutateHub = async values => {
    editItem
      ? await makeCorePutRequest(`/shop-reception/regions/${editItem.id}`, values)
      : await makeCorePostRequest('/shop-reception/regions', values)
  }

  const { isLoading, mutate } = useMutation(mutateHub, {
    onSuccess: () => {
      showNotification({
        message: `Regiunea a fost ${editItem ? 'modificata' : 'creata'} cu succes.`,
        type: 'success'
      })

      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la ${
          editItem ? 'modificarea' : 'crearea'
        } regiunii. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const {
    data: shopTypes,
    isLoading: isShopTypesLoading,
    isFetching: isShopTypesFetching
  } = useQuery(
    ['shop-types'],
    async () => {
      const result = await makeCoreGetRequest(`/shop-reception/regions/${editItem?.id}/shops`)

      const options = result.map(item => ({
        label: item.metiName,
        value: item.id,
        isChecked: item.isChecked
      }))
      return options
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la obtinerea tipurilor de magazine. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      },
      enabled: isModalOpen
    }
  )

  const initialValues = useMemo(() => getInitialValues(editItem, shopTypes), [editItem, shopTypes])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      try {
        const payload = {
          ...values,
          shopIds: values.shopIds.filter(item => item.isChecked).map(item => item.value)
        }

        mutate(payload)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la modificarea datelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const selectProductSearch = useSearchInput(
    'name',
    'region-responsible',
    '/shop-reception/regions/responsible'
  )

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editează regiune' : 'Adaugă regiune'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.code}
            onChange={event =>
              formik.setFieldValue('code', (event.target as HTMLInputElement).value)
            }
            label="Cod regiune"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.code}
            helperText={formik.errors.code as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.name}
            onChange={event =>
              formik.setFieldValue('name', (event.target as HTMLInputElement).value)
            }
            label="Denumire"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            {...selectProductSearch}
            variant="outlined"
            label="Responsabil regiune"
            autoComplete={false}
            required
            filterOptions={x => x}
            onChange={(event, value) => {
              if (value) {
                formik.setFieldValue('responsible', value)
              } else {
                formik.setFieldValue('responsible', null)
              }
            }}
            value={formik.values.responsible || null}
            error={!!formik.errors.responsible}
            helperText={formik.errors.responsible as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Checkbox
            checked={formik.values.active}
            defaultChecked={formik.values.active}
            onChange={event => formik.setFieldValue('active', !formik.values.active)}
            label="Activ"
            color={!!formik.errors.active ? 'primary' : 'secondary'}
          />
        </Grid>

        <Grid xs={12} item>
          {isShopTypesLoading || isShopTypesFetching ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" disableShrink />
            </div>
          ) : (
            <Autocomplete
              variant="outlined"
              label="Magazine"
              disableClearable
              onChange={(e: any, option: any) => {
                formik.setFieldValue(
                  'shopIds',
                  formik.values.shopIds.map(item =>
                    item.label == e.target.textContent
                      ? { ...item, isChecked: !item.isChecked }
                      : item
                  )
                )
              }}
              error={!!formik.errors.shopIds}
              helperText={formik.errors.shopIds as string}
              multiple
              value={formik.values.shopIds?.filter(
                item => item.isChecked === true && { label: item.metiName, value: item.id }
              )}
              options={formik.values.shopIds}
            />
          )}
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          {isLoading ? (
            <></>
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

export default AdminRegionForm
