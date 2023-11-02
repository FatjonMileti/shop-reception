import { useState } from 'react'
import { Divider, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import s from './ProductGeneralInfo.modules.scss'
import { formatErrorMessage } from 'utils/formatting'
import { KeyValuePairs } from 'components/core-ui/KeyValuePairs'
import { CircularProgress, Paper } from '@mui/material'
import { useQuery, useMutation } from 'react-query'
import { ProductNearbyStockInfo } from '../ProductNearbyStockInfo'
import { NeighboursStock, Product } from '../interfaces'

interface CartItem {
  id: string
  quantity: number
  isWarehouse: boolean
  purchaseOption: string
}

interface ProductGeneralInfoProps {
  product: Product
  neighboursStock: NeighboursStock[]
}

const ProductGeneralInfo: React.FC<ProductGeneralInfoProps> = ({ product, neighboursStock }) => {
  const { showNotification } = useNotification()

  const hasBuyback = product.purchaseOptions.find(item => item.value === 'BUYBACK_AFM')

  const [selectedBuybackOption, setSelectedBuybackOption] = useState(
    (hasBuyback && product.purchaseOptions[0].value) || ''
  )

  const { data: productStock, isLoading: isLoadingProductStock } = useQuery(
    ['available-stocks'],
    async () => {
      const result = await makeCorePostRequest('/supply-omni/cart/product-stock/location')
      return result || { stock: false, deposit: false }
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroarea la afisarea butonului de "Adauga in cos". ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const displayAddToCartBtn = product.isWarehouse ? productStock?.deposit : productStock?.store

  const addItemToCart = async (values: CartItem) => {
    if (displayAddToCartBtn) {
      await makeCorePostRequest(`/supply-omni/cart/product`, values)
    }
  }

  const { isLoading: isLoadingAddToCart, mutate } = useMutation(addItemToCart, {
    onSuccess: res => {
      showNotification({
        message: 'Produsul a fost adaugat in cos',
        type: 'success'
      })
    },
    onError: res => {
      showNotification({
        message: `A aparut o eroare la adaugarea produsului in cos. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  const onSubmitAddToCart = async () => {
    mutate({
      id: product.id,
      quantity: 1,
      isWarehouse: product.isWarehouse,
      purchaseOption: selectedBuybackOption
    })
  }

  return (
    <div>
      {(isLoadingProductStock || isLoadingAddToCart) && (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      )}

      <Paper>
        <div className={s.infoContainer}>
          <div className={s.price}>
            {product.price}&nbsp;{product.currency}
          </div>
          <IconButton
            onClick={onSubmitAddToCart}
            label="Adauga in cos"
            variant="contained"
            endIcon={<Icon iconName="AddCircle" tiny={true} fill="white" />}
            disabled={!displayAddToCartBtn}
            sx={displayAddToCartBtn ? {} : { opacity: 0.5 }}
          />
        </div>
        <Divider component="div" />

        {hasBuyback && (
          <div className={s.infoContainer} style={{ justifyContent: 'flex-end' }}>
            <Input
              type="select"
              name="buyback-input"
              label="Mod achizitie"
              values={product.purchaseOptions}
              value={selectedBuybackOption}
              variant="standard"
              width="320px"
              onChange={event => setSelectedBuybackOption((event.target as any).value)}
              disabled={product.purchaseOptions.length == 1}
            />
          </div>
        )}

        {hasBuyback && <Divider component="div" />}

        <div className={s.infoContainer}>
          <span className={s.firstCode}>
            <span className={s.lightText}>Cod EAN:</span> <strong>{product.eanCode}</strong>
          </span>
          <span className={s.secondCode}>
            <span className={s.lightText}>Cod intern:</span> <strong>{product.storeCode}</strong>
          </span>

          <KeyValuePairs
            pairs={[
              { key: 'Disponibil:', value: product.available },
              { key: 'Vanzari:', value: product.sold },
              { key: 'Rezervari:', value: product.reserved },
              { key: 'Stoc initial:', value: product.initialStock }
            ]}
            columns={2}
            className={s.stockInfo}
          />
        </div>
      </Paper>
      {neighboursStock && <ProductNearbyStockInfo neighboursStock={neighboursStock} />}
    </div>
  )
}

export default ProductGeneralInfo
