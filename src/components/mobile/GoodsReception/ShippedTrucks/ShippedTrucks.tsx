import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'

const ShippedTrucks = () => {
  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='CAMIOANE EXPEDIATE' />
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
                existǎ camioane expediate.</Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ShippedTrucks
