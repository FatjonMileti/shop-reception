import { Grid, Container, Paper, Box } from '@mui/material'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'

const DeliveryDetail = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='VALIDARE LIVRARE' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='medium' component='p'>Numǎr înmatriculare: ASDS23</Typography>
              <Typography variant='medium' component='p'>Suporți verificați: Hub Deva Abient</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box className={cs.buttonWrapper}>
              <Button
                type='button'
                variant='contained'
                label='SCANARE INTEGRALǍ'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={cs.buttonWrapper}>
              <Button
                type='button'
                variant='contained'
                label='PRODUSE SENSIBILE'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS)}
                />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={cs.buttonWrapper}>
              <Button
                type='button'
                variant='contained'
                label='SUPORT ALEATOR'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT)}
                />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={cs.buttonWrapper}>
              <Button
                type='button'
                variant='contained'
                label='PRODUSE ALEATOR'
                size='large'
                onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT)}
                />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default DeliveryDetail
