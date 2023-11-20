import { Box, Paper, Typography } from '@mui/material'
import { useQueryClient } from 'react-query'
import s from '../ShoppingCart/ShoppingCart.modules.scss'
import { Delete } from '@mui/icons-material'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import { useState } from 'react'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'
import { ProductQuantity } from './ProductQuantity'
import { ProductPrice } from './ProductPrice'
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
}

interface ProductInfoProps {
  product: CartProduct
  updateCartMutation: Function
}

const ProductInfo: React.FC<ProductInfoProps> = props => {
  const { product, updateCartMutation } = props
  const queryClient = useQueryClient()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  return (
    <>
      <Paper key={product.id} className={s.filtersContainer}>
        <Box className={s.cartContainer}>
          <Typography fontWeight="600">{product.name}</Typography>

          <Box className={s.cartContainer}>
            <ProductQuantity
              updateCartMutation={updateCartMutation}
              quantity={product.quantity}
              id={product.id}
            />

            <ProductPrice
              totalPrice={product.totalPrice}
              totalPriceWithoutDiscount={product.totalPriceWithoutDiscount}
            />

            <Button onClick={openDeleteModal} label="">
              <Delete />
            </Button>

            <DeleteConfirmationModal
              isModalOpen={isDeleteModalOpen}
              closeModal={closeDeleteModal}
              itemId={product.id}
              setShouldRefreshData={() =>
                queryClient.invalidateQueries({
                  queryKey: ['cart-products']
                })
              }
              actionUrl="/supply-omni/cart/product/:id?purchaseOption=INTERNAL_BUYBACK"
              content={'Sunteti sigur ca vreti sa stergeti acest produs din cos?'}
            />
          </Box>
        </Box>
        {product.purchaseOption === 'INTERNAL_BUYBACK' && (
          <ProductBuybackPrice quantity={product.quantity} discountLabel={product.discountLabel} />
        )}
      </Paper>
    </>
  )
}

export default ProductInfo
