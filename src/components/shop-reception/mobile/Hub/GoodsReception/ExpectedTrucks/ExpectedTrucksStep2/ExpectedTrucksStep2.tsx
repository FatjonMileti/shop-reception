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

const ExpectedTrucksStep2 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const item = location.state.item

  const [isImageUploaded, setIsImageUploaded] = useState(null)

  const { data: hubName, isLoading: isLoadingHubName } = useQuery(
    ['hub-name'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/home/hub-name`)
      return response || []
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

  const { data: truck, isLoading: isTruckLoading } = useQuery(
    ['truck'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/truck/hub/${item.value}`)

      return response
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

  if (isLoadingHubName || isTruckLoading || typeof formik.values === 'undefined') {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid xs={12} item>
        <Typography
          component="h2"
          variant="medium"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
          pt={2}
        >
          {hubName.value}
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
          inputId={`thermodiagram-img`}
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
