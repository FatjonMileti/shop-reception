import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { CircularProgress, Grid } from '@mui/material'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'
import { Autocomplete, Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import ImageUpload from 'components/shop-reception/mobile/Common/ImageUpload/ImageUpload'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useFormik } from 'formik'
import { URLS } from 'components/shop-reception/mobile/constants'
import { toBoolean } from 'utils/helpers'
import { useState } from 'react'

const ExpectedDepositReturnsStep1 = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const truck = location.state.item
  const [uploadedImages, setUploadedImages] = useState(0)

  const { data, isLoading: isTruckLoading } = useQuery(
    ['truck'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/truck/deposit/return/getTruckById/${truck.id}`
      )
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

  const confirmTruck = async (values: any) => {
    const payload = values.noticeList.map(notice => ({
      hubName: notice.hubName,
      id: notice.id,
      noticeNumber: notice.noticeNumber,
      shopCode: notice.shopCode,
      shopName: notice.shopName,
      truckId: notice.truckId
    }))

    await makeCorePostRequest(
      `/shop-reception-mobile/truck/deposit/return/verifyNoticeList`,
      payload
    )
    await makeCorePostRequest(`/shop-reception-mobile/truck/deposit/return/confirmTruck`, values)
  }

  const { isLoading, mutate } = useMutation(confirmTruck, {
    onSuccess: res => {
      showNotification({
        message: `Confirmat`,
        type: 'success'
      })
      navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_2, { state: { item: truck } })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
      navigate(URLS.AUTH_DEPOSIT_EXPECTED_RETURNS_STEP_2, { state: { item: truck } })
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: data,
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isTruckLoading && typeof formik.values === 'undefined') {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      {formik.values?.sealList.map((seal, index) => (
        <>
          <Grid xs={8} item>
            <Autocomplete
              variant="outlined"
              label={`Confirma sigiliu ${seal.id}`}
              disableClearable
              options={[
                { label: 'Da', value: 'true' },
                { label: 'Nu', value: 'false' }
              ]}
              onChange={(event, option) =>
                formik.setFieldValue(`sealList[${index}].conform`, toBoolean(option.value))
              }
              defaultValue={
                seal.conform ? { label: 'Da', value: 'true' } : { label: 'Nu', value: 'false' }
              }
            />
          </Grid>

          <Grid xs={2} item display="flex" justifyContent={'center'} alignItems={'center'}>
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/deposit/return/upload/return_truck_deposit_seal/${truck?.id}`}
              onSuccess={() => {
                showNotification({
                  message: `Imaginea a fost incarcata cu succes.`,
                  type: 'success'
                })

                setUploadedImages(prev => prev + 1)
              }}
              onError={() =>
                showNotification({
                  message: `A aparut o eroare la incarcarea imaginii.`,
                  type: 'error'
                })
              }
              inputId={`seal-${seal?.id}`}
            />
          </Grid>
        </>
      ))}

      {formik.values?.noticeList.map((notice, index) => (
        <>
          <Grid xs={8} item>
            <Autocomplete
              variant="outlined"
              label={`Aviz ${notice.shopName} ${notice.noticeNumber}`}
              disableClearable
              options={[
                { label: 'Da', value: 'true' },
                { label: 'Nu', value: 'false' }
              ]}
              onChange={(event, option) =>
                formik.setFieldValue(`noticeList[${index}].correct`, toBoolean(option.value))
              }
              defaultValue={
                notice.correct ? { label: 'Da', value: 'true' } : { label: 'Nu', value: 'false' }
              }
            />
          </Grid>

          <Grid xs={2} item display="flex" justifyContent={'center'} alignItems={'center'}>
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/deposit/return/upload/return_truck_deposit_notice/${truck?.id}`}
              onSuccess={() => {
                showNotification({
                  message: `Imaginea a fost incarcata cu succes.`,
                  type: 'success'
                })
                setUploadedImages(prev => prev + 1)
              }}
              onError={() =>
                showNotification({
                  message: `A aparut o eroare la incarcarea imaginii.`,
                  type: 'error'
                })
              }
              inputId={`notice-${notice?.id}`}
            />
          </Grid>

          {!notice.correct && (
            <Grid xs={10} item>
              <Input
                type="text"
                label={`Numar corect aviz ${notice.shopName}`}
                variant="outlined"
                value={notice.correctNoticeNumber || ''}
                onChange={event =>
                  formik.setFieldValue(
                    `noticeList[${index}].correctNoticeNumber`,
                    (event.target as HTMLInputElement).value
                  )
                }
                width="100%"
              />
            </Grid>
          )}
        </>
      ))}

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Pasul urmator"
          onClick={() => {
            formik.handleSubmit()
          }}
          style={{ width: '100%' }}
          disabled={
            uploadedImages < formik.values?.sealList.length + formik.values?.noticeList.length
          }
        />
      </Grid>
    </Grid>
  )
}

export default ExpectedDepositReturnsStep1
