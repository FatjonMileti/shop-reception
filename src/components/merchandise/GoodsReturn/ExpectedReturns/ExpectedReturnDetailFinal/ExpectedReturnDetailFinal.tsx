import { Grid, Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Button, Input, Typography, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'

const rows = [
  { id: 'POL', title: 'POLITA ROLLS FLORI', expect: 1, downloads: 1 },
  { id: 'IND', title: 'PUTINA SOACREI', expect: 2, downloads: 2 }
]

const ExpectedReturnDetailFinal = () => {

  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        RETURURI AȘTEPTATE CAMION
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
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
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'>Așteptat</TableCell>
                      <TableCell align='center'>Descărcate</TableCell>
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
                        <TableCell component='th' scope='row'>
                          <Typography variant='medium'>{row.downloads}</Typography>
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
