import { useMemo } from 'react'
import { Input, Checkbox, Button, Autocomplete } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { Grid } from '@mui/material'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'

interface NewAdminDepositProps {
  isOpen: boolean
  closeModal: Function
  isEdit?: boolean
  editItem?: AdminStore
}

const AdminStoreForm: React.FC<NewAdminDepositProps> = props => {
  const { isOpen, closeModal, isEdit, editItem } = props
  const { showNotification } = useNotification()

  const addShop = async values => {
    editItem
      ? await makeCorePutRequest(`/shop-reception/shops/${editItem.id}`, values)
      : await makeCorePostRequest('/shop-reception/shops', values)
  }

  const { isLoading, mutate } = useMutation(addShop, {
    onSuccess: () => {
      closeModal()
      showNotification({
        message: `Shop added successfully`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to add shop, ${formatErrorMessage(res)}`,
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
      mutate(values)
      resetForm()
      closeModal()
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
        <Grid xs={12} item>
          {isEdit && (
            <FormInfoItems
              items={[
                {
                  label: 'Nume:',
                  name: editItem?.metiName
                }
              ]}
            />
          )}
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Nume magazin"
            disableClearable
            required
            onChange={event =>
              formik.setFieldValue('name', (event.target as HTMLInputElement).value)
            }
            options={[
              {
                value: '1',
                label: 'Magazin 1'
              },

              {
                value: '2',
                label: 'Magazin 2'
              },
              {
                value: '3',
                label: 'Magazin 3'
              }
            ]}
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Versiune METI"
            disableClearable
            required
            onChange={event =>
              formik.setFieldValue('metiVersion', (event.target as HTMLInputElement).value)
            }
            options={[
              {
                value: '1',
                label: '001'
              },

              {
                value: '2',
                label: '002'
              },
              {
                value: '3',
                label: '003'
              }
            ]}
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
          <Input
            type="text"
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
            checked={formik.values.active}
            defaultChecked={formik.values.active}
            onChange={event => formik.setFieldValue('active', !formik.values.active)}
            label="Activ"
            color={!!formik.errors.active ? 'primary' : 'secondary'}
          />
        </Grid>

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

export default AdminStoreForm
