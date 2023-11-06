import { Box } from '@mui/material'
import s from '../../ShoppingCart.modules.scss'
import { Remove, Add } from '@mui/icons-material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'

interface ProductQuantityProps {
  quantity: number
  id: string
  updateCartMutation: Function
}
const ProductQuantity: React.FC<ProductQuantityProps> = props => {
  const { quantity, id, updateCartMutation } = props

  return (
    <Box className={s.cartContainer}>
      <Button onClick={() => updateCartMutation({ quantity: quantity - 1, id })} label="">
        <Remove />
      </Button>
      <Input
        type={'text'}
        variant={'outlined'}
        defaultValue={`${quantity}`}
        width="64px"
        onBlur={(event: any) => updateCartMutation({ quantity: event.target.value, id })}
      />
      <Button onClick={() => updateCartMutation({ quantity: quantity + 1, id })} label="">
        <Add />
      </Button>
    </Box>
  )
}

export default ProductQuantity
