import { Grid, Container, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../shop-reception/TruckCard'
import { URLS } from '../../constants'

const truckList: Truck[] = [
  { id: 1, name: 'Camion 1', description: 'Descriere camion 1' }
]

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
            {truckList.map((truck: Truck, index) => (
              <TruckCard
                key={truck.id}
                onClick={() => {
                  navigate(URLS.AUTH_DELIVERY_DETAIL)
                }}
                truck={truck}
              />
            ))}
          </Grid>
          {truckList.length === 0 && <Grid item xs={12}>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>nu
                existǎ camioane de validat</Typography>
            </Box>
          </Grid>}
        </Grid>
      </form>
    </Container>
  )
}

export default Delivery
