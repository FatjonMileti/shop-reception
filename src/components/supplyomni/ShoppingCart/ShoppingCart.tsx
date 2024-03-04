import { Box, CircularProgress, Typography, Grid, useMediaQuery, Paper } from '@mui/material'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { useNotification } from 'hooks'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from './ShoppingCart.modules.scss'
import { ManageSearch } from '@mui/icons-material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { ProductInfo } from '../ProductInfo'
import { ShoppingCartStepper } from '../../core-ui/ShoppingCartStepper'
import { useNavigate } from 'react-router-dom'
import { FloatingButton } from 'components/core-ui/FloatingButton'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ShoppingCartSummary from './ShoppingCartSummary'

const ShoppingCart = () => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const isXs = useMediaQuery('(max-width:624px)')

  const { data: products, isLoading: isLoadingGetProducts } = useQuery(
    ['cart-products'],
    async () => {
      const response = await makeCoreGetRequest('/supply-omni/cart/product')

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
    await makeCorePutRequest('/supply-omni/cart/product', {
      quantity: values.quantity,
      id: values.id,
      purchaseOption: values.purchaseOption,
      locationId: values.locationId
    })
  }

  const { isLoading: isLoadingUpdateCart, mutate: updateCartMutation } = useMutation(
    updateCartItemQuantity,
    {
      onSuccess: () => {
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

  // TODO: Move styles external
  return (
    <div className={s.mainContainer}>
      {isLoadingGetProducts || isLoadingUpdateCart ? (
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      ) : (
        <>
          {products.list.length ? (
            <>
              <Grid sx={{ mt: 1 }} container spacing={2}>
                <Grid item xs={12}>
                  <ShoppingCartStepper activeStep={0} />
                </Grid>

                <Grid item xs={12} md={8}>
                  {products.list.map((product: any, index: number) => (
                    <ProductInfo
                      product={product}
                      productIndex={index}
                      updateCartMutation={updateCartMutation}
                    />
                  ))}
                </Grid>

                <Grid item xs={12} md={4}>
                  <ShoppingCartSummary sx={{ pl: 2, pr: 2 }} order={products || {}} />
                  <Box sx={{ pl: 2, pr: 2 }}>
                    <Button
                      onClick={() => {
                        navigate('/supplyOmni/shoppingCartSelectClient')
                        localStorage.setItem('isStepperStep', 'true')
                      }}
                      label=""
                      variant="contained"
                      style={{ marginTop: '26px', width: '100%' }}
                    >
                      Pasul urmator <NavigateNextIcon />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid
              sx={
                !isXs
                  ? { marginTop: '100px', flexGrow: 1, height: '100%' }
                  : { flexGrow: 1, height: '100%' }
              }
              container
              spacing={2}
            >
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Box sx={{ textAlign: 'center' }}>
                    <ManageSearch sx={{ fontSize: '100px', color: '#cecece' }} />
                    <br />
                    <Typography sx={{ fontSize: '14px', color: '#cecece' }}>
                      Nu aveti produse in cos!
                    </Typography>
                    <br />
                    <IconButton
                      onClick={() => navigate('/supplyOmni/productScan')}
                      label="Cauta Produs"
                      variant="contained"
                      startIcon={<Icon iconName="SearchOutlined" tiny={true} fill="white" />}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
          <FloatingButton type="add" href="/supplyOmni/productScan" backgroundColor="#c40000" />
        </>
      )}
    </div>
  )
}

export default ShoppingCart
