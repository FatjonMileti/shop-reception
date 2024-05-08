import { Grid } from '../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { useParams } from "react-router-dom";

const Step7 = () => {
  let { id } = useParams();

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
          style={{ width: '100%' }}
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='RESIGILEAZĂ CAMION'
          style={{ width: '100%' }}
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='RETUR AMBALAJE'
          style={{ width: '100%' }}
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
