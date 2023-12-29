import { Grid, Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'

const rows = [
  { id: 'POL', title: 'POLITA ROLLS FLORI', expect: 1 },
  { id: 'IND', title: 'PALET INDUSTRIAL/ATPIC 100x120', expect: 2 }
]

const ContinueReturnDetail2 = () => {
  const navigate = useNavigate()

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        CONTINUARE RETUR CAMION
      </Typography>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
                <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>
                <Typography variant='medium' component='p'>Numǎr stive: 2</Typography>
                <Typography variant='medium' component='p'>ORADEA - 324423</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='medium' component='h4'>Sumar Ambalaje</Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Tip Ambalaje</TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'>Numǎr Ambalaje</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                      >
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.id}</Typography>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.title}</Typography>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.expect}</Typography>
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
                      navigate(URLS.AUTH_CONTINUE_RETURN_DETAIL_FINAL)
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

export default ContinueReturnDetail2
