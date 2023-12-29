import { Grid, Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'

const rows = [
  { title: 'ORADEA2' },
]

const ExpectedReturnDetailStep2 = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        RETURURI AȘTEPTATE CAMION
      </Typography>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='medium' component='p'>IF32KTL / ABCD</Typography>
              <Typography variant='medium' component='p'>ORADEA2 (25)</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='medium' component='h4'>Descărcare stive</Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>MAGAZIN</TableCell>
                      <TableCell align='center'>NUMĂR STIVE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.title}
                      >
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.title}</Typography>
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Input
                            type='text'
                            variant='standard'
                            width='100%'
                            value='0'
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid container style={{ marginTop: '20px' }} spacing={2}>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='PASUL URMĂTOR'
                  onClick={() => {
                    navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_3)
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ExpectedReturnDetailStep2
