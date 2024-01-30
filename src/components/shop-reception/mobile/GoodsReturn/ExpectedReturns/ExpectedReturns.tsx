import { Grid } from '../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../admin/Common/TruckCard'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const trucks: Truck[] = [
  { id: 1, name: 'Camion 2', description: 'Descriere camion 2' }
]
const ExpectedReturns = () => {
  const navigate = useNavigate()
  let items = [
    <TitleHeader title='RETURURI AȘTEPTATE' />,
    trucks.map((item: Truck, index) => (
      <TruckCard
        key={index}
        onClick={() => {
          navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL)
        }}
        truck={item}
      />
    ))
  ]

  if (trucks.length === 0) {
    items.push(<Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
      Nu existǎ camioane de retur în așteptare.</Typography>)
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

export default ExpectedReturns
