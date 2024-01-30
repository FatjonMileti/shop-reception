import { Grid } from '../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../admin/Common/TruckCard'

const trucks: Truck[] = [
  { id: 1, name: 'FD', description: '12-12-2023 14:01' },
  { id: 2, name: '55', description: '12-12-2023 14:01' },
  { id: 3, name: '75', description: '12-12-2023 14:01' }
]

const ExpenditureProcessing = () => {
  const navigate = useNavigate()
  let items = [
    <TitleHeader title='ÎN PROCESARE EXPEDIȚIE' />,
    ...trucks.map((item: Truck, index) => (
      <TruckCard
        key={index}
        onClick={() => {
          navigate(URLS.AUTH_SUPPORT_CODE)
        }}
        truck={item} />
    ))
  ]

  if(trucks.length === 0){
    items.push(
      <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
        Nu existǎ camioane în lucru</Typography>
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

export default ExpenditureProcessing
