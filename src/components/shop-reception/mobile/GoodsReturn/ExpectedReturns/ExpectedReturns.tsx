import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { TruckCard } from '../../../admin/TruckCard'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const trucks: Truck[] = [
  { id: 1, name: 'Camion 2', description: 'Descriere camion 2' },
]
const ExpectedReturns = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='RETURURI AȘTEPTATE' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          {trucks.map((item: Truck, index) => (
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
          {trucks.length === 0 && <Grid item xs={12}>
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
