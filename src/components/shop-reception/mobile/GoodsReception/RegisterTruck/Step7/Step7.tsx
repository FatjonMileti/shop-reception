import { Grid } from '../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'

const Step7 = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <Button
          type='button'
          variant='contained'
          label='CAMION GOL'
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='RESIGILEAZĂ CAMION'
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='RETUR AMBALAJE'
          onClick={null}
          disabled
        />,
        <>
          <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
          <Typography variant='medium' component='p'>Numǎr suporți scanați: 1</Typography>
        </>
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step7
