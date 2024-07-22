import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMutation, useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useLocation, useNavigate } from 'react-router-dom'
import { URLS } from 'components/shop-reception/mobile/constants'
import { useState } from 'react'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { useFormik } from 'formik'
import { toBoolean } from 'utils/helpers'
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'

const ExpectedTrucksStep2 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const item = location.state.item

  const [isImageUploaded, setIsImageUploaded] = useState(null)

  const { data: truck, isLoading: isTruckLoading } = useQuery(
    ['truck'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/truck/hub/${item.value}`)

      // return response

      return {
        id: 0,
        depositId: 0,
        depositName: 'string',
        depositDocumentList: [
          {
            depositId: 0,
            depositName: 'string',
            hasNotice: true,
            hasTransportNote: true
          }
        ],
        status: 'string',
        hubId: 0,
        hubName: 'string',
        hubCode: 'string',
        shopCode: 'string',
        shopName: 'string',
        truckNumber: 'string',
        transportCode: 'string',
        shopTemperature: 0,
        registeredDate: 'string',
        createdBy: 'string',
        ticketCodeList: ['string', 'string2'],
        sealList: [
          {
            id: 0,
            code: 'string',
            type: 'string',
            broken: true,
            userMessage: 'string'
          }
        ],
        supportList: [
          {
            id: 0,
            supportCode: 'string',
            supportNumber: 'string',
            ticketNumber: 'string',
            truckNumber: 'string',
            driverName: 'string',
            arrivalDate: 'string',
            sensitiveProducts: true,
            shortDlcProducts: true,
            sgrProducts: true
          }
        ],
        flowType: 'IN_HUB'
      }
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const approveTruck = async values => {
    await makeCorePostRequest(`/shop-reception-mobile/truck/hub/approve`, values)
  }

  const { isLoading, mutate } = useMutation(approveTruck, {
    onSuccess: res => {
      showNotification({
        message: `Confirmat`,
        type: 'success'
      })
      navigate(URLS.AUTH_EXPECTED_TRUCKS_STEP3, { state: { item: item.value } })
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
    initialValues: truck,
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isTruckLoading || typeof formik.values === 'undefined') {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <TitleHeader title="" />
      <Grid xs={10} item display="flex" justifyContent="center">
        <Typography component="p" variant="medium" style={{ textAlign: 'center', color: 'black' }}>
          Numar inmatriculare: {truck.truckNumber}
        </Typography>
      </Grid>
      <Grid xs={10} item display="flex" justifyContent="center">
        <Typography component="p" variant="medium" style={{ textAlign: 'center', color: 'black' }}>
          Bon livrare: {truck.ticketCodeList.join(', ')}
        </Typography>
      </Grid>
      <Grid xs={10} item display="flex" justifyContent="center">
        <Typography component="p" variant="medium" style={{ textAlign: 'center', color: 'black' }}>
          Confirm documentele pentru depozit:{' '}
          {truck.depositDocumentList.map(truck => truck.depositName).join(', ')}
        </Typography>
      </Grid>

      <Grid xs={10} item>
        <Autocomplete
          variant="outlined"
          label={`Aviz/BL`}
          disableClearable
          options={[
            { label: 'Da', value: 'true' },
            { label: 'Nu', value: 'false' },
            { label: 'Nu e cazul', value: 'false' }
          ]}
          onChange={(event, option) =>
            formik.setFieldValue(`depositDocumentList[0].hasNotice`, toBoolean(option.value))
          }
          defaultValue={null}
        />
      </Grid>
      <Grid xs={10} item>
        <Autocomplete
          variant="outlined"
          label={`Scrisoare de transport/CMR`}
          disableClearable
          options={[
            { label: 'Da', value: 'true' },
            { label: 'Nu', value: 'false' },
            { label: 'Nu e cazul', value: 'false' }
          ]}
          onChange={(event, option) =>
            formik.setFieldValue(`depositDocumentList[0].hasTransportNote`, toBoolean(option.value))
          }
          defaultValue={null}
        />
      </Grid>
      <Grid xs={8} item>
        <Autocomplete
          variant="outlined"
          label={`Conformitate termodiagrama`}
          disableClearable
          options={[
            { label: 'Da', value: 'true' },
            { label: 'Nu', value: 'false' },
            { label: 'Nu e cazul', value: 'false' }
          ]}
          onChange={(event, option) =>
            formik.setFieldValue(`theormodiagramConform`, toBoolean(option.value))
          }
          defaultValue={null}
        />
      </Grid>
      <Grid item xs={2} display="flex" justifyContent={'center'} alignItems={'center'}>
        <ImageUpload
          uploadUrl={`/shop-reception-mobile/truck/hub/upload/in_thermodiagram/${item.value}`}
          onSuccess={() => {
            showNotification({
              message: `Imaginea a fost incarcata cu succes.`,
              type: 'success'
            })
            setIsImageUploaded(true)
          }}
          onError={() =>
            showNotification({
              message: `A aparut o eroare la incarcarea imaginii.}`,
              type: 'error'
            })
          }
        />
      </Grid>

      {formik.values.theormodiagramConform == false && (
        <Grid xs={10} item>
          <Input
            type="number"
            variant="outlined"
            label="Temperatura"
            width="100%"
            value={formik.values.shopTemperature}
            onChange={event =>
              formik.setFieldValue(`shopTemperature`, (event.target as HTMLInputElement).value)
            }
          />
        </Grid>
      )}

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Pasul urmator"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={
            isImageUploaded === null ||
            (formik.values.theormodiagramConform === false
              ? formik.values.shopTemperature == null ||
                typeof formik.values.shopTemperature == 'undefined' ||
                formik.values.shopTemperature.length <= 0
              : false)
          }
        />
      </Grid>
    </Grid>
  )
}

export default ExpectedTrucksStep2
