import { Grid, Container, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './ConfirmReturnTrucks.modules.scss'
import TitleHeader from '../../TitleHeader/TitleHeader'

const ConfirmReturnTrucks = () => {
  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          <Grid item xs={12}>
            <Typography component='h4' variant='medium'
                        style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
              CAMIOANE RETUR CONFIRMATE
            </Typography>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>
                nu existǎ camioane confirmate</Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ConfirmReturnTrucks
