import { Modal } from '../../../../core-ui/Modal'
import { CircularProgress, FormLabel, Grid, Tooltip } from '@mui/material'
import {
  Button,
  DatePicker,
  IconButton,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import InfoIcon from '@mui/icons-material/Info'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ImageIcon from '@mui/icons-material/Image'
import React from 'react'
import { useFormik } from 'formik'
import { correctReceivedProductSchema, getInitialValues } from './helper'
import { SelectSupplier } from './SelectSupplier'
import { Product, ReceivedProduct, Supplier } from '../interfaces'
import { SelectProduct } from './SelectProduct'
import { useMutation, useQuery } from 'react-query'
import { formatPayloadDate, resizeFile } from '../../../../../utils/helpers'
import { makeCoreGetRequest, makeCorePutRequest } from '../../../../../utils/api'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { AxiosError } from 'axios'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'

interface CorrectReceivedProductRequestData {
  productId: string
  supplierId: string
  entryDate: string
  batchName: string
  hasExpireDate: boolean
  expireDate: string
  hasSecondaryDlc: boolean
  dlcDays: number
  batchQuantity: number

  // imageUrl: 'string'
  // storeId: string
  // batchStatus: 'string'
  // closeReason: 'OUT_OF_STOCK'
  // verifiedBy: 'string'
  // verifiedDate: '2024-01-18T11:43:36.604Z'
  // verified: true
}

export interface ReceivedProductToCorrect {
  selectedProduct: Product
  selectedSupplier: Supplier
  entryDate: dayjs.Dayjs
  hasExpirationDate: boolean
  expirationDate?: any
  hasSecondaryDLC: boolean
  secondaryDLC?: number
  amount?: number
  lot?: string
  picture?: File
}

interface CorrectReceivedProductProps {
  isModalOpen: boolean
  closeModal: () => void
  batchId?: string | number
  setShouldRefreshData: (should: boolean) => void
}
export const CorrectReceivedProduct = ({
  isModalOpen,
  closeModal,
  batchId,
  setShouldRefreshData
}: CorrectReceivedProductProps) => {
  const [showPhotoCapture, setShowPhotoCapture] = React.useState(false)
  const [isPictureChanged, setIsPictureChanged] = React.useState(false)
  const inputFileRef = React.useRef<HTMLInputElement>()
  const { showNotification } = useNotification()

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPictureChanged) {
        event.preventDefault()
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isPictureChanged])

  const receivedProductQuery = useQuery<ReceivedProduct>(
    ['received-product', batchId],
    async () => {
      return await makeCoreGetRequest(`/bakery/batch/${batchId}`)
    },
    {
      enabled: !!batchId,
      onError: error => {
        showNotification({
          message: `An error occurred while getting the product details. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const initialValues = React.useMemo(
    () => getInitialValues(receivedProductQuery.data),
    [receivedProductQuery.data]
  )

  const form = useFormik<ReceivedProductToCorrect>({
    enableReinitialize: true,
    validationSchema: correctReceivedProductSchema,
    validateOnChange: false,
    initialValues,
    onSubmit: () => {
      productCorrectionMutation.mutate()
    }
  })

  const productCorrectionMutation = useMutation(
    async () => {
      const formData = new FormData()

      const data: CorrectReceivedProductRequestData = {
        productId: form.values.selectedProduct.id,
        supplierId: form.values.selectedSupplier.id,
        entryDate: formatPayloadDate(form.values.entryDate),
        hasExpireDate: form.values.hasExpirationDate,
        expireDate: formatPayloadDate(form.values.expirationDate),
        hasSecondaryDlc: form.values.hasSecondaryDLC,
        dlcDays: form.values.secondaryDLC,
        batchQuantity: form.values?.amount,
        batchName: form.values.lot
      }

      formData.append('dto', new Blob([JSON.stringify(data)], { type: 'application/json' }))

      if (form.values.picture) {
        const resizedImage = await resizeFile({ file: form.values.picture })
        console.log('originalImage', (form.values.picture.size / (1024 * 1024)).toFixed(5), 'mb')
        console.log('resizedImage', (resizedImage.size / (1024 * 1024)).toFixed(5), 'mb')

        formData.append('fileObject', resizedImage)
      } else {
        formData.append('fileObject', null)
      }

      await makeCorePutRequest(`/bakery/batch/correction/${batchId}`, formData)
    },
    {
      onSuccess: () => {
        closeModal()
        showNotification({
          message: `Product added successfully`,
          type: 'success'
        })
        setShouldRefreshData(true)
        setIsPictureChanged(false)
      },
      onError: (res: any) => {
        if (res?.code === AxiosError.ERR_NETWORK) {
          showNotification({
            message: 'Verificati conexiunea la internet',
            type: 'error'
          })
          return
        }

        showNotification({
          message: `Exceptie: va rugam incercati, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle="Corectie" modalWidth="50%">
      <Grid container rowSpacing={3.5}>
        {productCorrectionMutation.isLoading || receivedProductQuery.isFetching ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid item xs={12} container spacing={2}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xl={3} lg={4} md={6} xs={12}>
                  <Input
                    type="number"
                    variant="outlined"
                    label="Cod METI"
                    onChange={f => f}
                    value={form.values.selectedProduct?.metiCode?.toString() || ''}
                    disabled
                  />
                </Grid>

                <Grid item xl={9} lg={8} md={6} xs={12}>
                  <SelectProduct
                    selectedProduct={form.values.selectedProduct}
                    setSelectedProduct={sp => {
                      form.setFieldValue('selectedProduct', sp)
                      form.setFieldValue('selectedSupplier', null)
                    }}
                    error={!!form.errors.selectedProduct}
                    helperText={form.errors.selectedProduct as string}
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12} spacing={2}>
                <Grid item xl={3} lg={4} md={6} xs={12}>
                  <Input
                    type="number"
                    variant="outlined"
                    label="Furnizor - Cod Meti"
                    onChange={() => {}}
                    value={form.values.selectedSupplier?.supplierCode?.toString() || ''}
                    disabled
                  />
                </Grid>

                <Grid item xl={9} lg={8} md={6} xs={12}>
                  <SelectSupplier
                    selectedProduct={form.values.selectedProduct}
                    selectedSupplier={form.values.selectedSupplier}
                    setSelectedSupplier={ss => {
                      form.setFieldValue('selectedSupplier', ss)
                    }}
                    error={!!form.errors.selectedSupplier}
                    helperText={form.errors.selectedSupplier as string}
                  />
                </Grid>
              </Grid>

              <Grid item xl={3} lg={4} md={6} xs={12}>
                <DatePicker
                  error={!!form.errors.entryDate}
                  helperText={form.errors.entryDate as string}
                  label="Data intrare in raion"
                  onChange={value => form.handleChange({ target: { name: 'entryDate', value } })}
                  required
                  value={form.values.entryDate}
                  variant="outlined"
                  maxDate={dayjs()}
                />
              </Grid>

              <Grid item xl={3} lg={4} md={6} xs={12} sx={{ marginTop: '17px' }}>
                <RadioButtonGroup
                  label="Data expirare"
                  dotStyle
                  name="hasExpirationDate"
                  onChange={e => {
                    const value = e.target.value === 'true'
                    form.setFieldValue('hasExpirationDate', value)
                    if (!value) {
                      form.setFieldValue('expirationDate', null)
                    }
                  }}
                  value={form.values.hasExpirationDate ? 'true' : 'false'}
                  row
                  options={[
                    {
                      label: 'DA',
                      value: 'true'
                    },
                    {
                      label: 'NU',
                      value: 'false'
                    }
                  ]}
                />
              </Grid>

              <Grid item xl={3} lg={4} md={6} xs={12}>
                <DatePicker
                  error={!!form.errors.expirationDate}
                  helperText={form.errors.expirationDate as string}
                  label="Data expirare"
                  onChange={value =>
                    form.handleChange({ target: { name: 'expirationDate', value } })
                  }
                  required
                  value={form.values.expirationDate}
                  variant="outlined"
                  minDate={dayjs()}
                  disabled={!form.values.hasExpirationDate}
                />
              </Grid>

              <Grid item xl={3} lg={4} md={6} xs={12} sx={{ marginTop: '17px' }}>
                <RadioButtonGroup
                  label="DLC Secundar"
                  dotStyle
                  name="hasSecondaryDLC"
                  onChange={e => {
                    const hasSecondaryDLC = e.target.value === 'true'
                    form.setFieldValue('hasSecondaryDLC', hasSecondaryDLC)
                    if (!hasSecondaryDLC) {
                      form.setFieldValue('secondaryDLC', null)
                    }
                  }}
                  value={form.values.hasSecondaryDLC ? 'true' : 'false'}
                  row
                  options={[
                    {
                      label: 'DA',
                      value: 'true'
                    },
                    {
                      label: 'NU',
                      value: 'false'
                    }
                  ]}
                />
              </Grid>

              <Grid item xl={3} lg={4} md={6} xs={12}>
                <Input
                  type="number"
                  variant="outlined"
                  label="Numar zile DLC"
                  onChange={form.handleChange}
                  value={form.values.secondaryDLC?.toString() ?? ''}
                  name="secondaryDLC"
                  disabled={!form.values.hasSecondaryDLC}
                  error={!!form.errors.secondaryDLC}
                  helperText={form.errors.secondaryDLC as string}
                />
              </Grid>

              <Grid item xl={3} lg={4} md={6} xs={12}>
                <Input
                  type="text"
                  variant="outlined"
                  label="Lot"
                  onChange={form.handleChange}
                  value={form.values.lot}
                  name="lot"
                  error={!!form.errors.lot}
                  helperText={form.errors.lot as string}
                  infoIcon={
                    <Tooltip
                      placement="top"
                      title="Daca lotul este dat de data expirarii sau receptiei se va introduce sub forma ZZ.LL.AAAA"
                    >
                      <InfoIcon />
                    </Tooltip>
                  }
                />
              </Grid>

              <Grid item xl={3} lg={4} md={6} xs={12}>
                <Input
                  type="number"
                  variant="outlined"
                  label="Cantitatea intrata"
                  onChange={form.handleChange}
                  value={form.values.amount?.toString()}
                  name="amount"
                  suffix={form.values?.selectedProduct?.metricUnit}
                  error={!!form.errors.amount}
                  helperText={form.errors.amount as string}
                />
              </Grid>

              <Grid item xs={12} spacing={2}>
                {form.values.picture ? (
                  <>
                    <Grid item>
                      <FormLabel>{form.values.picture.name}</FormLabel>
                    </Grid>
                    <Grid item>
                      <Button
                        label=""
                        variant="outlined"
                        size="large"
                        onClick={() => form.setFieldValue('picture', undefined)}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </Grid>
                  </>
                ) : showPhotoCapture ? (
                  <Grid item>
                    <WebcamCapture
                      onImageCapture={imageSrc => {
                        fetch(imageSrc)
                          .then(res => res.blob())
                          .then(blob => {
                            const file = new File([blob], 'image.JPEG', { type: 'image/png' })
                            form.setFieldValue('picture', file)
                            setIsPictureChanged(true)
                            setShowPhotoCapture(false)
                          })
                      }}
                      videoConstraints={{ width: 500, height: 400, facingMode: 'environment' }}
                    />
                  </Grid>
                ) : (
                  <Grid item style={{ marginTop: '24px' }}>
                    <IconButton
                      label="Deschide camera"
                      onClick={() => setShowPhotoCapture(true)}
                      startIcon={<ImageIcon />}
                      variant="outlined"
                      style={{
                        marginRight: '24px'
                      }}
                    />
                    <IconButton
                      label="Incarca foto"
                      onClick={() => {
                        inputFileRef?.current?.click()
                      }}
                      startIcon={<ImageIcon />}
                      variant="outlined"
                    />
                    {!!form.errors.picture && (
                      <p
                        style={{
                          color: '#AA0D11',
                          fontFamily: 'Ubuntu',
                          fontWeight: '400',
                          fontSize: '0.75rem',
                          lineHeight: '1.66',
                          margin: '4px 0 0 14px'
                        }}
                      >
                        {form.errors.picture as string}
                      </p>
                    )}
                  </Grid>
                )}

                <input
                  ref={inputFileRef}
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={e => {
                    if (e.target.files) {
                      form.setFieldValue('picture', e.currentTarget.files[0])
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent="space-between">
              <Grid>
                <Button size="large" variant="outlined" label="Anuleaza" onClick={closeModal} />
              </Grid>

              <Grid>
                <Button
                  size="large"
                  variant="contained"
                  label="Continua"
                  onClick={() => form.submitForm()}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Modal>
  )
}
