import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import s from './ShoppingCart.modules.scss'
import { Delete, Remove, Add, InsertDriveFileOutlined } from '@mui/icons-material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useState } from 'react'
import DeleteConfirmationModal from 'components/core-ui/DeleteConfirmationModal/DeleteConfirmationModal'

const ShoppingCart = () => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
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
      id: values.id
    })
  }

  const { isLoading: isLoadingUpdateCart, mutate: updateCartMutation } = useMutation(
    updateCartItemQuantity,
    {
      onSuccess: res => {
        showNotification({
          message: 'Item edited successfully',
          type: 'success'
        })

        queryClient.invalidateQueries({ queryKey: ['cart-products'] })
      },
      onError: res => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  return (
    <div className={s.mainContainer}>
      {isLoadingGetProducts || isLoadingUpdateCart ? (
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      ) : (
        <>
          <Typography color="grey">Produse in cos: {products.summary.totalItems}</Typography>

          {products.list.map(product => (
            <Paper key={product.id} className={s.filtersContainer}>
              <Box className={s.cartContainer}>
                <Typography fontWeight="600">{product.name}</Typography>

                <Box className={s.cartContainer}>
                  <Box className={s.cartContainer}>
                    <Button
                      onClick={() =>
                        updateCartMutation({ quantity: product.quantity - 1, id: product.id })
                      }
                      label=""
                    >
                      <Remove />
                    </Button>
                    <Input
                      type={'text'}
                      variant={'outlined'}
                      defaultValue={product.quantity}
                      width="64px"
                      onBlur={(event: any) =>
                        updateCartMutation({ quantity: event.target.value, id: product.id })
                      }
                    />
                    <Button
                      onClick={() =>
                        updateCartMutation({ quantity: product.quantity + 1, id: product.id })
                      }
                      label=""
                    >
                      <Add />
                    </Button>
                  </Box>

                  <Box>
                    <Typography fontWeight="600" color="red">
                      {product.price} lei
                    </Typography>
                    {product.totalPriceWithoutDiscount && (
                      <Typography
                        color="grey"
                        fontSize={15}
                        textAlign={'center'}
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {product.totalPriceWithoutDiscount} lei
                      </Typography>
                    )}
                  </Box>

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
                    actionUrl="/supply-omni/cart/product/:id"
                    content={'Sunteti sigur ca vreti sa stergeti acest produs din cos?'}
                  />
                </Box>
              </Box>
            </Paper>
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
              onClick={() => console.log('finish order')}
              label=""
              variant="contained"
              style={{ marginTop: '16px' }}
            >
              <InsertDriveFileOutlined /> FINALIZEAZA PROFORMA
            </Button>
          </Box>
        </>
      )}
    </div>
  )
}

export default ShoppingCart
