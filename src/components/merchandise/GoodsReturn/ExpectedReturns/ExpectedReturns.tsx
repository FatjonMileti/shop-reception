import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../Common.modules.scss'
import { TitleHeader } from '../../TitleHeader'

const ExpectedReturns = () => {
  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        RETURURI AȘTEPTATE
      </Typography>
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          <Grid item xs={12}>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
                existǎ camioane de retur în așteptare.</Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ExpectedReturns
