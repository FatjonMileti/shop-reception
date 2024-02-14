import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { FlexCenter } from '../../../../Common/FlexCenter'

const Step4 = () => {
  let items = [
    <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
      <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>
    </>,
    <FlexCenter>
      <Input
        type='text'
        label='Scanează tip ambalaj'
        variant='standard'
        width='100%'
      />
      <IconButton>
        <ManageSearchIcon />
      </IconButton>
    </FlexCenter>,
    <Divider>
      SAU
    </Divider>,
    <Button
      type='button'
      variant='contained'
      label='SCANEAZǍ TIP AMBALAJ'
      onClick={null}
    />,
    <Button
      type='button'
      variant='contained'
      label='PASUL URMǍTOR - SUMAR'
      onClick={null}
      disabled
    />
  ]

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default Step4
