import { useMemo } from 'react'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../Common/Grid'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'
import { ModalFormActionButtons } from '../../../Common/ModalFormActionButtons'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem?: DLCProducts
  isEdit?: boolean
}

const DLCProductsForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, editItem, isEdit, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = toPayload(formik.values)

        setShouldRefreshData(true)
        closeModal()
        formik.resetForm()
      } catch (error) {
        showNotification({
          message: `Error while data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  let items = [
    <Grid
      gridContainerStyle={{ margin: 0 }}
      items={[
        <Input
          type="select"
          value={formik.values.storeName}
          onChange={event =>
            formik.setFieldValue('storeName', (event.target as HTMLInputElement).value)
          }
          label="Magazin"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.storeName}
          helperText={formik.errors.storeName as string}
          required
        />,
        <Input
          type="select"
          value={formik.values.district}
          onChange={event =>
            formik.setFieldValue('district', (event.target as HTMLInputElement).value)
          }
          label="Raion"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.district}
          helperText={formik.errors.district as string}
          required
        />,
        <Input
          type="select"
          value={formik.values.family}
          onChange={event =>
            formik.setFieldValue('family', (event.target as HTMLInputElement).value)
          }
          label="Familie"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.family}
          helperText={formik.errors.family as string}
          required
        />,
        <Input
          type="select"
          value={formik.values.subfamily}
          onChange={event =>
            formik.setFieldValue('subfamily', (event.target as HTMLInputElement).value)
          }
          label="Subfamilie"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.subfamily}
          helperText={formik.errors.subfamily as string}
          required
        />,
        <Input
          type="select"
          value={formik.values.UbCode}
          onChange={event =>
            formik.setFieldValue('UbCode', (event.target as HTMLInputElement).value)
          }
          label="Cod UB"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.UbCode}
          helperText={formik.errors.UbCode as string}
          required
        />,
        <Input
          type="select"
          value={formik.values.productCode}
          onChange={event =>
            formik.setFieldValue('productCode', (event.target as HTMLInputElement).value)
          }
          label="Cod Produs"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.productCode}
          helperText={formik.errors.productCode as string}
          required
        />
      ]}
      itemsPerRow={2}
    />,
    <ModalFormActionButtons
      onCancel={() => closeModal()}
      onSubmit={() => formik.handleSubmit()}
    />
  ]

  if(isEdit){
    items.unshift(<FormInfoItems
      items={[
        {
          label: 'Magazin:',
          name: editItem?.storeName
        }
      ]}
    />)
  }
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editare produse cu DLC scurt' : 'Adăugare regulă produse cu DLC scurt'}
      modalWidth="50%"
    >
      <Grid
        gridContainerStyle={{ margin: 0 }}
        items={items}
        itemsPerRow={1}
      />
    </Modal>
  )
}

export default DLCProductsForm
