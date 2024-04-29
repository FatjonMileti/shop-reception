import { Grid } from '../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../TitleHeader'

const ShippedTrucks = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='CAMIOANE EXPEDIATE' />,
        <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
          Nu existǎ camioane expediate.
        </Typography>
      ]}
      itemsPerRow={1}
    />
  )
}

export default ShippedTrucks
