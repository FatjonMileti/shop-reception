import { Grid } from '../../../Common/Grid'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../TitleHeader'

const ConfirmReturnTrucks = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='CAMIOANE RETUR CONFIRMATE' />,
        <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
          nu existǎ camioane confirmate</Typography>
      ]}
      itemsPerRow={1}
    />
  )
}

export default ConfirmReturnTrucks
