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

const ExpectedTrucksStep5 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const truckId = location.state.truckId

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

  const { data: summary, isLoading: isSummaryLoading } = useQuery(
    ['summary'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/support/hub/summary/${truckId}`
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

  if (isLoadingHubName || isSummaryLoading || isCounterLoading) {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Camion gol"
          onClick={() => setIsAlertOpen(true)}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Resigileaza camion"
          onClick={() => navigate(URLS.AUTH_EXPECTED_TRUCKS_STEP6, { state: { truckId: truckId } })}
          style={{ width: '100%' }}
        />
      </Grid>

      <Grid xs={10} item>
        <FormInfoItems
          items={[
            { label: 'Numar camion:', name: counter?.truckNumber },
            { label: 'Numar suporti scanati:', name: summary?.counter }
          ]}
        />
      </Grid>
      <AlertModal
        open={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        title={'Atentie'}
        description={`Camionul nu mai contine suporti de descarcat in nici o alta destinatie! Confirmati: `}
        buttons={[
          { label: 'Nu', onClick: () => setIsAlertOpen(false), color: 'primary' },
          {
            label: 'Da',
            onClick: () => navigate(URLS.AUTH_EXPECTED_TRUCKS),
            color: 'primary'
          }
        ]}
      />
    </Grid>
  )
}

export default ExpectedTrucksStep5
