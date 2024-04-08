import { ChangeEvent, useMemo } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { AutocompleteOption } from 'components/volumetry/interfaces'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { Grid } from '@mui/material'
import { Button, FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { FileUpload } from 'components/core-ui/FileUpload'
import { toFormDataPayload } from 'utils/serializers'

interface NewAdminDepositProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  shopTypes: AutocompleteOption
}

const ImportProductsForm: React.FC<NewAdminDepositProps> = props => {
  const { isModalOpen, closeModal, setShouldRefreshData, shopTypes } = props
  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(), [])
  const validationSchema = useMemo(() => getValidationSchema(), [])

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    formik.setFieldValue('file', file)
  }

  const importData = async (values: any) => {
    await makeCorePostRequest(`/shop-reception/short-dlc/import`, values)
  }

  const { isLoading, mutate } = useMutation(importData, {
    onSuccess: res => {
      showNotification({
        message: `Data imported successfully`,
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `Error while trying to import data, ${formatErrorMessage(res)}`,
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
      const newValues = { ...values, shopCodes: values.shopCodes.map(shopCode => shopCode.value) }
      const payload = toFormDataPayload(newValues)

      mutate(payload)
      formik.resetForm()
      setShouldRefreshData(true)
      closeModal()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={' Importă produse DLC scurt'}
      modalWidth="50%"
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FilterDataSelect
            name="shopCodes"
            label="Magazin"
            options={shopTypes}
            onSelect={shops => formik.setFieldValue('shopCodes', shops)}
            placeholderButton="Selecteaza"
            multiSelect={true}
            showSearch
          />
        </Grid>

        <Grid item xs={12}>
          <FileUpload
            value={null}
            fileInputProps={{
              displayImage: ''
            }}
            onChange={onFileUpload}
          />
        </Grid>

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
              disabled={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ImportProductsForm
