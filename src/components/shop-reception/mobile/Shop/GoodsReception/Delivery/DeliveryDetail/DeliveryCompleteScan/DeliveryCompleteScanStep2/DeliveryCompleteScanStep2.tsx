import {
  Autocomplete,
  Button,
  Divider,
  Input,
  Typography
} from '@fullscreendigital/carrefour-dex-fe'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotification } from 'hooks'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { Grid, Paper } from '@mui/material'
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { URLS } from 'components/shop-reception/mobile/constants'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { DefectReason, Mark } from '../../../../../../../enums'
import AlertModal from 'components/shop-reception/mobile/Common/AlertModal/AlertModal'

const DeliveryCompleteScanStep2 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()
  const [productCode, setProductCode] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const queryClient = useQueryClient()
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const { truckId, ticketId, data } = location.state

  const {
    data: scanProduct,
    isLoading: isLoadingScanProduct,
    refetch: refetchProduct
  } = useQuery(
    ['product-scan'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/aleatory/product/scan-by-code/${data.supportCode}/${productCode}`
      )

      if (response.errorMessage) {
        showNotification({
          message: `${response.errorMessage}`,
          type: 'error'
        })
      }
      return response || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  const saveProduct = async (values: any) => {
    return await makeCorePostRequest(`/shop-reception-mobile/aleatory/product/save`, values)
  }

  const { isLoading, mutate } = useMutation(saveProduct, {
    onSuccess: (res, data) => {
      showNotification({
        message: `Cantitatile au fost inregistrate cu succes.`,
        type: 'success'
      })
      queryClient.removeQueries('product-scan')
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      ...scanProduct,
      currentConformValue: scanProduct?.validated,
      currentDefectValue: scanProduct?.broken
    },
    onSubmit: async (values: any) => {
      if (!scanProduct?.errorMessage && typeof scanProduct?.errorMessage !== 'undefined') {
        const payload = {
          ...values,
          id: data?.productList?.find(product => product.name === selectedProduct.label).id
        }
        mutate(payload)
      } else {
        navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_1, {
          state: { truckId, ticketId }
        })
      }
    }
  })

  useEffect(() => {
    if (typeof selectedProduct?.value !== 'undefined') {
      refetchProduct()
    }
  }, [selectedProduct?.value])

  const getMarkOptions = () => {
    const currentConformValue = parseFloat(formik.values.currentConformValue)
    const currentDefectValue = parseFloat(formik.values.currentDefectValue)
    const totalValue = currentConformValue + currentDefectValue

    const deviation =
      formik.values.shopReceptionDeviation === null
        ? 0
        : formik.values.shopReceptionDeviation / 1000

    if (
      formik.values.quantity > currentConformValue + deviation &&
      formik.values.quantity === totalValue
    ) {
      return [
        { label: 'Calitate legume fructe', value: 'VEGETABLE_FRUIT_QUALITY' },
        { label: 'Deteriorate', value: 'DAMAGED' },
        { label: 'Termen Scurt', value: 'SHORT_TERM' },
        { label: 'Expirate', value: 'EXPIRED' },
        { label: 'Legume fructe', value: 'VEGETABLES_FRUITS' },
        { label: 'Deteriorare-A', value: 'DETERIORATION_A' }
      ]
    }

    if (
      formik.values.quantity > currentConformValue + deviation &&
      formik.values.quantity !== totalValue
    ) {
      return [
        { label: 'Diferenta cantitativa', value: 'QUANTITATIVE_DIFFERENCE' },
        { label: 'Lipsa transportator', value: 'MISSING_CARRIER' },
        { label: 'Paleti marfa lipsa', value: 'PALLETS_MERCHANDISE_MISSING' }
      ]
    }

    if (formik.values.quantity < currentConformValue - deviation) {
      return [
        { label: 'Paleti marfa lipsa', value: 'PALLETS_MERCHANDISE_MISSING' },
        { label: 'Diferenta cantitativa', value: 'QUANTITATIVE_DIFFERENCE' }
      ]
    }

    return []
  }

  const getDefectOptions = () => {
    const markOptions = getMarkOptions()
    const litigation = markOptions.length > 2 ? 2 : 1
    if (litigation == 1 && formik.values.mark !== null) {
      return [{ value: DefectReason.PROVIDER, label: DefectReason.PROVIDER }]
    }

    if (litigation == 2 && formik.values.mark !== null) {
      if (formik.values.mark === Mark.EXPIRED || formik.values.mark === Mark.SHORT_TERM) {
        return [{ value: DefectReason.PROVIDER, label: DefectReason.PROVIDER }]
      }

      if (formik.values.mark === Mark.VEGETABLE_FRUIT_QUALITY) {
        return [
          { value: DefectReason.PROVIDER, label: DefectReason.PROVIDER },
          { value: DefectReason.SHOP, label: DefectReason.SHOP }
        ]
      }

      if (formik.values.mark === Mark.DAMAGED) {
        return [
          { value: DefectReason.PROVIDER, label: DefectReason.PROVIDER },
          { value: DefectReason.SHOP, label: DefectReason.SHOP },
          { value: DefectReason.TRANSPORTER, label: DefectReason.TRANSPORTER }
        ]
      }
      if (
        formik.values.mark === Mark.VEGETABLES_FRUITS ||
        formik.values.mark === Mark.DETERIORATION_A
      ) {
        return [
          { value: DefectReason.PROVIDER, label: DefectReason.PROVIDER },
          { value: DefectReason.TRANSPORTER, label: DefectReason.TRANSPORTER }
        ]
      }
    }

    return []
  }

  const quantityLitigation = formik.values.currentConformValue != formik.values.quantity
  const qualityLitigation = formik.values.currentDefectValue > 0

  return (
    <Grid container justifyContent={'center'} rowSpacing={2}>
      <Grid item xs={10}>
        <TitleHeader title="VALIDARE LIVRARE SCANARE INTEGRALǍ" />
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            SCANARE INTEGRALA
          </Typography>
          <Typography variant="medium" component="p">
            Numar inmatriculare: {data?.truckNumber}
          </Typography>
          <Typography variant="medium" component="p">
            BL: {data?.ticketNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Suporti verificati: {data?.supportCounter}/{data?.totalSupportNumber}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={10} mb={2}>
        <Paper elevation={3} style={{ padding: '20px' }} onClick={() => {}}>
          <Typography variant="medium" component="h5">
            Eticheta suport:
          </Typography>
          <Typography variant="medium" component="p">
            {data?.supportCode}
          </Typography>
          <Typography variant="medium" component="p">
            Numar suport: {data?.supportNumber}
          </Typography>
          <Typography variant="medium" component="p">
            Produse verificate: {data?.productCounter}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={10} mb={2}>
        <Autocomplete
          variant="outlined"
          label="Selecteaza produs vrac"
          disableClearable
          required
          onChange={(event, option) => {
            setProductCode(option.value)
            setSelectedProduct(option)
          }}
          options={
            data?.productList?.map(product => ({ label: product.name, value: product.eanCode })) ||
            []
          }
        />
      </Grid>

      <Grid item xs={10}>
        <Input
          type="search"
          variant="outlined"
          label="Cod produs"
          autoFocus
          value={productCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setProductCode(target.value)
          }}
          onSearchIconClick={() => {
            refetchProduct()
          }}
          width="100%"
        />
      </Grid>

      <Grid item xs={10}>
        <Divider>SAU</Divider>
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Scaneaza suport"
          onClick={() => () => {}}
          style={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={10} my={2}>
        {!scanProduct?.errorMessage && typeof scanProduct?.errorMessage !== 'undefined' && (
          <>
            <Table>
              <TableHead style={{ backgroundColor: '#0970E6' }}>
                <TableRow>
                  <TableCell>Produs</TableCell>
                  <TableCell>Calitativ</TableCell>
                  <TableCell>Defect</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {scanProduct?.productName} {scanProduct?.productEans}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      autoFocus
                      value={formik.values.currentConformValue || 0}
                      onChange={e => {
                        const target = e.target as HTMLInputElement
                        formik.setFieldValue('currentConformValue', target.value)
                      }}
                      width="100%"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      variant="outlined"
                      autoFocus
                      value={formik.values.currentDefectValue || 0}
                      onChange={e => {
                        const target = e.target as HTMLInputElement
                        formik.setFieldValue('currentDefectValue', target.value)
                      }}
                      width="100%"
                    />
                  </TableCell>
                  <TableCell>
                    {(quantityLitigation || qualityLitigation) && (
                      <Grid xs={10} item>
                        <ImageUpload
                          uploadUrl={`/shop-reception-mobile/integral/upload/${data.supportId}/${scanProduct.productId}`}
                          onSuccess={() => {
                            showNotification({
                              message: `Imaginea a fost incarcata cu succes.`,
                              type: 'success'
                            })
                          }}
                          onError={() =>
                            showNotification({
                              message: `A aparut o eroare la incarcarea imaginii.`,
                              type: 'error'
                            })
                          }
                          inputId={`aleatory-integral-upload`}
                        />
                      </Grid>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {(quantityLitigation || qualityLitigation) && (
              <Grid container>
                <Grid item xs={12}>
                  <Autocomplete
                    variant="outlined"
                    label={`Marca`}
                    disableClearable
                    options={getMarkOptions()}
                    onChange={(event, option) => {
                      formik.setFieldValue(`mark`, option.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    variant="outlined"
                    label={`Motiv`}
                    disableClearable
                    options={getDefectOptions()}
                    onChange={(event, option) => formik.setFieldValue(`defectReason`, option.value)}
                  />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Grid>

      <Grid xs={10} mt={2} item>
        <Button
          variant="contained"
          label={
            !scanProduct?.errorMessage && typeof scanProduct?.errorMessage !== 'undefined'
              ? 'Confirma cantitati'
              : 'Finalizeaza suport'
          }
          onClick={() =>
            formik.values.quantity !== formik.values.currentConformValue
              ? setIsAlertOpen(true)
              : formik.handleSubmit()
          }
          style={{ width: '100%' }}
          disabled={
            (quantityLitigation || qualityLitigation) &&
            (formik.values.mark === null || formik.values.defectReason === null)
          }
        />
      </Grid>

      <AlertModal
        open={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        title={'Atentie'}
        description={`Exista diferente intre cantitatea asteptata si cea introdusa.`}
        buttons={[
          { label: 'Mai verific', onClick: () => setIsAlertOpen(false), color: 'primary' },
          { label: 'Am terminat', onClick: () => formik.handleSubmit(), color: 'primary' }
        ]}
      />
    </Grid>
  )
}
export default DeliveryCompleteScanStep2
