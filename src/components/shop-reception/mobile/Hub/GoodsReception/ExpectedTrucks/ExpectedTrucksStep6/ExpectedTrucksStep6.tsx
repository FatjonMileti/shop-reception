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
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import AlertModal from 'components/shop-reception/mobile/Common/AlertModal/AlertModal'

const ExpectedTrucksStep6 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const [uploadedImages, setUploadedImages] = useState(null)

  const truckId = location.state.truckId

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

  const saveTruck = async (values: any) => {
    return await makeCorePostRequest(`/shop-reception-mobile/truck/shop/save`, values)
  }

  const { isLoading, mutate } = useMutation(saveTruck, {
    onSuccess: (res, data) => {
      showNotification({
        message: `Transportul a fost salvat cu success.`,
        type: 'success'
      })
      navigate('/')
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: { id: truckId, sealList: [{ code: null }] },
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isLoadingHubName || isCounterLoading) {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      {formik.values.sealList.map((seal, index) => (
        <>
          <Grid xs={8} item>
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
          <Grid xs={2} item display="flex" justifyContent={'center'} alignItems={'center'}>
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/hub/upload/off/${truckId}`}
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
            />
          </Grid>

          <Grid xs={10} item>
            <Button
              variant="outlined"
              label="Scaneaza sigiliu"
              onClick={() => {}}
              style={{ width: '100%' }}
            />
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
          label="Finalizeaza"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={
            formik.values.sealList.length !== uploadedImages ||
            formik.values.sealList.some(seal => seal.code == null)
          }
        />
      </Grid>
    </Grid>
  )
}

export default ExpectedTrucksStep6
