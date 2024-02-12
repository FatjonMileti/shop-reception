import { useMemo } from 'react'
import { Button, Input, Checkbox } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../Common/Grid'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'
import { ModalFormActionButtons } from '../../../Common/ModalFormActionButtons'
import { getDepositTypesOptions } from 'components/shop-reception/admin/api'
import { deepOrange } from '@mui/material/colors'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { handleQueryError } from 'utils/helpers'
import { useMutation } from 'react-query'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: AdminDeposit
}

const AdminDepositModal: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const { data: typesOptions } = getDepositTypesOptions(showNotification, isModalOpen)

  const editDeposit = async values =>
    isEdit
      ? await makeCorePutRequest(`/shop-reception/deposits/${editItem?.id}`, values)
      : await makeCorePostRequest('/shop-reception/deposits', values)

  const { isLoading, mutate } = useMutation(editDeposit, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: `Depozitul a fost ${isEdit ? 'editat' : 'creat'} cu succes`,
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la editarea volumului.', showNotification)
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(toPayload(values))
      // try {
      //   const payload = toPayload(formik.values)

      //   if (isEdit) {
      //   } else {
      //   }

      //   setShouldRefreshData(true)
      //   closeModal()
      //   formik.resetForm()
      // } catch (error) {
      //   showNotification({
      //     message: `A aparut o eroare la salvarea depozitului. ${formatErrorMessage(error)}`,
      //     type: 'error'
      //   })
      // }
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza depozit' : 'Adauga depozit'}
      modalWidth="50%"
    >
      <Grid
        gridContainerStyle={{ margin: 0 }}
        items={[
          <Input
            type="text"
            value={formik.values.code}
            onChange={event =>
              formik.setFieldValue('code', (event.target as HTMLInputElement).value)
            }
            label="Cod depozit"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.code}
            helperText={formik.errors.code as string}
            required
          />,
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
          />,
          <AsyncAutocomplete
            variant="outlined"
            name="type"
            label="Tip depozit"
            options={typesOptions}
            onChange={value => formik.setFieldValue('type', value)}
            value={formik.values.type}
            error={!!formik.errors.type}
            helperText={formik.errors.type as string}
            required
          />,
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
          />,
          <Input
            type="text"
            value={formik.values.validityPercentage}
            onChange={event =>
              formik.setFieldValue('validityPercentage', (event.target as HTMLInputElement).value)
            }
            label="Procent valabilitate"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.validityPercentage}
            helperText={formik.errors.validityPercentage as string}
          />,
          <Input
            type="text"
            value={formik.values.emails}
            onChange={event =>
              formik.setFieldValue('emails', (event.target as HTMLInputElement).value)
            }
            label="Comunicare depozit (emails)"
            variant="outlined"
            style={{ width: '100%' }}
            error={!!formik.errors.emails}
            helperText={formik.errors.emails as string}
            required
          />,
          <Checkbox
            checked={formik.values.active}
            defaultChecked={formik.values.active}
            onChange={event =>
              formik.setFieldValue('active', (event.target as HTMLInputElement).value)
            }
            label="Activ"
          />
        ]}
        itemsPerRow={2}
      />
      <ModalFormActionButtons
        onCancel={() => closeModal()}
        onSubmit={() => formik.handleSubmit()}
      />
    </Modal>
  )
}

export default AdminDepositModal
