import { Box, Container, Grid, Paper } from '@mui/material'
import cs from '../../../../Common.modules.scss'
import { TitleHeader } from '../../../../TitleHeader'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { URLS } from '../../../../constants'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SensitiveProduct } from '../../../SensitiveProduct'

const sensitiveProducts: SensitiveProduct[] = [
  {
    id: 1,
    storeType: 'B1',
    storeCode: 'CRAIOVA (3054)',
    storeName: 'CRAIOVA (3054)',
    district: 'DEPOZIT BRAZI NON FOOD',
    family: 'PH01DEP',
    subfamily: 'DEPOZITBRA',
    UbCode: '3095940',
    productCode: '256822'
  }
]

const DeliverySensitiveProducts = () => {
  const navigate = useNavigate()
  return <Container component='main' maxWidth='xs' className={cs.container}>
    <TitleHeader />
    <Typography component='h4' variant='medium'
                style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
      PRODUSE SENSIBILE VALIDARE LIVRARE
    </Typography>
    <form>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
            <Typography variant='medium' component='h5'>PRODUSE SENSIBILE</Typography>
            <Typography variant='medium' component='p'>Număr înmatriculare: BL75876</Typography>
            <Typography variant='medium' component='p'>Suporți verificați: 0 / 1</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {sensitiveProducts.map((item: SensitiveProduct, index) => (
            <SensitiveProduct onClick={() => {
              navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS_CONFIRM)
            }} item={item} />
          ))}
        </Grid>
        {sensitiveProducts.length === 0 && <Grid item xs={12}>
          <Box style={{ margin: '10px', padding: '20px' }}>
            <Typography variant='light' component='p' style={{ textAlign: 'center', textTransform: 'uppercase' }}>nu
              existǎ camioane de validat</Typography>
          </Box>
        </Grid>}
      </Grid>
    </form>
  </Container>
}

export default DeliverySensitiveProducts