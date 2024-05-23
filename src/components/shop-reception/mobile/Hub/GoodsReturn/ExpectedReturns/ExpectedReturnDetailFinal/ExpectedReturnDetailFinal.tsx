import { Grid } from '../../../../../Common/Grid'
import { Button, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { columns } from './helpers'

const rows = [
  { id: 'POL', title: 'POLITA ROLLS FLORI', expect: 1, downloads: 1 },
  { id: 'IND', title: 'PUTINA SOACREI', expect: 2, downloads: 2 }
]

const ExpectedReturnDetailFinal = () => {
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='RETURURI AȘTEPTATE CAMION' />,
        <>
          <Typography variant='medium' component='p'>IF32KTL / ABCD</Typography>
          <Typography variant='medium' component='p'>ORADEA2 (25)</Typography>
        </>,
        <Typography variant='medium' component='h4'>Sumar Recepție Ambalaje</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
        />,
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZĂ'
          onClick={() => {
          }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ExpectedReturnDetailFinal
