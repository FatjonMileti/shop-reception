import * as React from 'react'
import { Paper } from '@mui/material'
import { ShoppingCartProps } from './ShoppingCartDefinitions'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

const ShoppingCart = (props: ShoppingCartProps) => {
  const { action } = props

  const { showNotification } = useNotification()

  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    ;(async () => {
      try {
        if (action.type === 'GET') {
          const result = await makeCoreGetRequest(action.url)
          setProducts(result.products)
        }
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la obtinerea listei de produse. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [])

  return (
    <Paper>
      {products.map(product => (
        <div key={product.id}>
          <div>{product.title}</div>
          <div>{product.quantity}</div>
          <div>{product.price}</div>
          <div>{product.currency}</div>
          <div>{product.totalPrice}</div>
        </div>
      ))}
    </Paper>
  )
}

export default ShoppingCart
