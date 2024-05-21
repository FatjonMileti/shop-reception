import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../Common/TitleHeader'

const Step5 = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='COMANDǍ CAMION RETUR' />,
        <Input
          type='text'
          label='Locație in...'
          variant='standard'
          width='100%'
          value={'HYPER ORADEA2'}
          readonly
        />,
        <Input
          type='select'
          label='Locație descǎrcare'
          variant='standard'
          width='100%'
        />,
        <Input
          type='number'
          label='Numǎr stive'
          variant='standard'
          width='100%'
        />,
        <Button
          type='button'
          variant='contained'
          label='TRANSMITERE COMANDǍ'
          onClick={}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step5
