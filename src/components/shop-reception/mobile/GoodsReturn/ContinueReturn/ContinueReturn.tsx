import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../admin/Common/TruckCard'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const trucks: Truck[] = [
  { id: 1, name: 'Camion 1', description: 'Descriere camion 1' }
]

const ContinueReturn = () => {
  const navigate = useNavigate()

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='CONTINUARE RETUR' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            {trucks.map((truck: Truck, index) => (
              <TruckCard
                key={truck.id}
                onClick={() => {
                  navigate(URLS.AUTH_CONTINUE_RETURN_DETAIL)
                }}
                truck={truck}
              />
            ))}
          </Grid>
          {trucks.length === 0 && <Grid item xs={12}>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
                existǎ camioane de retur în lucru.</Typography>
            </Box>
          </Grid>}
        </Grid>
      </form>
    </Container>
  )
}

export default ContinueReturn
