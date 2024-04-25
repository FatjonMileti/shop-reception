import { Box, Grid, Paper, Typography, Stack, Button, Chip } from '@mui/material'
import { useQueryClient } from 'react-query'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import s from '../ShoppingCart/ShoppingCart.modules.scss'
import { Delete } from '@mui/icons-material'
import { useState } from 'react'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'
import { ProductQuantity } from './ProductQuantity'
import { ProductPrice } from './ProductPrice'
import PercentIcon from '@mui/icons-material/Percent'
import { ProductBuybackPrice } from './ProductBuybackPrice'

interface CartProduct {
  brand: string
  discountLabel: string
  ean: string
  id: string
  internalCode: string
  name: string
  price: number
  purchaseOption: string
  quantity: number
  totalPrice: number
  totalPriceWithoutDiscount: number
  vat: number
  locationId: number
}

interface ProductInfoProps {
  product: CartProduct
  updateCartMutation: Function
  productIndex: number
}

const ProductInfo: React.FC<ProductInfoProps> = props => {
  const { product, updateCartMutation, productIndex } = props
  const queryClient = useQueryClient()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  // TODO: Move styles external
  return (
    <>
      <Paper
        key={product.id}
        className={productIndex > 0 ? s.filtersContainer : s.firstFiltersContainer}
        sx={{ borderLeft: 'solid 5px #0970E6', boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.1)' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
              <ViewInArIcon sx={{ fontSize: 90, color: '#ececec' }} />
              <Box>
                <Typography sx={{ color: '#0970E6' }}>{product.name}</Typography>
                <Typography
                  sx={{ color: '#052351', fontSize: '12px', textTransform: 'none', mb: 1 }}
                >
                  Brand: {product.brand || 'N/A'} | Cod intern: {product.internalCode} | EAN:{' '}
                  {product.ean}{' '}
                </Typography>
                {product.purchaseOption === 'INTERNAL_BUYBACK' && (
                  <Chip
                    color="error"
                    icon={<PercentIcon />}
                    label={'Cantitate buyback: ' + product.quantity + ' ' + product.discountLabel}
                    size="small"
                  />
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Box style={{ float: 'right', width: '140px', marginTop: '20px' }}>
              <ProductQuantity
                updateCartMutation={updateCartMutation}
                quantity={product.quantity}
                id={product.id}
                purchaseOption={product.purchaseOption}
                locationId={product.locationId}
              />
            </Box>
          </Grid>
          <Grid item xs={3} style={{ position: 'relative' }}>
            <Box style={{ float: 'right' }}>
              <ProductPrice
                totalPrice={product.totalPrice}
                totalPriceWithoutDiscount={product.totalPriceWithoutDiscount}
                style={{ with: 'fit-content' }}
              />
            </Box>
            <Box style={{ clear: 'both' }}></Box>
            <Box style={{ float: 'right' }}>
              <Button
                onClick={openDeleteModal}
                style={{
                  textTransform: 'none',
                  position: 'absolute',
                  bottom: 0,
                  width: '150px',
                  right: 0,
                  color: 'grey'
                }}
                startIcon={<Delete sx={{ color: 'grey' }} />}
              >
                {' '}
                Sterge produs
              </Button>
            </Box>
            <Box style={{ clear: 'both' }}></Box>
          </Grid>
        </Grid>
        <DeleteConfirmationModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          itemId={product.id}
          title={'Sterge produs'}
          setShouldRefreshData={() =>
            queryClient.invalidateQueries({
              queryKey: ['cart-products']
            })
          }
          cancelLabel={'Anulare'}
          deleteLabel={'Sterge'}
          actionUrl={`/supply-omni/cart/product/:id?purchaseOption=${product.purchaseOption}`}
          content={'Sunteti sigur ca vreti sa stergeti acest produs din cos?'}
        />

        {product.purchaseOption === 'INTERNAL_BUYBACK' && (
          <ProductBuybackPrice quantity={product.quantity} discountLabel={product.discountLabel} />
        )}
      </Paper>
    </>
  )
}

export default ProductInfo
