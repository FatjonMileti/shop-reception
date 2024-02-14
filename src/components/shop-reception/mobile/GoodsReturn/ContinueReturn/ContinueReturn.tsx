import { Grid } from '../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../admin/Common/TruckCard'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const trucks: any[] = [
  { id: 1, name: 'Camion 1', description: 'Descriere camion 1' }
]

const ContinueReturn = () => {
  const navigate = useNavigate()

  let items = [
    <TitleHeader title='CONTINUARE RETUR' />,
    ...trucks.map((truck: any, index) => (
      <TruckCard
        key={truck.id}
        onClick={() => {
          navigate(URLS.AUTH_CONTINUE_RETURN_DETAIL)
        }}
        truck={truck}
      />
    ))
  ]

  if (trucks.length === 0) {
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
