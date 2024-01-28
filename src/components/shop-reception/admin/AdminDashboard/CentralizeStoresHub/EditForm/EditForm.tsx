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
  editItem?: CentralizeStoresHub
}

const EditForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
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

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={'Editează matrice magazin'}
      modalWidth="50%"
    >
      <Grid
        gridContainerStyle={{ margin: 0 }}
        items={[
          <FormInfoItems
            items={[
              {
                label: 'Magazine:',
                name: editItem?.store
              }
            ]}
          />,
          <Grid
            gridContainerStyle={{ margin: 0 }}
            items={[
              <Input
                type="select"
                value={formik.values.deposit}
                onChange={event =>
                  formik.setFieldValue('deposit', (event.target as HTMLInputElement).value)
                }
                label="Depozite"
                variant="outlined"
                style={{ width: '100%' }}
                error={!!formik.errors.deposit}
                helperText={formik.errors.deposit as string}
                values={[
                  {
                    value: "v2",
                    label: "6 Selected"
                  }
                ]}
                required
              />,
              <Input
                type="select"
                value={formik.values.hubs}
                onChange={event =>
                  formik.setFieldValue('hubs', (event.target as HTMLInputElement).value)
                }
                label="Huburi"
                variant="outlined"
                style={{ width: '100%' }}
                error={!!formik.errors.hubs}
                helperText={formik.errors.hubs as string}
                values={[
                  {
                    value: "hub",
                    label: "hub"
                  }
                ]}
                required
              />,
            ]}
            itemsPerRow={2}
          />,
          <ModalFormActionButtons
            onCancel={() => closeModal()}
            onSubmit={() => formik.handleSubmit()}
          />
        ]}
        itemsPerRow={1}
      />
    </Modal>
  )
}

export default EditForm
