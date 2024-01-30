import { Grid } from '../../../Common/Grid'
import { Button, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../constants'
import useRoles from '../../useRoles'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../admin/Common/TruckCard'

const ListTrucks = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()

  const trucks: Truck[] = [
    { id: 1, name: 'Camion 1', description: 'Descriere camion 1' },
    { id: 2, name: 'Camion 2', description: 'Descriere camion 2' },
    { id: 3, name: 'Camion 3', description: 'Descriere camion 3' }
  ]

  let items = [
    <TitleHeader title='Selecteazǎ Camion' />,
    <Grid
      spacing={1}
      items={trucks.map((truck: Truck, index) => (
        <TruckCard
          key={truck.id}
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
