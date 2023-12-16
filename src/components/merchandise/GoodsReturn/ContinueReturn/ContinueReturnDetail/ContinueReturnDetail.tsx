import { Grid, Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'

const rows = [
  { opinion: 3424242, store: 'ORADEA 2', stacks: 2 },
  { opinion: 'Total', store: '', stacks: 2 }
]

const ContinueReturnDetail = () => {
  const navigate = useNavigate()

  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        CONTINUARE RETUR CAMION
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
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
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Numǎr Aviz</TableCell>
                      <TableCell align='center'>Magazin</TableCell>
                      <TableCell align='center'>Numǎr Stive</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.opinion}
                      >
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.opinion}</Typography>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.store}</Typography>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.stacks}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
