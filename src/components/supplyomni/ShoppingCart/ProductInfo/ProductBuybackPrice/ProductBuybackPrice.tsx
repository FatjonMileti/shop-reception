import { Box, Typography } from '@mui/material'

interface ProductBuybackPriceProps {
  quantity: number
  discountLabel: string
}
const ProductBuybackPrice: React.FC<ProductBuybackPriceProps> = props => {
  const { quantity, discountLabel } = props

  return (
    <Box
      sx={{
        backgroundColor: '#fafad2',
        textAlign: 'right',
        padding: '16px',
        margin: '16px 0'
      }}
    >
      <Typography>Cantitate buyback: {quantity}</Typography>
      <Typography sx={{ fontWeight: 600 }}>{discountLabel}</Typography>
    </Box>
  )
}

export default ProductBuybackPrice
