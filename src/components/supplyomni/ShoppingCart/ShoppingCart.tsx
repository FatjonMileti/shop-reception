import { Box, CircularProgress, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from './ShoppingCart.modules.scss'
import { InsertDriveFileOutlined } from '@mui/icons-material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { ProductInfo } from '../ProductInfo'
import { useNavigate } from 'react-router-dom'
import { FloatingButton } from 'components/core-ui/FloatingButton'

const ShoppingCart = () => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: products, isLoading: isLoadingGetProducts } = useQuery(
    ['cart-products'],
    async () => {
      const response = await makeCoreGetRequest(`/supply-omni/cart/product`)

      return response
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea listei de produse. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const updateCartItemQuantity = async values => {
    await makeCorePutRequest(`/supply-omni/cart/product`, {
      quantity: values.quantity,
      id: values.id,
      purchaseOption: values.purchaseOption
    })
  }

  const { isLoading: isLoadingUpdateCart, mutate: updateCartMutation } = useMutation(
    updateCartItemQuantity,
    {
      onSuccess: res => {
        showNotification({
          message: 'Cantitatea produsului a fost modificata cu succes.',
          type: 'success'
        })

        queryClient.invalidateQueries({ queryKey: ['cart-products'] })
      },
      onError: res => {
        showNotification({
          message: `A aparut o eroare la schimbarea cantitatii. ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <div className={s.mainContainer}>
      {isLoadingGetProducts ? (
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      ) : (
        <>
          <Typography color="grey">Produse in cos: {products.summary.totalItems}</Typography>

          {products.list.map(product => (
            <ProductInfo product={product} updateCartMutation={updateCartMutation} />
          ))}

          <Box className={s.totalPriceContainer}>
            <Box className={s.cartContainer}>
              <Typography fontWeight={'600'} color={'#000'} mr={6}>
                Total de plata:
              </Typography>
              <Typography fontWeight={'600'} fontSize={18} color={'#0970E6'}>
                {products.summary.totalPrice}
              </Typography>
            </Box>

            <Button
              onClick={() => navigate('/supplyOmni/shoppingCartSelectClient')}
              label=""
              variant="contained"
              style={{ marginTop: '16px' }}
            >
              <InsertDriveFileOutlined /> FINALIZEAZA PROFORMA
            </Button>
            <FloatingButton type="add" href="/supplyOmni/productScan" backgroundColor="red" />
          </Box>
        </>
      )}
    </div>
  )
}

export default ShoppingCart
