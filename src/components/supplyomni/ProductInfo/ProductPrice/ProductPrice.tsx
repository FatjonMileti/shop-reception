import { Box, Typography } from '@mui/material'

interface ProductPriceProps {
  totalPrice: number;
  totalPriceWithoutDiscount: number;
  style?: any;
}
const ProductPrice: React.FC<ProductPriceProps> = props => {
  const { totalPrice, totalPriceWithoutDiscount, style } = props

  return (
    <Box style={style || {}}>
      <Typography fontWeight="600" color="#316ede" fontSize="1.2rem">
        {totalPrice} lei
      </Typography>
      {totalPriceWithoutDiscount !== totalPrice && (
        <Typography
          color="#c40000"
          fontSize={15}
          textAlign={'center'}
          sx={{ textDecoration: 'line-through' }}
        >{totalPriceWithoutDiscount} lei</Typography>
      )}
    </Box>
  )
}

export default ProductPrice
