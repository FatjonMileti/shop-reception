import { useState, useEffect } from 'react'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper, CircularProgress } from '@mui/material'
import { useScandit } from 'hooks'
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

export interface ProductBarcodeScannerProps {
  action: Action
  onProductChange: Function
}

const ProductBarcodeScanner = (props: ProductBarcodeScannerProps) => {
  const { action, onProductChange } = props

  const { showNotification } = useNotification()

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [productCode, setProductCode] = useState<string>('')
  const [isUsingScandit, setIsUsingScandit] = useState<boolean>(false) // [~] kept false until we're reasonably sure we're not running on a device with infrared scanner available, like Urovo
  const [isZerothButtonPressed, setIsZerothButtonPressed] = useState<boolean>(false)

  const onScan = scanResult => {
    setProductCode(scanResult.barcodes[0].data)
    setIsVisible(false)
  }
  const { run } = useScandit({ onScan, isVisible })

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
    if (event) {
      event.target.blur() // [~] otherwise, the side button will trigger this click event...
    }

    if (productCode && action.type === 'GET') {
      refetch()
    }
  }

  useEffect(() => {
    isScannerDevice(() => {
      try {
        run()
        setIsUsingScandit(true)
      } catch (error) {
        console.log(error)
      }
    })
  }, [])

  return (
    <Paper className={s.scanContainer}>
      {isLoading && (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      )}

      <div className={s.scannerControls}>
        <div className={s.scannerControlItem}>
          <Input
            autoFocus
            value={productCode}
            type="text"
            variant="standard"
            label="Introdu codul produsului"
            fullWidth
            onChange={event => setProductCode(event.currentTarget.value)}
            onBlur={event => {
              if (!productCode) {
                document.getElementById('product-scan-input').focus()
              }
            }}
            onKeyDown={event => {
              if (event.which == 0) {
                setIsZerothButtonPressed(true)
              }
            }}
            onKeyUp={event => {
              if (event.which == 0) {
                setIsZerothButtonPressed(false)
                if (productCode) searchProduct(event)
              }
            }}
            onBeforeInput={event => {
              if (isZerothButtonPressed) {
                ;(document.getElementById('product-scan-input') as HTMLInputElement).value = ''
              }
            }}
            id="product-scan-input"
            required
          />
        </div>
        <div className={s.buttonContainer}>
          {isUsingScandit && (
            <IconButton
              onClick={scanCode}
              label="Scaneaza"
              variant="outlined"
              startIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill="primary" />}
            />
          )}
          <IconButton
            onClick={searchProduct}
            label="Cauta Produs"
            variant="contained"
            startIcon={<Icon iconName="SearchOutlined" tiny={true} fill="white" />}
          />
        </div>
      </div>
      <div className={cn({ [s.hiddenScanner]: !isVisible })}>
        <div
          id="scandit-barcode-picker"
          style={{
            maxWidth: '400px',
            maxHeight: '400px',
            visibility: isVisible ? 'visible' : 'hidden',
            opacity: isVisible ? 1 : 0,
            marginTop: isVisible ? '16px' : '0'
          }}
        />
      </div>
    </Paper>
  )
}

export default ProductBarcodeScanner
