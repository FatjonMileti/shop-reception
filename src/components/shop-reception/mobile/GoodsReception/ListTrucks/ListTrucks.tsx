import { Grid } from '../../../Common/Grid'
import { Button, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../constants'
import useRoles from '../../useRoles'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../admin/Common/TruckCard'
import {useEffect, useState} from "react";
import {makeCoreGetRequest} from "../../../../../utils/api";
import {formatErrorMessage} from "../../../../../utils/formatting";
import {useNotification} from "../../../../../hooks";

const ListTrucks = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [truckList, setTruckList] = useState([]);

  // const trucks: any[] = [
  //   { id: 1, name: 'Camion 1', description: 'Descriere camion 1' },
  //   { id: 2, name: 'Camion 2', description: 'Descriere camion 2' },
  //   { id: 3, name: 'Camion 3', description: 'Descriere camion 3' }
  // ]

  const getTrucks = (): any => {
    return makeCoreGetRequest('/rm-api/truck/list', null)
  }

  useEffect(() => {
      getTrucks()
          .then(trucks => {
              setTruckList(trucks);
          })
          .catch(error => {
              showNotification({
                  message: `Error while fetching data. ${formatErrorMessage(error)}`,
                  type: 'error'
              })
          });
  }, [])

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
