import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../shop-reception/TruckCard'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const list: Truck[] = [
  { id: 1, name: 'Camion 2', description: 'Descriere camion 2' },
]
const ExpectedReturns = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        RETURURI AȘTEPTATE
      </Typography>
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          {list.map((item: Truck, index) => (
            <Grid item xs={12}>
              <TruckCard
                key={index}
                onClick={() => {
                  navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL)
                }}
                truck={item}
              />
            </Grid>
          ))}
          {list.length === 0 && <Grid item xs={12}>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
                existǎ camioane de retur în așteptare.</Typography>
            </Box>
          </Grid>}
        </Grid>
      </form>
    </Container>
  )
}

export default ExpectedReturns
