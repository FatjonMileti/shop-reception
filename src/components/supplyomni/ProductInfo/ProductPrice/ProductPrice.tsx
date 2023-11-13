import { Box, Typography } from '@mui/material'

interface ProductPriceProps {
  totalPrice: number
  totalPriceWithoutDiscount: number
}
const ProductPrice: React.FC<ProductPriceProps> = props => {
  const { totalPrice, totalPriceWithoutDiscount } = props

  return (
    <Box>
      <Typography fontWeight="600" color="red">
        {totalPrice} lei
      </Typography>
      {totalPriceWithoutDiscount !== totalPrice && (
        <Typography
          color="grey"
          fontSize={15}
          textAlign={'center'}
          sx={{ textDecoration: 'line-through' }}
        >
          {totalPriceWithoutDiscount} lei
        </Typography>
      )}
    </Box>
  )
}

export default ProductPrice
