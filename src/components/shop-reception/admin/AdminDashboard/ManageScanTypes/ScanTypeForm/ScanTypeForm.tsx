import { useMemo } from 'react'
import { Autocomplete, Button, Checkbox, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { Grid } from '@mui/material'
import { AutocompleteOption } from 'components/volumetry/interfaces'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
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
}

const ScanTypeForm: React.FC<ScanTypeFormProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData, ruleTypes, scanTypes } =
    props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const createUpdateScanType = async (values: any) => {
    isEdit
      ? await makeCorePutRequest(`/scan-types/${editItem.id}`, values)
      : await makeCorePostRequest(`/scan-types`, values)
  }

  const { isLoading, mutate } = useMutation(createUpdateScanType, {
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
      console.log('debug', formik.values)

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
            onChange={(e, option) =>
              formik.setFieldValue('ruleOrganisationType', {
                value: option.label,
                key: option.value
              })
            }
            defaultValue={ruleTypes?.find(
              ruleType => ruleType.value === formik.values.ruleShopType?.value
            )}
          />
        </Grid>

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
            defaultValue={scanTypes?.find(
              scanType => scanType.value === formik.values.scanType?.value
            )}
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
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ScanTypeForm
