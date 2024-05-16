import { Grid } from '../../../../Common/Grid'
import { Button, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { columns } from './helpers'

const rows = [
  {
    'packagingType': 'POLITA ROLLS FLORI (POL)',
    'amount': 1
  }
]

const Step1 = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <>
          <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
          <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>
        </>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
        />,
        <Button
          type='button'
          variant='contained'
          label='CONFIRMǍ AMBALAJE'
          onClick={null}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step1
