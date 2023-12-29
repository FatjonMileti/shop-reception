import { Grid, Container, Table, TableContainer, Paper, TableHead, TableCell, TableBody, TableRow } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'

const rows = [
  { title: 'Suport inexistent' },
  { title: 'PALET EURO' },
  { title: 'PALET TIP EURO' },
  { title: 'PALET INDUSTRIAL/ATIPIC 100x120' },
  { title: 'PALET CHEP' },
  { title: 'ROLLS CHEP' },
  { title: 'ROLLS CU GRATAR' },
  { title: 'PALET DUSSELDORF' },
  { title: 'ROLLS FLORI' },
  { title: 'BOX LEMN' },
  { title: 'PALET CHEP PLASTIC 80x120' },
  { title: 'PALET PLASTIC' },
  { title: 'PALET CHEP JUMATATE 80x60' },
  { title: 'BOX PLASTIC' },
  { title: 'BOX METALIC' }
]

const ApproveTruck = () => {
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        Cod Suport
      </Typography>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>TIP AMBALAJ</TableCell>
                      <TableCell align='center'>CANTITATE</TableCell>
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
            <Grid item xs={12}>
              <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='CONFIRMĂ AMBALAJE'
                  onClick={() => null}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ApproveTruck
