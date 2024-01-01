import { Container, Grid, Paper } from '@mui/material'
import cs from '../../../../Common.modules.scss'
import { TitleHeader } from '../../../../TitleHeader'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../../../constants'
import { useNavigate } from 'react-router-dom'

const DeliveryCompleteScan = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='VALIDARE LIVRARE SCANARE INTEGRALǍ' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ margin: '10px', padding: '20px' }} onClick={() => {
              navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_1)
            }}>
              <Typography variant='medium' component='p'>SCANARE INTEGRALǍ</Typography>
              <Typography variant='medium' component='p'>Număr înmatriculare: BA32489</Typography>
              <Typography variant='medium' component='p'>Suporți verificați: 0 / 4</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='medium' component='p'>BL: 545465</Typography>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default DeliveryCompleteScan