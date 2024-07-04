import { useMemo } from 'react'
import { Autocomplete, Button, Checkbox, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { Grid } from '@mui/material'
import { AutocompleteOption } from 'components/volumetry/interfaces'
import { makeCorePatchRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import dayjs from 'dayjs'

interface ScanTypeFormProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: ScanType
  ruleTypes: AutocompleteOption[]
  scanTypes: AutocompleteOption[]
  shopTypes: AutocompleteOption[]
  regionTypes: AutocompleteOption[]
}

const ScanTypeForm: React.FC<ScanTypeFormProps> = props => {
  const {
    isModalOpen,
    closeModal,
    isEdit,
    editItem,
    setShouldRefreshData,
    ruleTypes,
    scanTypes,
    shopTypes,
    regionTypes
  } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const createUpdateScanType = async (values: any) => {
    isEdit
      ? await makeCorePatchRequest(`/shop-reception/scan-types/${editItem.id}`, values)
      : await makeCorePostRequest(`/shop-reception/scan-types`, values)
  }

  const { isLoading, mutate } = useMutation(createUpdateScanType, {
    onSuccess: res => {
      showNotification({
        message: `Datele au fost ${isEdit ? 'actualizate' : 'create'} cu succes.`,
        type: 'success'
      })

      closeModal()
      formik.resetForm()
      setShouldRefreshData(true)
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la ${
          isEdit ? 'actualizarea' : 'crearea'
        } datelor. ${formatErrorMessage(res)}`,
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
      const payload = {
        scanType: values.scanType,
        ruleOrganisationType: values.ruleOrganisationType,
        active: values.active,
        start: values.start,
        end: values.end,

        ...(values.shopCode && {
          shopCode: values.shopCode?.key || null
        }),
        ...(values.regionId && {
          regionId: values.regionId?.key || null
        }),
        ruleShopType: null
      }

      mutate(payload)
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={() => {
        closeModal()
        formik.resetForm()
      }}
      modalTitle={isEdit ? 'Editează regulă de scanare' : 'Adaugă regulă de scanare'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            variant="outlined"
            label="Tip regula"
            disableClearable
            options={ruleTypes}
            onChange={(e, option) => {
              formik.setFieldValue('ruleOrganisationType', {
                value: option.label,
                key: option.value
              })

              if (option.value !== 'SHOP') {
                formik.setFieldValue('shopCode', null)
              }

              if (option.value !== 'REGION') {
                formik.setFieldValue('regionId', null)
              }
            }}
            value={{
              value: formik.values.ruleOrganisationType?.key || '',
              label: formik.values.ruleOrganisationType?.value || ''
            }}
          />
        </Grid>

        {formik.values.ruleOrganisationType?.key === 'SHOP' && (
          <Grid item xs={12}>
            <Autocomplete
              variant="outlined"
              label="Magazin"
              disableClearable
              options={shopTypes}
              onChange={(e, option) =>
                formik.setFieldValue('shopCode', {
                  value: option.label,
                  key: option.value
                })
              }
            />
          </Grid>
        )}

        {formik.values.ruleOrganisationType?.key === 'REGION' && (
          <Grid item xs={12}>
            <Autocomplete
              variant="outlined"
              label="Regiune"
              disableClearable
              options={regionTypes || []}
              onChange={(e, option) =>
                formik.setFieldValue('regionId', {
                  value: option.label,
                  key: option.value
                })
              }
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Autocomplete
            variant="outlined"
            label="Tip scanare"
            disableClearable
            options={scanTypes}
            onChange={(e, option) =>
              formik.setFieldValue('scanType', {
                value: option.label,
                key: option.value
              })
            }
            value={{
              value: formik.values.scanType?.key || '',
              label: formik.values.scanType?.value || ''
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <DatePicker
            label="Data start"
            onChange={value => formik.setFieldValue('start', value)}
            variant="outlined"
            required
            helperText={formik.errors.start as string}
            error={!!formik.errors.start}
            value={dayjs(formik.values.start)}
            style={{ width: '100%' }}
            adapterLocale="ro"
            modalLabel="Selecteaza data"
            closeButtonLabel="Anuleaza"
            confirmButtonLabel="Confirma"
          />
        </Grid>

        <Grid item xs={12}>
          <DatePicker
            label="Data sfarsit"
            onChange={value => formik.setFieldValue('end', value)}
            variant="outlined"
            required
            helperText={formik.errors.end as string}
            error={!!formik.errors.end}
            value={dayjs(formik.values.end)}
            style={{ width: '100%' }}
            adapterLocale="ro"
            modalLabel="Selecteaza data"
            closeButtonLabel="Anuleaza"
            confirmButtonLabel="Confirma"
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
              disabled={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ScanTypeForm
