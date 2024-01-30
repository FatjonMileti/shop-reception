import { ChangeEvent, useMemo, useState } from 'react'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../Common/Grid'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'
import { FileUpload } from '../../../../../core-ui/FileUpload'
import { toFormDataPayload } from '../../../../../../utils/serializers'
import { ModalFormActionButtons } from '../../../Common/ModalFormActionButtons'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
}

const ImportProductsForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, setShouldRefreshData } = props
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(), [])

  const validationSchema = useMemo(() => getValidationSchema(), [])

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files[0]
      setUploadedFile(file)
      setIsFileUploaded(true)
    } catch (e) {
      showNotification({
        message: `Error while adding file. ${formatErrorMessage(e)}`,
        type: 'error'
      })
      setUploadedFile(null)
      setIsFileUploaded(false)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const payload = toFormDataPayload(values)
      payload.append('fileObject', uploadedFile)

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
      modalTitle={'Importă produse DLC scurt'}
      modalWidth='50%'
    >
      <Grid
        gridContainerStyle={{ margin: 0 }}
        items={[
          <Input
            type='select'
            value={formik.values.store?.value}
            onChange={event =>
              formik.setFieldValue('store', (event.target as HTMLInputElement).value)
            }
            label='Magazin'
            variant='outlined'
            style={{ width: '100%' }}
            error={!!formik.errors.store}
            helperText={formik.errors.store as string}
            values={[
              {
                value: 'AMBIENT',
                label: 'AMBIENT'
              }
            ]}
            required
          />,
          <FileUpload
            value={formik.values.file}
            fileInputProps={{ displayImage: 'https://picsum.photos/seed/picsum/200/150' }}
            onChange={onFileUpload}
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

export default ImportProductsForm
