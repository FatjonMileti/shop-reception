import { Autocomplete, Button } from '@fullscreendigital/carrefour-dex-fe'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import { URLS } from 'components/shop-reception/mobile/constants'

const ExpectedTrucks = () => {
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

  const { data: trucksOptions, isLoading: isTruckOptionsLoading } = useQuery(
    ['expected-trucks'],
    async () => {
      const response = await makeCoreGetRequest(`/shop-reception-mobile/truck/hub/search/list`)
      const options = response.map(truck => ({
        label: truck.truckNumber,
        value: truck.id
      }))

      return options
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

  if (isLoadingHubName || isTruckOptionsLoading) {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="medium"
        style={{ textAlign: 'center', textTransform: 'uppercase' }}
        pt={2}
      >
        {hubName.value}
      </Typography>

      <Grid xs={10} item>
        <Autocomplete
          variant="outlined"
          label={`Selecteaza camion`}
          disableClearable
          options={trucksOptions || []}
          // onChange={(event, option) =>
          //   formik.setFieldValue(`sealList[${index}].conform`, toBoolean(option.value))
          // }
        />
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Confirma camion"
          onClick={() => () => {}}
          style={{ width: '100%' }}
          disabled={true}
        />
      </Grid>
      <Grid xs={10} item>
        <Button
          variant="contained"
          label="Adauga camion"
          onClick={() => {
            navigate(URLS.AUTH_REGISTER_TRUCK, { state: { item: trucksOptions } })
          }}
          style={{ width: '100%' }}
        />
      </Grid>
    </Grid>
  )
}

export default ExpectedTrucks
