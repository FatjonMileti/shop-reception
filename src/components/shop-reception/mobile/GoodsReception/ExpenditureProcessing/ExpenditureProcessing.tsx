import { Grid, Container, Box, Paper } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { TruckCard } from '../../../admin/Common/TruckCard'

const trucks: Truck[] = [
  { id: 1, name: 'FD', description: '12-12-2023 14:01' },
  { id: 2, name: '55', description: '12-12-2023 14:01' },
  { id: 3, name: '75', description: '12-12-2023 14:01' }
]

const ExpenditureProcessing = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='ÎN PROCESARE EXPEDIȚIE' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          {trucks.length === 0 && <Grid item xs={12}>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
                existǎ camioane în lucru</Typography>
            </Box>
          </Grid>}
          <Grid item xs={12}>
            {trucks.map((item: Truck, index) => (
              <TruckCard
                key={index}
                onClick={() => {
                  navigate(URLS.AUTH_SUPPORT_CODE)
                }}
                truck={item} />
            ))}
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ExpenditureProcessing
