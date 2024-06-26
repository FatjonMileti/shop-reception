import { Grid } from '../../../../Common/Grid'
import { TitleHeader } from '../../../Common/TitleHeader'
import { URLS } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../../admin/Common/TruckCard'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import React from 'react'
import { useNotification } from '../../../../../../hooks'
import { Typography } from '@mui/material'

const ReceptionProcessing = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const {
    data: truckList,
    isLoading,
    isError
  } = useQuery(
    'inProgressTrucks',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/shop/in-progress', null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching trucks. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <Typography
        variant="light"
        component="p"
        style={{ textAlign: 'center', textTransform: 'uppercase' }}
      >
        A aparut o eroare la obtinerea datelor.
      </Typography>
    )
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="Procesarea Recepției" />,
        ...(truckList?.length > 0
          ? truckList?.map((item: any) => (
              <TruckCard
                key={item.id}
                onClick={() => {
                  navigate(URLS.AUTH_SUPPORT_SCAN_STEP_1, { state: { item } })
                }}
                truck={item}
              />
            ))
          : [
              <div key="no-trucks" style={{ textAlign: 'center' }}>
                Nu există camioane în lucru.
              </div>
            ])
      ]}
      itemsPerRow={1}
    />
  )
}

export default ReceptionProcessing
