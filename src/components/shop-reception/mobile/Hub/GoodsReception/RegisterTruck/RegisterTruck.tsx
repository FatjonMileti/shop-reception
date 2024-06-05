import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { URLS } from 'components/shop-reception/mobile/constants'

const RegisterTruck = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: hubName, isLoading: isLoadingHubName } = useQuery(
    ['hub-name'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/home/getHubName`)
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

  const createTruck = async (values: any) => {
    return await makeCorePostRequest(
      `/shop-reception-mobile/truck/shop/createTruck`,
      values
    )
  }

  const { isLoading, mutate } = useMutation(createTruck, {
    onSuccess: (res, data) => {
      showNotification({
        message: `Camionul a fost creat cu success.`,
        type: 'success'
      })
      navigate(URLS.AUTH_REGISTER_TRUCK_STEP_2, { state: { item: res } })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isLoadingHubName) {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  const disableNextButton =
    formik.values.driverName === null ||
    formik.values.truckNumber === null ||
    formik.values.driverName.length === 0 ||
    formik.values.truckNumber.length === 0 ||
    formik.values.sealList.some(seal => seal.code === null || seal.code.length === 0)

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="medium"
        style={{ textAlign: 'center', textTransform: 'uppercase' }}
        pt={2}
      >
        {hubName?.value}
      </Typography>

      <Grid xs={10} item>
        <Input
          type="text"
          value={formik.values.truckNumber}
          onChange={event =>
            formik.setFieldValue('truckNumber', (event.target as HTMLInputElement).value)
          }
          label="Numar inmatriculare"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.truckNumber}
          helperText={formik.errors.truckNumber as string}
          required
        />
      </Grid>
      <Grid xs={10} item>
        <Input
          type="text"
          value={formik.values.driverName}
          onChange={event =>
            formik.setFieldValue('driverName', (event.target as HTMLInputElement).value)
          }
          label="Sofer"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.driverName}
          helperText={formik.errors.driverName as string}
          required
        />
      </Grid>

      {formik.values.sealList.map((seal, index) => (
        <>
          <Grid xs={10} item>
            <Input
              type="text"
              value={seal.code}
              onChange={event =>
                formik.setFieldValue(
                  `sealList[${index}].code`,
                  (event.target as HTMLInputElement).value
                )
              }
              label="Numar sigiliu"
              variant="outlined"
              style={{ width: '100%' }}
              error={!!formik.errors.sealList}
              helperText={formik.errors.sealList as string}
              required
            />
          </Grid>

          <Grid xs={10} item>
            <Button variant="outlined" label="-" onClick={() => {}} style={{ width: '100%' }} />
          </Grid>
        </>
      ))}

      {formik.values.sealList.length < 3 && (
        <Grid xs={10} item>
          <Button
            variant="outlined"
            label="Adauga alt sigiliu"
            onClick={() =>
              formik.setFieldValue('sealList', [...formik.values.sealList, { code: null }])
            }
            style={{ width: '100%' }}
          />
        </Grid>
      )}

      <Grid xs={10} item>
        <Button
          variant="outlined"
          label="Pasul urmator"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={disableNextButton}
        />
      </Grid>
    </Grid>
  )
}

export default RegisterTruck
