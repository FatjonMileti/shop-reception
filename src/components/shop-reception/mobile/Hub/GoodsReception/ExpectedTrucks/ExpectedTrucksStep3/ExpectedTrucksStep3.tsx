import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { CircularProgress, Divider, Grid, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useLocation, useNavigate } from 'react-router-dom'
import { URLS } from 'components/shop-reception/mobile/constants'
import { useState } from 'react'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { useFormik } from 'formik'
import { toBoolean } from 'utils/helpers'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import AlertModal from 'components/shop-reception/mobile/Common/AlertModal/AlertModal'

const ExpectedTrucksStep3 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const truckId = location.state.item
  const [supportCode, setSupportCode] = useState(null)
  const [isSupportImageUploaded, setIsSupportImageUploaded] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

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

  const { data: counter, isLoading: isCounterLoading } = useQuery(
    ['counter'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/support/hub/counter/${truckId}`
      )

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

  const { data: typeOptions, isLoading: isTypeOptionsLoading } = useQuery(
    ['type-options'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/support/shop/principal/type`
      )

      return response.map(type => ({ label: type.name, value: type.id }))
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

  const { data: hubTruck, isLoading: isHubTruckLoading } = useQuery(
    ['type-options'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/truck/hub/${truckId}`)

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

  const scan = async values => {
    const response = await makeCorePostRequest(
      `/shop-reception-mobile/support/hub/scan/${truckId}`,
      values,
      {
        headers: { 'Content-Type': 'text/plain' }
      }
    )

    return response
  }

  const {
    isLoading: isLoadingScan,
    mutate: scanCode,
    data: scanCodeData,
    reset: resetScanData
  } = useMutation(scan, {
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const saveSupport = async values => {
    await makeCorePostRequest(`/shop-reception-mobile/support/hub/save/${truckId}`, values)
  }

  const { isLoading, mutate } = useMutation(saveSupport, {
    onSuccess: res => {
      showNotification({
        message: `Confirmat`,
        type: 'success'
      })
      resetScanData()
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
      defect: false,
      reason: null,
      supportId: scanCodeData?.truckId || null,
      supportTypeId: null
    },
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isLoadingHubName || isCounterLoading || isHubTruckLoading) {
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
        <Input
          type="search"
          variant="outlined"
          label="Cod suport"
          autoFocus
          value={supportCode}
          onChange={e => {
            const target = e.target as HTMLInputElement
            setSupportCode(target.value)
          }}
          onSearchIconClick={() => scanCode(supportCode)}
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

      {scanCodeData && (
        <>
          <Grid xs={10} item>
            <Typography component="p" variant="medium">
              Numar suport {scanCodeData?.supportNumber}
            </Typography>
          </Grid>

          <Grid xs={10} item>
            <Autocomplete
              variant="outlined"
              label={`Tip ambalaj`}
              disableClearable
              options={typeOptions}
              onChange={(event, option) => formik.setFieldValue(`supportTypeId`, option.value)}
              defaultValue={null}
            />
          </Grid>

          <Grid xs={10} item>
            <Autocomplete
              variant="outlined"
              label={`Calitativ`}
              disableClearable
              options={[
                { label: 'Da', value: 'true' },
                { label: 'Nu', value: 'false' }
              ]}
              onChange={(event, option) => formik.setFieldValue('defect', !toBoolean(option.value))}
            />
          </Grid>

          {formik.values.defect && (
            <>
              <Grid xs={10} item>
                <Autocomplete
                  variant="outlined"
                  label={`Motiv`}
                  disableClearable
                  options={[
                    { label: 'Prestator', value: 'PROVIDER' },
                    { label: 'Transportator', value: 'TRANSPORTER' },
                    { label: 'Sef depozit', value: 'SHOP' }
                  ]}
                  onChange={(event, option) => formik.setFieldValue('reason', option.value)}
                />
              </Grid>
              <Grid xs={10} item>
                <Autocomplete
                  variant="outlined"
                  label={`Marca`}
                  disableClearable
                  options={[
                    { label: 'Legume fructe', value: 'VEGETABLES_FRUITS' },
                    { label: 'Deteriorate', value: 'DAMAGED' },
                    { label: 'Termen Scurt', value: 'SHORT_TERM' },
                    { label: 'Expirate', value: 'EXPIRED' },
                    { label: 'Calitate legume fructe', value: 'VEGETABLE_FRUIT_QUALITY' },
                    { label: 'Deteriorare-A', value: 'DETERIORATION_A' },
                    { label: 'Diferenta cantitativa-A', value: 'QUANTITATIVE_DIFFERENCE_A' },
                    { label: 'Lipsa Bax', value: 'MISSING_BAX' },
                    { label: 'Diferenta cantitativa', value: 'QUANTITATIVE_DIFFERENCE' },
                    { label: 'Lipsa transportator', value: 'MISSING_CARRIER' },
                    { label: 'Paleti marfa lipsa', value: 'PALLETS_MERCHANDISE_MISSING' },
                    { label: 'VOL', value: 'VOLUME' }
                  ]}
                  onChange={(event, option) =>
                    formik.setFieldValue('defect', !toBoolean(option.value))
                  }
                />
              </Grid>

              <Grid xs={10} item>
                <ImageUpload
                  uploadUrl={`/shop-reception-mobile/support/shop/upload/${scanCodeData.truckId}`}
                  onSuccess={() => {
                    showNotification({
                      message: `Imaginea a fost incarcata cu succes.`,
                      type: 'success'
                    })
                    setIsSupportImageUploaded(true)
                  }}
                  onError={() =>
                    showNotification({
                      message: `A aparut o eroare la incarcarea imaginii.`,
                      type: 'error'
                    })
                  }
                  inputId={`supportCode`}
                />
              </Grid>
            </>
          )}

          <Grid xs={10} item>
            <Button
              variant="contained"
              label="Alte ambalaje"
              onClick={() => {
                navigate(URLS.AUTH_EXPECTED_TRUCKS_STEP4, {
                  state: { supportId: scanCodeData?.truckId, truckId: truckId }
                })
              }}
              style={{ width: '100%' }}
            />
          </Grid>

          <Grid xs={10} item>
            <Button
              variant="contained"
              label="Confirm tip suport"
              onClick={() => formik.handleSubmit()}
              style={{ width: '100%' }}
              disabled={formik.values.defect && isSupportImageUploaded == false}
            />
          </Grid>
        </>
      )}

      <Grid xs={10} item>
        <FormInfoItems
          items={[
            { label: 'Numar camion:', name: counter?.truckNumber },
            { label: 'Numar suporti scanati:', name: counter?.counter }
          ]}
        />
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Finalizeaza"
          onClick={() => {
            counter.counter != counter.supportNumber
              ? setIsAlertOpen(true)
              : navigate(URLS.AUTH_EXPECTED_TRUCKS_STEP5, {
                  state: { truckId }
                })
          }}
          style={{ width: '100%' }}
        />
      </Grid>
      <AlertModal
        open={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        title={'Atentie'}
        description={`Ati scanat ${counter.counter} suporti din ${counter.supportNumber} asteptati.`}
        buttons={[
          { label: 'Mai verific', onClick: () => setIsAlertOpen(false), color: 'primary' },
          {
            label: 'Am terminat',
            onClick: () =>
              navigate(URLS.AUTH_EXPECTED_TRUCKS_STEP5, {
                state: { truckId }
              }),
            color: 'primary'
          }
        ]}
      />
    </Grid>
  )
}

export default ExpectedTrucksStep3
