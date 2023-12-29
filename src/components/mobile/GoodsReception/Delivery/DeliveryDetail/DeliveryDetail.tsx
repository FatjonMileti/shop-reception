import { Grid, Container, Paper, Box } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'

const Delivery = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        VALIDARE LIVRARE
      </Typography>
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='medium' component='p'>Numǎr înmatriculare: ASDS23</Typography>
              <Typography variant='medium' component='p'>Suporți verificați: Hub Deva Abient</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='SCANARE INTEGRALǍ'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='PRODUSE SENSIBILE'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS)}
                />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='SUPORT ALEATOR'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT)}
                />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='PRODUSE ALEATOR'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT)}
                />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Delivery
