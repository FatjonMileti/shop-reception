import { Box, Typography, Grid, Divider } from '@mui/material'

const ShoppingCartSummary = (props:any) => {

  const {order, client, deliveryPayment, sx} = props;

  return <Box sx={sx}>
            <>
            <Typography sx={{fontSize:'1.1rem', color:'#052351'}}>Sumar comanda</Typography>
            <Divider sx={{color:'#cecece', mt:1, mb:1}} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Produse comandate:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Cost produse:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Discount Total:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Total TVA:</Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{order?.summary?.totalItems || 'N/A'}</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{order?.summary?.totalPrice || 'N/A'} lei</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>- lei</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>- lei</Box>
              </Grid>
            </Grid>
            <Divider sx={{color:'#cecece', mt:1, mb:1}} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'left', fontSize:'1.1rem', fontWeight:'600', color:'#052351', lineHeight:'30px'}}>Total de plata:</Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'right', fontSize:'1.1rem', fontWeight:'600', color:'#052351', lineHeight:'30px'}}>{order?.summary?.totalPrice || 'N/A'} RON</Box>
              </Grid>
            </Grid>
            </>
            {(client?.name) &&
            <Box style={{paddingTop:'24px'}}>
              <Typography sx={{fontSize:'1.1rem', color:'#052351'}}>Detalii client</Typography>
              <Divider sx={{color:'#cecece', mt:1, mb:1}} />
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Nume:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>CUI:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Adresa:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Email:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Telefon:</Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{client?.name || 'N/A'}</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{client?.cif || 'N/A'}</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{client?.address?.fullAddress || 'N/A'}</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{client?.email || 'N/A'}</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{client?.phone || 'N/A'}</Box>
              </Grid>
            </Grid>
            </Box>
            }
            {(deliveryPayment?.paymentMethod || deliveryPayment?.deliveryType) &&
            <Box style={{paddingTop:'24px'}}>
              <Typography sx={{fontSize:'1.1rem', color:'#052351'}}>Detalii plata si livrare</Typography>
              <Divider sx={{color:'#cecece', mt:1, mb:1}} />
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Metoda de plata:</Box>
                <Box sx={{textAlign: 'left', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>Tip livrare:</Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{deliveryPayment?.paymentMethod || 'N/A'}</Box>
                <Box sx={{textAlign: 'right', fontSize:'0.9rem', color:'#727272', lineHeight:'30px'}}>{deliveryPayment?.deliveryType || 'N/A'}</Box>
              </Grid>
            </Grid>
            </Box>
            }
          </Box>
}

export default ShoppingCartSummary
