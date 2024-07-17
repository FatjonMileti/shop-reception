import { ChangeEvent, useMemo, useState } from 'react'
import { Autocomplete, Button, FilterDataSelect } from '@fullscreendigital/carrefour-dex-fe'
import { Modal } from 'components/core-ui/Modal'
import { useFormik } from 'formik'
import { getInitialValues } from './helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { CircularProgress, Grid } from '@mui/material'
import { AutocompleteOption } from 'components/volumetry/interfaces'
import { makeCorePostRequest } from 'utils/api'
import { useMutation } from 'react-query'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { FileUpload } from 'components/core-ui/FileUpload'
import { useOfflineTool } from 'components/core-ui/Offline'
import { AxiosError } from 'axios'

interface ImportProductsProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  shopTypes: AutocompleteOption[]
  shopCodes: AutocompleteOption[]
  isLoadingShopTypes: boolean
  isShopCodesLoading: boolean
}

const ImportProducts: React.FC<ImportProductsProps> = props => {
  const {
    isModalOpen,
    closeModal,
    setShouldRefreshData,
    shopTypes,
    shopCodes,
    isLoadingShopTypes,
    isShopCodesLoading
  } = props
  const { showNotification } = useNotification()
  const offlineTool = useOfflineTool()

  const [file, setFile] = useState<File | null>(null)

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event?.target.files && event?.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      formik.setFieldValue('file', uploadedFile)
    }
  }

  const importData = async (values: any) => {
    await makeCorePostRequest(`/shop-reception/products/sensitives/import`, values, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure correct content type
      }
    })
  }

  const { isLoading, mutate } = useMutation(importData, {
    onSuccess: res => {
      showNotification({
        message: `Datele au fost importate cu succes.`,
        type: 'success'
      })

      formik.resetForm()
      setShouldRefreshData(true)
      closeModal()
    },
    onError: (err: any) => {
      if (err?.code === AxiosError.ERR_NETWORK) {
        showNotification({
          message: 'Verificati conexiunea la internet',
          type: 'error'
        })

        // Store offline
        offlineTool.addOwnTask({
          type: `Produse sensibile`,
          data: err.config.data as FormData,
          url: `/shop-reception/products/sensitives/import`,
          method: 'post'
        })

        closeModal()

        return
      }
      showNotification({
        message: `A aparut o eroare. ${formatErrorMessage(err)}`,
        type: 'error'
      })
    }
  })

  const initialValues = useMemo(
    () => getInitialValues(shopCodes, shopTypes),
    [shopCodes, shopTypes]
  )

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      const newValues = { ...values, shopCodes: values.shopCodes.map(shopCode => shopCode.value) }

      const form = new FormData()

      form.append(
        'shopCodes',
        new Blob([JSON.stringify(newValues.shopCodes)], { type: 'application/json' })
      )
      form.append(
        'ruleTypes',
        new Blob([JSON.stringify([newValues.ruleTypes.value])], { type: 'application/json' })
      )

      form.append('file', file)

      mutate(form)
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={' Importă produse sensibile'}
      modalWidth="50%"
    >
      <Grid container spacing={1}>
        <Grid xs={12} item>
          {isShopCodesLoading ? (
            <CircularProgress color="primary" disableShrink />
          ) : (
            <FilterDataSelect
              name="shopCodes"
              label="Magazin"
              options={shopCodes}
              defaultSelectedData={shopCodes ? shopCodes[0] : null}
              onSelect={shops => formik.setFieldValue('shopCodes', shops)}
              placeholderButton="Selecteaza"
              multiSelect={true}
              showSearch
            />
          )}
        </Grid>

        <Grid xs={12} item>
          {isLoadingShopTypes ? (
            <CircularProgress color="primary" disableShrink />
          ) : (
            <FilterDataSelect
              name="ruleTypes"
              label="Regula"
              options={shopTypes}
              defaultSelectedData={shopTypes ? shopTypes[0] : null}
              onSelect={shops => formik.setFieldValue('ruleTypes', shops)}
              placeholderButton="Selecteaza"
              multiSelect={true}
              showSearch
            />
          )}
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
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button
            variant="contained"
            label={'Salveaza'}
            onClick={() => formik.handleSubmit()}
            disabled={isLoading || isLoadingShopTypes || isShopCodesLoading || file === null}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ImportProducts
