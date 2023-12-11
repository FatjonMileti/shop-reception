import { Box, CircularProgress, Divider, Grid, Paper, Typography, useMediaQuery } from '@mui/material'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useMemo } from 'react'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { useQuery } from 'react-query'
import { NewAddress } from './NewAddress'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import { useFormik } from 'formik'
import { getInitialValues, getValidationSchema } from './helpers'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toOrderPayload } from './serializers'


interface PaymentMethodProps {
  clientId: string
}
const PaymentMethod: React.FC<PaymentMethodProps> = props => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const isXs = useMediaQuery('(max-width:624px)');
  const { clientId } = props

  const { data: paymentOptions, isLoading: isPaymentOptionsLoading } = useQuery(
    ['payment-methods'],
    async () => {
      const result = await makeCoreGetRequest('/supply-omni/order/payment-methods')
      const resultOptions = toAsyncSelectOptions(result, 'type', 'description') || []

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: deliveryOptions, isLoading: isDeliveryOptionsLoading } = useQuery(
    ['delivery-options'],
    async () => {
      const result = await makeCoreGetRequest(
        '/supply-omni/order/delivery-options?currentOrder=true'
      )
      const resultOptions = toAsyncSelectOptions(result, 'type', 'description') || []

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const addOrder = async values => {
    const result = await makeCorePostRequest(`/supply-omni/order`, values)
    return result
  }

  const { isLoading: isLoadingAddOrder, mutate } = useMutation(addOrder, {
    onSuccess: (data: any) => {
      showNotification({
        message: 'Comanda a fost inregistrata cu success!',
        type: 'success'
      })
      navigate(`/supplyOmni/proformaView/${data?.id}`)
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare! ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const initialValues = useMemo(
    () => getInitialValues(clientId, deliveryOptions?.[0].value),
    [clientId, deliveryOptions]
  )

  const validationSchema = useMemo(() => getValidationSchema(), [])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(toOrderPayload(values))
    }
  })

  return (
    // <Grid item xs={12} md={6}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', padding:'16px 8px' }}>
          {/* <PaymentsOutlinedIcon /> */}
          <Typography fontWeight={600} ml={2}>
            Metoda de plata
          </Typography>
        </Box>
        <Divider />

        <Grid container>
          <Grid item md={12} sm={12} xs={12}>
            <Box padding={4} paddingBottom={0}>
              <AsyncAutocomplete
                variant="outlined"
                name="payment-methods"
                label="Metoda de plata"
                disableClearable
                style={{'& .MuiOutlinedInput-root' : {padding:0 }}}
                value={
                  paymentOptions?.find(item => item.value === formik.values.paymentMethod)
                    ?.label || ''
                }
                options={paymentOptions || []}
                onChange={paymentMethod =>
                  formik.setFieldValue('paymentMethod', paymentMethod.value)
                }
                required
                error={!!formik.errors.paymentMethod}
                helperText={formik.errors.paymentMethod as string}
              />
            </Box>
          </Grid>
          
          <Grid item md={12} sm={12} xs={12}>
            <Box padding={4} paddingBottom={0}>
              <AsyncAutocomplete
                variant="outlined"
                name="delivery-options"
                label="Alege tipul de livrare"
                disableClearable
                value={
                  deliveryOptions?.find(item => item.value === formik.values.deliveryType)
                    ?.label || ''
                }
                options={deliveryOptions || []}
                onChange={deliveryType =>
                  formik.setFieldValue('deliveryType', deliveryType.value)
                }
                style={{'& .MuiOutlinedInput-root' : {padding:0 }}}
                required
                error={!!formik.errors.deliveryType}
                helperText={formik.errors.deliveryType as string}
              />
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <NewAddress
              formik={formik}
              onFieldUpdate={(key, value) => formik.setFieldValue(key, value)}
            />
          </Grid>
          <Grid container p={4} justifyContent="flex-end">
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                {isLoadingAddOrder && (
                  <CircularProgress color="primary" disableShrink style={{ marginRight: '16px' }} />
                )}
                <Button
                  variant="contained"
                  label={''}
                  style={!isXs ? {} : {width:'100%'}}
                  onClick={() => formik.handleSubmit()}
                  disabled={isLoadingAddOrder}
                >
                  <PictureAsPdfOutlinedIcon /> PROFORMA IN FORMAT PDF
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    // </Grid>
  )
}

export default PaymentMethod
