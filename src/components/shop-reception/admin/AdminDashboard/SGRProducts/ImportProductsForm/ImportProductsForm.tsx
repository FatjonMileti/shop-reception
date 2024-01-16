import { ChangeEvent, useMemo, useState } from 'react'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'
import { FileUpload } from '../../../../../core-ui/FileUpload'
import { toFormDataPayload } from '../../../../../../utils/serializers'

interface SGRProductsProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
}

const ImportProductsForm: React.FC<SGRProductsProps> = props => {
  const { isModalOpen, closeModal, setShouldRefreshData } = props
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(), [])

  const validationSchema = useMemo(() => getValidationSchema(), [])

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const file = event.target.files[0]
      setUploadedFile(file)
      setIsFileUploaded(true)
    } else {
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
      modalTitle={'Importă produse SGR'}
      modalWidth='50%'
    >
      <Grid container spacing={4} justifyContent='flex-end'>
        <Grid xs={12} item>
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
          />
        </Grid>
        <Grid xs={12} item>
          <FileUpload
            value={formik.values.file}
            fileInputProps={{ displayImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt094LI3kTxh-hGY85ko1D6Z5DT9sEbkeqGWX-dbiEQg&s'}}
            onChange={onFileUpload}
          />
        </Grid>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant='outlined' label='Cancel' onClick={() => closeModal()} />
          <Button
            variant='contained'
            type='submit'
            label='Submit'
            onClick={() => formik.handleSubmit()}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ImportProductsForm
