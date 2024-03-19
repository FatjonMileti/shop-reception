import { Box, Stack, TextField } from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'

interface ProductQuantityProps {
  quantity: number
  id: string
  purchaseOption: string
  updateCartMutation: Function
  locationId: number
}
const ProductQuantity: React.FC<ProductQuantityProps> = props => {
  const { quantity, id, purchaseOption, updateCartMutation, locationId } = props

  return (
    <Stack direction="row" spacing={{ xs: 0, sm: 0, md: 0 }}>
      <Button
        style={{ minWidth: '30px' }}
        onClick={() =>
          updateCartMutation({ quantity: quantity - 1, id, purchaseOption, locationId })
        }
        label=""
      >
        <Remove />
      </Button>
      <Box textAlign={'center'}>
        <TextField
          onBlur={(event: any) =>
            updateCartMutation({ quantity: event.target.value, id, purchaseOption, locationId })
          }
          sx={{
            textAlign: 'center',
            width: '64px',
            lineHeight: '30px',
            heightLast: '46px',
            textAlignLast: 'center',
            p: 0,
            '& .MuiOutlinedInput-input': { padding: 1 }
          }}
          id="outlined-basic"
          variant="outlined"
          value={`${quantity}`}
        />
        <Box style={{ fontSize: '10px' }}>buc.</Box>
      </Box>
      <Button
        style={{ minWidth: '30px' }}
        onClick={() =>
          updateCartMutation({ quantity: quantity + 1, id, purchaseOption, locationId })
        }
        label=""
      >
        <Add />
      </Button>
    </Stack>
  )
}

export default ProductQuantity
