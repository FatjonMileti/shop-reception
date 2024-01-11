import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../shop-reception/TruckCard'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const trucks: Truck[] = [
  { id: 1, name: 'Camion 1', description: 'Descriere camion 1' },
  { id: 2, name: 'Camion 2', description: 'Descriere camion 2' }
]

const InProgressReturn = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='RETUR ÎN CURS DE RECEPȚIE' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            {trucks.map((item: Truck, index) => (
              <TruckCard
                key={item.id}
                onClick={() => {
                  navigate(URLS.AUTH_TRUCK_DETAIL.replace(':id', item.id.toString()))
                }}
                truck={item}
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

export default InProgressReturn
