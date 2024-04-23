import { useMemo } from 'react'
import { Input, Checkbox, Button, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCoreGetRequest, makeCorePatchRequest, makeCorePostRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

interface NewAdminDepositProps {
  isOpen: boolean
  closeModal: Function
  isEdit?: boolean
  editItem?: AdminStore
  shopCodes: AutocompleteOption[]
  metiVersions: AutocompleteOption[]
  parentSocieties: AutocompleteOption[]
  metiShops: AutocompleteOption[]
}

const AdminStoreForm: React.FC<NewAdminDepositProps> = props => {
  const {
    isOpen,
    closeModal,
    isEdit,
    editItem,
    shopCodes,
    metiVersions,
    parentSocieties,
    metiShops
  } = props
  const { showNotification } = useNotification()

  const { data: depositsOptions } = useQuery(
    ['deposits'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/deposits/accessible')

      const resultOptions = result.map(
        (item: any): AutocompleteOption => ({
          label: item.displayName,
          value: item.id
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const addShop = async values => {
    editItem
      ? await makeCorePatchRequest(`/shop-reception/shops/${editItem.id}`, values)
      : await makeCorePostRequest('/shop-reception/shops', values)
  }

  const { isLoading, mutate } = useMutation(addShop, {
    onSuccess: () => {
      showNotification({
        message: `Shop ${isEdit ? 'updated' : 'added'} successfully`,
        type: 'success'
      })
      closeModal()
      formik.resetForm()
    },
    onError: res => {
      showNotification({
        message: `Error while trying to ${isEdit ? 'edit' : 'add'} shop, ${formatErrorMessage(
          res
        )}`,
        type: 'error'
      })
    }
  })

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const payload = {
        ...values,
        depositIds: values.depositIds.map(item => item.value),
        code: values.code.value,
        metiVersion: values.metiVersion.value,
        parentSociety: values.parentSociety.value
      }
      mutate(payload)
    }
  })

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editează magazin' : 'Adaugă magazin'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        {!editItem && (
          <Grid xs={12} item>
            <Autocomplete
              variant="outlined"
              label="Nume magazin"
              disableClearable
              required
              onChange={(event, option) => formik.setFieldValue('code', option)}
              value={formik.values.code}
              options={metiShops || []}
              error={!!formik.errors.code}
              helperText={formik.errors.code as string}
            />
          </Grid>
        )}

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Versiune METI"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('metiVersion', option)}
            value={formik.values.metiVersion}
            options={metiVersions || []}
            error={!!formik.errors.metiVersion}
            helperText={formik.errors.metiVersion as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.adCode}
            onChange={event =>
              formik.setFieldValue('adCode', (event.target as HTMLInputElement).value)
            }
            label="Cod AD"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.adCode}
            helperText={formik.errors.adCode as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Societate"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('parentSociety', option)}
            value={formik.values.parentSociety}
            options={parentSocieties || []}
            error={!!formik.errors.parentSociety}
            helperText={formik.errors.parentSociety as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="number"
            value={formik.values.receptionDeviation}
            onChange={event =>
              formik.setFieldValue('receptionDeviation', (event.target as HTMLInputElement).value)
            }
            label="Abatere recepţie produse (grame)"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.receptionDeviation}
            helperText={formik.errors.receptionDeviation as string}
            required
          />
        </Grid>

        {editItem && (
          <Grid xs={12} item>
            <Input
              type="text"
              value={editItem.regionName}
              label="Regiune"
              variant="outlined"
              style={{ width: '100%' }}
              disabled
            />
          </Grid>
        )}

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.sftpIp}
            onChange={event =>
              formik.setFieldValue('sftpIp', (event.target as HTMLInputElement).value)
            }
            label="IP SFTP"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.sftpIp}
            helperText={formik.errors.sftpIp as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.sftpPath}
            onChange={event =>
              formik.setFieldValue('sftpPath', (event.target as HTMLInputElement).value)
            }
            label="Cale SFTP"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.sftpPath}
            helperText={formik.errors.sftpPath as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <AsyncAutocomplete
            variant="outlined"
            name="depositIds"
            label="Returnare ambalaje"
            value={formik.values.depositIds}
            options={depositsOptions || []}
            onChange={value => formik.setFieldValue('depositIds', value)}
            error={!!formik.errors.depositIds}
            helperText={formik.errors.depositIds as string}
            required
            multiple
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.address}
            onChange={event =>
              formik.setFieldValue('address', (event.target as HTMLInputElement).value)
            }
            label="Adresa"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.address}
            helperText={formik.errors.address as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.city}
            onChange={event =>
              formik.setFieldValue('city', (event.target as HTMLInputElement).value)
            }
            label="Oras"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.city}
            helperText={formik.errors.city as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.town}
            onChange={event =>
              formik.setFieldValue('town', (event.target as HTMLInputElement).value)
            }
            label="Judet"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.town}
            helperText={formik.errors.town as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Checkbox
            checked={formik.values.canEditQuantities}
            defaultChecked={formik.values.canEditQuantities}
            onChange={event =>
              formik.setFieldValue('canEditQuantities', !formik.values.canEditQuantities)
            }
            label="Permite editare cantităţi recepţionate"
            color={!!formik.errors.active ? 'primary' : 'secondary'}
          />
        </Grid>

        <Grid xs={12} item>
          <Checkbox
            checked={formik.values.canCallReturnTruck}
            defaultChecked={formik.values.canCallReturnTruck}
            onChange={event =>
              formik.setFieldValue('canCallReturnTruck', !formik.values.canCallReturnTruck)
            }
            label="Poate chema Camion de retur"
            color={!!formik.errors.active ? 'primary' : 'secondary'}
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

export default AdminStoreForm
