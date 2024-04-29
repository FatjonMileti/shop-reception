import { useMemo } from 'react'
import { Grid, createFilterOptions } from '@mui/material'
import { Autocomplete, Button, Input, Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import Barcode from 'react-jsbarcode'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: PackingType
}

const filter = createFilterOptions()

const PackingTypeForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const createUpdatePackage = async (values: any) => {
    isEdit
      ? await makeCorePutRequest(`/shop-reception/support-types/${editItem.id}`, values)
      : await makeCorePostRequest(`/shop-reception/support-types`, values)
  }

  const { isLoading, mutate } = useMutation(createUpdatePackage, {
    onSuccess: res => {
      formik.resetForm()
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: `Datele au fost ${isEdit ? 'actualizate' : 'create'} cu succes.`,
        type: 'success'
      })
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
        ...values,
        alternativeCodes: values.alternativeCodes.map(code => code.value),
        childrenIds: values.childrenIds.map(child => child.value)
      }
      mutate(payload)
    }
  })

  const { data: uncombined, isLoading: isUncombinedLoading } = useQuery(
    ['uncombined'],
    async () => {
      const result = await makeCoreGetRequest(
        `/shop-reception/support-types?filterBy=combined&filterValue=false`
      )
      const options = result.list.map(item => ({ value: item.id, label: item.name }))
      return options || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea datelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: !isEdit
    }
  )

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? `Editează tip ambalaj ${editItem?.name}` : 'Adaugă tip ambalaj'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            variant="outlined"
            label="Cod ambalaj"
            type="text"
            fullWidth
            onChange={(e: any) => formik.setFieldValue('externalCode', e.target.value)}
            value={formik.values.externalCode}
            error={!!formik.errors.externalCode}
            helperText={formik.errors.externalCode as string}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            value={formik.values.alternativeCodes}
            multiple
            options={[]}
            freeSolo
            variant="outlined"
            label="Coduri suplimentare"
            onChange={(event, value) => {
              const result = value.map(val => {
                return val.inputValue
                  ? {
                      value: val.inputValue,
                      label: val.inputValue
                    }
                  : val
              })
              formik.setFieldValue('alternativeCodes', result)
            }}
            error={!!formik.errors.alternativeCodes}
            helperText={formik.errors.alternativeCodes as string}
            required
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  label: `Add "${params.inputValue}"`
                })
              }

              return filtered
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            variant="outlined"
            label="Denumire"
            type="text"
            fullWidth
            onChange={(e: any) => formik.setFieldValue('name', e.target.value)}
            value={formik.values.name}
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formik.values.active}
            defaultChecked={formik.values.active}
            onChange={event => formik.setFieldValue('active', !formik.values.active)}
            label="Activ"
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formik.values.returnable}
            defaultChecked={formik.values.returnable}
            onChange={event => formik.setFieldValue('returnable', !formik.values.returnable)}
            label="Returnabil"
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formik.values.combined}
            defaultChecked={formik.values.combined}
            onChange={event => formik.setFieldValue('combined', !formik.values.combined)}
            label="Combinatie"
            disabled={isEdit ? true : false}
          />
        </Grid>

        {!isUncombinedLoading && formik.values.combined ? (
          <Grid item xs={12}>
            <Autocomplete
              multiple={true}
              label="Ambalaje necombinate"
              options={uncombined}
              onChange={(e: any, option: any) => formik.setFieldValue('childrenIds', option)}
              variant="outlined"
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Autocomplete
                variant="outlined"
                label="Principal/Secundar"
                disableClearable
                options={[
                  { label: 'Principal', value: 'true' },
                  { label: 'Secundar', value: 'false' }
                ]}
                onChange={(e, option) => formik.setFieldValue('main', option.value)}
                defaultValue={
                  editItem && {
                    label: formik.values.main ? 'Principal' : 'Secundar',
                    value: formik.values.main
                  }
                }
                error={!!formik.errors.main}
                helperText={formik.errors.main as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                variant="outlined"
                label="Cod de bare"
                type="text"
                fullWidth
                onChange={(e: any) => formik.setFieldValue('code', e.target.value)}
                value={formik.values.code}
              />
            </Grid>
            {formik.values.code?.length > 0 && formik.values.code !== null && (
              <Grid item xs={12}>
                <Barcode value={formik.values.code} />
              </Grid>
            )}
          </>
        )}

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

export default PackingTypeForm
