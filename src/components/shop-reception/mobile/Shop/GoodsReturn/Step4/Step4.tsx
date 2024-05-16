import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'

const Step4 = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <Input
          type='text'
          label='Număr aviz'
          variant='standard'
          width='100%'
        />,
        <Input
          type='text'
          label='Număr stive'
          variant='standard'
          width='100%'
        />,
        <>
          <Input
            type='text'
            label='Număr sigiliu'
            variant='standard'
            width='100%'
          />
          <IconButton>
            <CameraIcon />
          </IconButton>
        </>,
        <Button
          type='button'
          variant='contained'
          label='ADAUGĂ ALT SIGILIU'
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZǍ'
          onClick={null}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step4
