import { Autocomplete, BasicTable, Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotification } from '../../../../../../../hooks'
import { useState } from 'react'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { useMutation, useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../../utils/api'
import { URLS } from '../../../../constants'
import { CircularProgress, Grid } from '@mui/material'
import { DeleteActionIcon } from 'icons'
import s from '../../GoodsReception.modules.scss'

const RegisterTruckStep2 = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()

  const { truckId } = location.state

  const { data: truckBls, isLoading: isLoadingTruckBls } = useQuery(
    ['truck-bls'],
    async () => {
      const response = await makeCoreGetRequest(
        `/shop-reception-mobile/truck/hub/truck-creation-with-bls-for-hub/${truckId}`
      )
      return response || []

      // const data = {
      //   ...response,
      //   deliveryTicketList: [
      //     {
      //       id: 0,
      //       externalTicketId: 'string',
      //       depositName: 'string',
      //       externalTicketIdDepositName: 'string',
      //       transportCode: 'string',
      //       date: '2024-07-22'
      //     }
      //   ]
      // }

      // return data
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
    return await makeCorePostRequest(`/shop-reception-mobile/truck/shop/save-bls-for-truck`, values)
  }

  const { isLoading: isLoadingSaveBl, mutate } = useMutation(saveBlForTruck, {
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

  if (isLoadingTruckBls || isLoadingSaveBl) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <TitleHeader title="" />
      <Grid xs={10} item display="flex" justifyContent="center">
        <Typography
          component="h4"
          variant="medium"
          style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}
        >
          {truckBls.truckNumber} / {truckBls.driverName}
        </Typography>
      </Grid>

      <Grid xs={10} item display="flex" justifyContent="center">
        <Typography
          component="h4"
          variant="medium"
          style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}
        >
          Sigilii: {truckBls.concatenatedSeals}
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
          disabled={formik.values.deliveryTicketList.length === 0}
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
