import { useState, useEffect } from 'react'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper, CircularProgress, useMediaQuery, Box, InputAdornment } from '@mui/material'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCoreGetRequest } from 'utils/api'
import s from './ProductBarcodeScanner.modules.scss'
import { toProduct } from './serializers'
import { isScannerDevice } from 'utils/helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { useQuery } from 'react-query'
import { Action } from 'components/utils/definitions/Definitions'
import { CloseMenu } from 'icons'

export interface ProductBarcodeScannerProps {
  action: Action
  onProductChange: Function
}

const ProductBarcodeScanner = (props: ProductBarcodeScannerProps) => {
  const { action, onProductChange } = props

  const isXs = useMediaQuery('(max-width:624px)')

  const { showNotification } = useNotification()

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [productCode, setProductCode] = useState<string>('')

  const onScan = scanResult => {
    setProductCode(scanResult.barcodes[0].data)
    setIsVisible(false)
  }

  const scanCode = (): void => {
    setProductCode('')
    setIsVisible(true)
  }

  const { data, isLoading, refetch } = useQuery(
    ['scanner-product'],
    async () => {
      const response = await makeCoreGetRequest(`${action.url}/${productCode}`)
      onProductChange({ ...toProduct(response) })
      return { ...toProduct(response) }
    },
    {
      onError: error => {
        showNotification({
          message: `A apărut o eroare la căutarea produsului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
      enabled: false
    }
  )

  const searchProduct = async (event = null): Promise<void> => {
    if (productCode && action.type === 'GET') {
      refetch()
    }
  }

  const clearCode = () => {
    setProductCode('')
    document.getElementById('product-scan-input').focus()
  }

  return (
    <Paper className={s.scanContainer}>
      <div className={s.scannerControls}>
        <div className={s.scannerControlItem}>
          <Input
            autoFocus
            value={productCode}
            type="text"
            variant="outlined"
            label="Introdu codul produsului"
            fullWidth
            onChange={event => setProductCode(event.currentTarget.value)}
            onBlur={event => {
              if (!productCode) {
                document.getElementById('product-scan-input').focus()
              }
            }}
            onKeyUp={event => {
              if (event.which == 0) {
                if (productCode) searchProduct(event)
              }
            }}
            id="product-scan-input"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className={s.clearIconAdornment} onClick={clearCode}>
                  <CloseMenu fill={'rgba(0, 0, 0, 0.87)'} />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className={s.buttonContainer}>
          <Box style={{ width: '100%' }}>
            <IconButton
              onClick={searchProduct}
              sx={{ width: '100%' }}
              label="Cauta Produs"
              variant="contained"
              startIcon={<Icon iconName="SearchOutlined" tiny={true} fill="white" />}
            />
          </Box>
        </div>
      </div>
      {isLoading && (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      )}
    </Paper>
  )
}

export default ProductBarcodeScanner
