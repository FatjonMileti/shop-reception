import { Autocomplete, BasicTable, Button } from '@fullscreendigital/carrefour-dex-fe'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { URLS } from 'components/shop-reception/mobile/constants'
import s from '../../GoodsReception.modules.scss'
import { DeleteActionIcon } from 'icons'

const RegisterTruckStep2 = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const truckId = location.state.item.id

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

  const { data: truckBls, isLoading: isLoadingTruckBls } = useQuery(
    ['truck-bls'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/truck/hub/getTruckCreationDTOWithBlsForHub/${truckId}`
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

  const saveBlForTruck = async (values: any) => {
    return await makeCorePostRequest(`/shop-reception-mobile/truck/shop/saveBlListForTruck`, values)
  }

  const { isLoading, mutate } = useMutation(saveBlForTruck, {
    onSuccess: (res, data) => {
      showNotification({
        message: `Camionul a fost salvat cu success.`,
        type: 'success'
      })
      navigate(URLS.AUTH_EXPECTED_TRUCKS)
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
      ...truckBls,
      deliveryTicketList: []
    },
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  if (isLoadingHubName || isLoadingTruckBls || typeof formik.values === 'undefined') {
    return (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid item xs={12}>
        <Typography
          component="h2"
          variant="medium"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
          pt={2}
        >
          {hubName?.value}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          component="p"
          variant="medium"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {formik.values?.driverName}/{formik.values?.truckNumber}
        </Typography>
        <Typography
          component="p"
          variant="medium"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          Sigilii: {formik.values?.concatenatedSeals}
        </Typography>
      </Grid>

      <Grid xs={10} item>
        <Autocomplete
          variant="outlined"
          label={`Adauga bonuri de livrare`}
          disableClearable
          options={truckBls.deliveryTicketList.map(deliveryTicket => ({
            label: deliveryTicket.depositName,
            value: deliveryTicket.id
          }))}
          onChange={(event, option) => {
            const hasTicket = formik.values.deliveryTicketList.some(
              ticket => ticket.id === option.value
            )

            if (!hasTicket) {
              formik.setFieldValue('deliveryTicketList', [
                ...formik.values.deliveryTicketList,
                truckBls.deliveryTicketList.find(ticket => ticket.id === option.value)
              ])
            }
          }}
        />
      </Grid>

      <Grid xs={10} item>
        <BasicTable
          columns={[
            {
              field: 'externalTicketId',
              title: 'BL'
            },
            {
              field: 'depositName',
              title: 'Depozit'
            },
            {
              field: '',
              title: '',
              render: row => (
                <div
                  onClick={() =>
                    formik.setFieldValue(
                      'deliveryTicketList',
                      formik.values.deliveryTicketList.filter(ticket => ticket.id !== row.id)
                    )
                  }
                >
                  <DeleteActionIcon />
                </div>
              )
            }
          ]}
          rows={formik.values?.deliveryTicketList}
          containerProps={{
            className: s.basicTable
          }}
        />
      </Grid>

      <Grid xs={10} item>
        <Button
          variant="outlined"
          label="Incepe receptia"
          onClick={() =>
            navigate(URLS.AUTH_EXPECTED_TRUCKS_STEP2, { state: { item: { value: truckId } } })
          }
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid xs={10} item>
        <Button
          variant="outlined"
          label="Salvare camion"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={formik.values.deliveryTicketList.length === 0}
        />
      </Grid>
    </Grid>
  )
}

export default RegisterTruckStep2
