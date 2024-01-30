import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography, Divider } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'

const Step3 = () => {
  let items = [
    <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
      <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>
    </>,
    <>
      <Input
        type='text'
        label='Scanează tip ambalaj'
        variant='standard'
        width='100%'
      />
      <IconButton>
        <ManageSearchIcon />
      </IconButton>
    </>,
    <Divider>
      SAU
    </Divider>,
    <Button
      type='button'
      variant='contained'
      label='SCANEAZǍ TIP AMBALAJ'
      onClick={null}
    />,
    <Input
      type='text'
      label='Tip ambalaj'
      variant='standard'
      width='100%'
    />,
    <Input
      type='text'
      label='Număr ambalaje'
      variant='standard'
      width='100%'
    />,
    <Button
      type='button'
      variant='contained'
      label='PASUL URMǍTOR'
      onClick={null}
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

export default Step3
