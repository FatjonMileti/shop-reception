import { Box } from '@mui/material'
import OrderSummary from './OrderSummary'
import ClientSummary from './ClientSummary'

const ShoppingCartSummary = (props: any) => {
  const { order, client, sx } = props

  return (
    <Box sx={sx}>
      <OrderSummary order={order} />
      {client?.name && <ClientSummary client={client} />}
    </Box>
  )
}

export default ShoppingCartSummary
