import { Grid, Container, Paper } from '@mui/material'
import { Button, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { columns } from './helpers'

const rows = [
  { id: 'POL', title: 'POLITA ROLLS FLORI', expect: 1, downloads: 1 },
  { id: 'IND', title: 'PUTINA SOACREI', expect: 2, downloads: 2 }
]

const ExpectedReturnDetailFinal = () => {

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='RETURURI AȘTEPTATE CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='medium' component='p'>IF32KTL / ABCD</Typography>
              <Typography variant='medium' component='p'>ORADEA2 (25)</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='medium' component='h4'>Sumar Recepție Ambalaje</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table
                columns={columns}
                isLoading={false}
                rows={rows}
                disablePagination={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    type='button'
                    variant='contained'
                    label='FINALIZEAZĂ'
                    onClick={() => {

                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ExpectedReturnDetailFinal
