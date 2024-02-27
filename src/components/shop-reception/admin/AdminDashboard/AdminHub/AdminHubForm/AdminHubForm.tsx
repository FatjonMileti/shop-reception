import { useMemo } from 'react'
import {
  Input,
  Checkbox,
  Button,
  Autocomplete,
  FilterDataSelect
} from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
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
      ? await makeCorePutRequest(`/hubs/${editItem.id}`, values)
      : await makeCorePostRequest('/hubs', values)
  }

  const { isLoading, mutate } = useMutation(mutateHub, {
    onSuccess: () => {
      closeModal()
      showNotification({
        message: `Hub ${editItem ? 'updated' : 'created'} successfully`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to ${
          editItem ? 'update' : 'create'
        } shop, ${formatErrorMessage(res)}`,
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
    onSubmit: async (values: any, { resetForm }) => {
      try {
        mutate(values)
        setShouldRefreshData(true)
        resetForm()
        closeModal()
      } catch (error) {
        showNotification({
          message: `Error while data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: hubTypes, isLoading: isHubTypesLoading } = useQuery(
    ['hub-types'],
    async () => {
      const result = await makeCoreGetRequest('/hubs/types')
      const resultOptions = result.map(
        (item: string): AutocompleteOption => ({
          label: item,
          value: item
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching shop types dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: isOpen
    }
  )

  const { data: assignedUsers, isLoading: isAssignedUsersLoading } = useQuery(
    ['assigned-users'],
    async () => {
      const result = await makeCoreGetRequest(`/hubs/${editItem.id}/users`)
      const resultOptions = result.map(
        (item: string): AutocompleteOption => ({
          label: item,
          value: item
        })
      )
      return resultOptions || []
    },
    {
      onError: error => {
        console.log('debug err', error)
        showNotification({
          message: `Error while fetching assigned users data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: isOpen && typeof editItem !== 'undefined'
    }
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
          {isEdit && (
            <FormInfoItems
              items={[
                {
                  label: 'Nume:',
                  name: editItem?.name
                }
              ]}
            />
          )}
        </Grid>

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
              onChange={event =>
                formik.setFieldValue('type', (event.target as HTMLInputElement).value)
              }
              defaultValue={formik.values.type}
              options={hubTypes}
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

        {editItem && (
          <Grid xs={12} item>
            {isAssignedUsersLoading ? (
              <div style={{ display: 'flex' }}>
                <CircularProgress color="primary" disableShrink />
              </div>
            ) : (
              <Autocomplete
                variant="outlined"
                label="Utilizatori asignaţi pe hub"
                disableClearable
                required
                onChange={event =>
                  formik.setFieldValue('users', (event.target as HTMLInputElement).value)
                }
                defaultValue={formik.values.users}
                multiple
                options={assignedUsers}
                error={!!formik.errors.users}
                helperText={formik.errors.users as string}
              />
            )}
          </Grid>
        )}

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button
            variant="contained"
            label={isEdit ? 'Editeaza' : 'Salveaza'}
            onClick={() => formik.handleSubmit()}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AdminHubForm
