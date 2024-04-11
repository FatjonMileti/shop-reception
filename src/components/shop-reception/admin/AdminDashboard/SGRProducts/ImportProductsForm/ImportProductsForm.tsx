import { ChangeEvent, useMemo, useState } from 'react'
import { Autocomplete, Button, FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { toPayload } from './serializers'
import { Grid } from '@mui/material'
import { FileUpload } from 'components/core-ui/FileUpload'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { toFormDataPayload } from 'utils/serializers'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'

interface SGRProductsProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  shopTypes: AutocompleteOption[]
  shopCodes: AutocompleteOption[]
}

const ImportProductsForm: React.FC<SGRProductsProps> = props => {
  const { isModalOpen, closeModal, setShouldRefreshData, shopTypes, shopCodes } = props
  const { showNotification } = useNotification()

  const [file, setFile] = useState<File | null>(null)

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files && event.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      formik.setFieldValue('file', uploadedFile)
    }
  }

  const importData = async (values: any) => {
    await makeCorePostRequest(`/shop-reception/products/sgr/import`, values, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure correct content type
      }
    })
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

  const initialValues = useMemo(() => getInitialValues(), [])
  const validationSchema = useMemo(() => getValidationSchema(), [])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const newValues = { ...values, shopCodes: values.shopCodes.map(shopCode => shopCode.value) }

      const form = new FormData()
      form.append('shopCodes', newValues.shopCodes)
      form.append('ruleTypes', newValues.ruleTypes.value)
      form.append('file', file)

      mutate(form)
      formik.resetForm()
      setShouldRefreshData(true)
      closeModal()
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={'Importă produse SGR'}
      modalWidth="50%"
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <FilterDataSelect
            name="shopCodes"
            label="Magazin"
            options={shopCodes}
            onSelect={shops => formik.setFieldValue('shopCodes', shops)}
            placeholderButton="Selecteaza"
            multiSelect={true}
            showSearch
          />
        </Grid>

        <Grid xs={12} item>
          <Autocomplete
            variant="outlined"
            label="Regula"
            disableClearable
            required
            onChange={(event, option) => formik.setFieldValue('ruleTypes', option)}
            value={formik.values.shopType}
            options={shopTypes}
            error={!!formik.errors.shopType}
            helperText={formik.errors.shopType as string}
          />
        </Grid>

        <Grid xs={12} item>
          <FileUpload
            value={formik.values.file}
            fileInputProps={{
              displayImage: file
            }}
            onChange={onFileUpload}
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button variant="contained" label={'Salveaza'} onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ImportProductsForm
