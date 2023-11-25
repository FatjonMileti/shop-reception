import { Grid, Container, Paper } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './ReceptionProcessing.modules.scss'
import TitleHeader from '../../TitleHeader/TitleHeader'

const ReceptionProcessing = () => {

  const list: Truck[] = [
    { name: 'Camion 2', description: 'Descriere camion 2' },
    { name: 'Camion 3', description: 'Descriere camion 3' }
  ]

  return (
    <Container component="main" maxWidth="xs" className={s.container}>
      <TitleHeader />
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          <Grid item xs={12}>
            {list.map((item: Truck, index) => (
              <Paper key={index} elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant="medium" component="h5">{item.name}</Typography>
                <Typography variant="medium" component="p">{item.description}</Typography>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ReceptionProcessing
