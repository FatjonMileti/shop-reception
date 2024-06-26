import { Grid } from '../../../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from "../../../../Common/TitleHeader";
import { TruckCard } from '../../../../../admin/Common/TruckCard'
import { URLS } from '../../../../constants'
import { useNavigate } from 'react-router-dom'
import { useNotification } from "../../../../../../../hooks";
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import React from "react";



const ContinueReturn = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: truckList, isLoading} = useQuery(
    'continueReturnTrunks',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/in-progress', null)
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
    return <div>Loading...</div>;
  }

  let items = [
    <TitleHeader title='CONTINUARE RETUR' />,
    !!truckList && truckList.map((truck: any, index) => (
      <TruckCard
        key={truck.id}
        onClick={() => {
          navigate(`${URLS.AUTH_RECORD_RETURN_STEP_2}?id=${truck.id }`)
        }}
        truck={truck}
      />
    ))
  ]

  if (!truckList) {
    items.push(<Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
      existǎ camioane de retur în lucru.</Typography>)
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default ContinueReturn