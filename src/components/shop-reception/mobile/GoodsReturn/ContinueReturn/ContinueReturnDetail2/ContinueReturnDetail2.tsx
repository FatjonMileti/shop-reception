import { Grid } from '../../../../Common/Grid'
import { Button, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { columns } from './helpers'
import React from 'react'

const rows = [
  { packageType: 'POL', title: 'POLITA ROLLS FLORI', expect: 1 },
  { packageType: 'IND', title: 'PALET INDUSTRIAL/ATPIC 100x120', expect: 2 }
]

const ContinueReturnDetail2 = () => {
  const navigate = useNavigate()

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='CONTINUARE RETUR CAMION' />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>,
            <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>,
            <Typography variant='medium' component='p'>Numǎr stive: 2</Typography>,
            <Typography variant='medium' component='p'>ORADEA - 324423</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Typography variant='medium' component='h4'>Sumar Ambalaje</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
        />,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          onClick={() => {
            navigate(URLS.AUTH_CONTINUE_RETURN_DETAIL_FINAL)
          }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ContinueReturnDetail2
