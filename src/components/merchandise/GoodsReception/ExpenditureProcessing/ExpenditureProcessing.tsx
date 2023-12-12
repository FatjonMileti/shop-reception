import { Grid, Container, Box, Paper } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../Common.modules.scss'
import TitleHeader from '../../TitleHeader/TitleHeader'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'

const list: Truck[] = [
  { id: 1, name: 'FD', description: '12-12-2023 14:01'},
  { id: 2, name: '55', description: '12-12-2023 14:01'},
  { id: 3, name: '75', description: '12-12-2023 14:01'},
]

const ExpenditureProcessing = () => {
  const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        ÎN PROCESARE EXPEDIȚIE
      </Typography>
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          {list.length === 0 && <Grid item xs={12}>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
                existǎ camioane în lucru</Typography>
            </Box>
          </Grid>}
          <Grid item xs={12}>
            {list.map((item: Truck, index) => (
              <Paper key={index} elevation={3} style={{ margin: '10px', padding: '20px' }} onClick={() => {
                navigate(URLS.AUTH_SUPPORT_CODE)
              }}>
                <Typography variant="medium" component="h5">{item.name}</Typography>
                <Typography variant="medium" component="p">{item.description}</Typography>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ExpenditureProcessing
