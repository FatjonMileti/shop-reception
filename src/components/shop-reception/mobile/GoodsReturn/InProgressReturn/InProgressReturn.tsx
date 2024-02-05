import { Grid } from '../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../admin/Common/TruckCard'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const trucks: any[] = [
  { id: 1, name: 'Camion 1', description: 'Descriere camion 1' },
  { id: 2, name: 'Camion 2', description: 'Descriere camion 2' }
]

const InProgressReturn = () => {
  const navigate = useNavigate()

  let items = [
    <TitleHeader title='RETUR ÎN CURS DE RECEPȚIE' />,
    ...trucks.map((item: any, index) => (
      <TruckCard
        key={item.id}
        onClick={() => {
          navigate(URLS.AUTH_TRUCK_DETAIL.replace(':id', item.id.toString()))
        }}
        truck={item}
      />
    ))
  ]

  if (trucks.length === 0) {
    items.push(<Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
      Nu existǎ camioane de retur în lucru.</Typography>)
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

export default InProgressReturn
