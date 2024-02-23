import { Grid  } from '../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../admin/Common/TruckCard'
import { URLS } from '../../constants'

const truckList: any[] = [
  { id: 1, name: 'Camion 1', description: 'Descriere camion 1' }
]

const Delivery = () => {
  const navigate = useNavigate()

  let items = [
    <TitleHeader title='VALIDARE LIVRARE' />,
    ...truckList.map((truck: any, index) => (
      <TruckCard
        key={truck.id}
        onClick={() => {
          navigate(URLS.AUTH_DELIVERY_DETAIL)
        }}
        truck={truck}
      />
    )),
  ]

  if(truckList.length === 0){
    items.push(<Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>nu
      existǎ camioane de validat</Typography>)
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
