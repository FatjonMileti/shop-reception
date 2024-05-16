import { Grid } from '../../../../Common/Grid'
import { Button, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../../constants'
import useRoles from '../../../useRoles'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../../../Common/TitleHeader'
import { TruckCard } from '../../../../admin/Common/TruckCard'
import {makeCoreGetRequest} from "../../../../../../utils/api";
import {formatErrorMessage} from "../../../../../../utils/formatting";
import {useNotification} from "../../../../../../hooks";
import {useQuery} from "react-query";
import React from "react";

const ListTrucks = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: truckList, isLoading} = useQuery(
      'truckList',
    async () => {
        return await makeCoreGetRequest('/shop-reception-mobile/truck/list', null)
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
    <TitleHeader title='Selecteazǎ Camion' />,
    <Grid
      spacing={1}
      items={truckList.map((truck: any, index) => (
        <TruckCard
          // key={truck.id}
          onClick={() => {
            navigate(URLS.AUTH_TRUCK_DETAIL.replace(':id', truck.id.toString()))
          }}
          truck={truck}
        />
      ))}
    itemsPerRow={1}
    />,
    <Divider>SAU</Divider>
  ]

  if (isShopUser || isHubUser) {
    items.push(
      <Button
        type='button'
        variant='contained'
        label='ADAUGǍ CAMION'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_ADD_TRUCK)
        }}
      />)
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

export default ListTrucks
