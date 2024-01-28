import { Grid } from '../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'

const BalancePackageForm = () => {
  return (
    <Grid
      items={[
        <TitleHeader title='Actualizare inventar' />,
        <Grid
          hasPaper={true}
          items={[
            <Input
              type='text'
              onChange={event => null}
              label='Magazin'
              variant='outlined'
              style={{ width: '100%' }}
              value={'ORADEA2'}
              disabled
            />,
            <Input
              type='text'
              onChange={event => null}
              label='Tip suport'
              variant='outlined'
              style={{ width: '100%' }}
              value={'PALET TIP EURO'}
              disabled
            />,
            <Input
              type='number'
              onChange={event => null}
              label='Calitativ'
              variant='outlined'
              style={{ width: '100%' }}
              value={'1'}
            />,
            <Input
              type='number'
              onChange={event => null}
              label='Defect'
              variant='outlined'
              style={{ width: '100%' }}
              value={'0'}
            />
          ]}
          itemsPerRow={4}
        />,
        <Button
          variant='contained'
          type='submit'
          size='large'
          label='Salvează'
          onClick={null}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default BalancePackageForm