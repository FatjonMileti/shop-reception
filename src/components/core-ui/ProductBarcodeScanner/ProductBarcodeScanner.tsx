import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'configureStore'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper, CircularProgress } from '@mui/material'
import { useScandit } from 'hooks'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCoreGetRequest } from 'utils/api'
import {
  ProductBarcodeScannerProps,
  ProductStockResponse
} from './ProductBarcodeScannerDefinitions'
import { ProductActions } from 'reducers/productSlice'
import s from './ProductBarcodeScanner.modules.scss'
import { toProduct } from './serializers'
import { isScannerDevice } from 'utils/helpers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

const ProductBarcodeScanner = (props: ProductBarcodeScannerProps) => {
  const { action } = props

  const [code, setCode] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const product = useSelector((state: RootState) => state.product)

  const dispatch = useDispatch()

  const { showNotification } = useNotification()

  useEffect(() => {
    setCode(product.code || '')
  }, [product.code])

  const onScan = scanResult => {
    dispatch(ProductActions.setProduct({ code: scanResult.barcodes[0].data }))
    setIsVisible(false)
  }

  const { run } = useScandit({ onScan, isVisible })
  const [isUsingScandit, setIsUsingScandit] = useState(false) // [~] kept false until we're reasonably sure we're not running on a device with infrared scanner available, like Urovo

  const scanCode = () => {
    dispatch(ProductActions.clearProduct())
    setIsVisible(true)
  }

  const searchProduct = async (event = null) => {
    if (event) {
      event.target.blur() // [~] otherwise, the side button will trigger this click event...
    }

    if (product.code) {
      try {
        setIsLoading(true)
        dispatch(ProductActions.setProduct({ title: '' }))
        let response: ProductStockResponse
        if (action.type === 'GET') {
          response = await makeCoreGetRequest(`${action.url}/${product.code}`)
          dispatch(ProductActions.setProduct({ ...toProduct(response) }))
        }
        setIsLoading(false)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la cautarea produsului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
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

  useEffect(() => {
    document.getElementById('product-scan-input').focus()
  }, [])

  const [isZerothButtonPressed, setIsZerothButtonPressed] = useState(false)

  return (
    <Paper className={s.scanContainer}>
      <div className={s.scannerControls}>
        <div className={s.scannerControlItem}>
          <Input
            value={code}
            type="text"
            variant="standard"
            label="Introdu codul produsului"
            fullWidth
            onChange={event =>
              dispatch(ProductActions.setProduct({ code: event.currentTarget.value }))
            }
            onBlur={event => {
              if (!product.code) {
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
                if (product.code) searchProduct(event)
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
      {isLoading && (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      )}
    </Paper>
  )
}

export default ProductBarcodeScanner
