import { Grid  } from '../../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../../admin/Common/TruckCard'
import { URLS } from '../../../constants'
import {useNotification} from "../../../../../../hooks";
import {useQuery} from "react-query";
import {makeCoreGetRequest} from "../../../../../../utils/api";
import {formatErrorMessage} from "../../../../../../utils/formatting";
import React from "react";

const Delivery = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: truckList, isLoading} = useQuery(
      'validationTrucks',
      async () => {
        return await makeCoreGetRequest('/shop-reception-mobile/truck/shop/validation/list', null)
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
    <TitleHeader title='VALIDARE LIVRARE' />,
    ...truckList?.map((truck: any, index) => (
      <TruckCard
        key={truck.id}
        onClick={() => {
          navigate(URLS.AUTH_DELIVERY_DETAIL, { state: { truck } })
        }}
        truck={truck}
      />
    )),
  ]

  if(!truckList || truckList.length === 0){
    items.push(<Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
      nu existǎ camioane de validat</Typography>)
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

export default Delivery
