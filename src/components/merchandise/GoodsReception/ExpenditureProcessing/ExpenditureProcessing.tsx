import { Grid, Container, Paper, Box } from '@mui/material'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './ExpenditureProcessing.modules.scss'
import { URLS } from '../../constants'
import useRoles from '../../useRoles'

const ExpenditureProcessing = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()

  const getTitle = () => {
    if (isShopUser) {
      return 'Hyper Oradea'
    } else if (isHubUser) {
      return 'HUB CLUJ'
    } else if (isWareHouseUser) {
      return 'DEPOZIT CEFIN AMBIENT'
    }
    return 'Nu'
  }

  return (
    <Container component="main" maxWidth="xs" className={s.container}>
      <Typography component="h3" variant="regular" style={{ textAlign: 'center', textTransform: 'uppercase' }}>Carrefour
        Operațional</Typography>
      <Typography component="h2" variant="medium" style={{ textAlign: 'center', textTransform: 'uppercase' }}>
        {getTitle()}
      </Typography>
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          <Grid item xs={12}>
            <Typography component="h4" variant="medium"
                        style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
              ÎN PROCESARE EXPEDIȚIE
            </Typography>
            <Box style={{ margin: '10px', padding: '20px' }}>
              <Typography variant="light" component="p" style={{ textAlign: 'center', textTransform: 'uppercase' }}>Nu
                existǎ camioane în lucru</Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ExpenditureProcessing
