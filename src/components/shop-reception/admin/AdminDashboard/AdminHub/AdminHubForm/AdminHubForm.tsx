import { useMemo } from 'react'
import { Input, Checkbox, Button, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification, useSearchInput } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { CircularProgress, Grid } from '@mui/material'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { AutocompleteOption } from 'components/volumetry/interfaces'

interface NewAdminDepositProps {
  isOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: AdminHub
}

const AdminHubForm: React.FC<NewAdminDepositProps> = props => {
  const { isOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const mutateHub = async values => {
    editItem
      ? await makeCorePutRequest(`/shop-reception/hubs/${editItem.id}`, values)
      : await makeCorePostRequest('/shop-reception/hubs', values)
  }

  const { isLoading, mutate } = useMutation(mutateHub, {
    onSuccess: () => {
      setShouldRefreshData(true)
      closeModal()
      formik.resetForm()
      showNotification({
        message: `Hubul a fost ${editItem ? 'modificat' : 'creat'} cu succes.`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la ${
          editItem ? 'modificarea' : 'crearea'
        } hubului. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const { data: hubTypes, isLoading: isHubTypesLoading } = useQuery(
    ['hub-types'],
    async () => {
      const result = await makeCoreGetRequest('/shop-reception/hubs/types')

      const resultOptions = result.map(
        (item: any): AutocompleteOption => ({
          label: item,
          value: item
        })
      )

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea huburilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: assignedUsers, isLoading: isAssignedUsersLoading } = useQuery(
    ['assigned-users'],
    async () => {
      const result = await makeCoreGetRequest(`/shop-reception/hubs/${editItem.id}/users`)

      return result || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea utilizatorilor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: isOpen && typeof editItem !== 'undefined'
    }
  )

  const initialValues = useMemo(
    () => getInitialValues(editItem, hubTypes, assignedUsers),
    [editItem, hubTypes, assignedUsers]
  )
  const validationSchema = useMemo(() => getValidationSchema(), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const payload = {
        ...values,
        type: values.type.value,
        packagingResponsibleEmails: values.packagingResponsibleEmails.split(';')
      }

      mutate(payload)
    }
  })

  const selectProductSearch = useSearchInput(
    'name',
    'deposit-responsible',
    '/shop-reception/hubs/responsible'
  )

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editează hub' : 'Adaugă hub'}
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
            label="Cod HUB"
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
            label="Nume"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          {isHubTypesLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" disableShrink />
            </div>
          ) : (
            <Autocomplete
              variant="outlined"
              label="Tip HUB"
              disableClearable
              required
              onChange={(event, option) => formik.setFieldValue('type', option)}
              value={formik.values.type}
              options={hubTypes || []}
              error={!!formik.errors.type}
              helperText={formik.errors.type as string}
            />
          )}
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.packagingResponsibleEmails}
            onChange={event =>
              formik.setFieldValue(
                'packagingResponsibleEmails',
                (event.target as HTMLInputElement).value
              )
            }
            label="Adresă de email responsabil ambalaje"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.packagingResponsibleEmails}
            helperText={formik.errors.packagingResponsibleEmails as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <Input
            type="text"
            value={formik.values.address}
            onChange={event =>
              formik.setFieldValue('address', (event.target as HTMLInputElement).value)
            }
            label="Adresă"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.address}
            helperText={formik.errors.address as string}
            required
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
          {isAssignedUsersLoading ? (
            <div style={{ display: 'flex' }}>
              <CircularProgress color="primary" disableShrink />
            </div>
          ) : (
            <Autocomplete
              {...selectProductSearch}
              variant="outlined"
              label="Utilizatori asignaţi pe hub"
              autoComplete={false}
              required
              filterOptions={x => x}
              multiple
              onChange={(event, value) => {
                if (value) {
                  formik.setFieldValue('users', value)
                } else {
                  formik.setFieldValue('users', null)
                }
              }}
              value={formik.values.users || null}
              error={!!formik.errors.users}
              helperText={formik.errors.users as string}
            />
          )}
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

export default AdminHubForm
