import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../shop-reception/TruckCard'
import { URLS } from '../../constants'

const list: Truck[] = [
  { id: 1, name: 'Camion 1', description: 'Descriere camion 1' }
]

const Delivery = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        VALIDARE LIVRARE
      </Typography>
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          <Grid item xs={12}>
            {list.map((item: Truck, index) => (
              <TruckCard
                key={index}
                onClick={() => {
                  navigate(URLS.AUTH_DELIVERY_DETAIL)
                }}
                truck={item}
              />
            ))}
          </Grid>
          {list.length === 0 && <Grid item xs={12}>
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
