import { Grid } from '../../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useNotification } from "../../../../../../hooks";
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { TruckCard } from "../../../../admin/Common/TruckCard";
import React from "react";
import { URLS } from "../../../constants";
import { useNavigate } from "react-router-dom";

const ShippedTrucks = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: trucks, isLoading } = useQuery(
    'registeredTrucks',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/registered/list', null)
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
    <TitleHeader title='CAMIOANE EXPEDIATE' />,
    ...trucks.map((item: any, index) => (
      <TruckCard
        key={index}
        onClick={() => {
          // navigate(URLS.AUTH_SUPPORT_SCAN_STEP_1, { state: { item } })
        }}
        truck={item} />
    ))
  ]

  if (trucks.length === 0) {
    items.push(
      <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
        Nu existǎ camioane expediate.</Typography>
    )
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

export default ShippedTrucks
