import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'

const Step6 = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <Input
          type='text'
          label='Număr sigiliu'
          variant='standard'
          width='100%'
        />,
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
          disabled
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step6
