import { Grid, Container, Paper } from '@mui/material'
import { Button, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { columns } from './helpers'

const rows = [
  { warehouseName: 3424242, store: 'ORADEA 2', deliverySlip: 2 },
  { warehouseName: 'Total', store: '', deliverySlip: 2 }
]

const ContinueReturnDetail = () => {
  const navigate = useNavigate()

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='CONTINUARE RETUR CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
                <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='medium' component='h4'>Sumar Avize</Typography>
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
                    label='PASUL URMǍTOR'
                    onClick={() => {
                      navigate(URLS.AUTH_CONTINUE_RETURN_DETAIL_2)
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

export default ContinueReturnDetail
