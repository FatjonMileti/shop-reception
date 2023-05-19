import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'configureStore'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper } from '@mui/material'
import { useScandit } from 'hooks'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCoreGetRequest } from 'utils/api'
import { BarecodeScannerProps, ProductStockResponse } from './BarcodeScannerDefinitions'
import { ProductActions } from 'reducers/productSlice'
import s from './BarcodeScanner.modules.scss'

const BarcodeScanner = (props: BarecodeScannerProps) => {
  const { action } = props

  const [code, setCode] = React.useState('')

  const product = useSelector((state: RootState) => state.product)

  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setCode(product.code)
  }, [product.code])

  const onScan = scanResult => {
    dispatch(ProductActions.setProduct({ code: scanResult.barcodes[0].data }))
    setIsVisible(false)
  }

  const { run } = useScandit({ onScan, isVisible })

  const scanCode = () => {
    dispatch(ProductActions.clearProduct())
    setIsVisible(true)
  }

  const searchProduct = () => {
    if (product.code) {
      ;(async () => {
        let response: ProductStockResponse
        if (action.type === 'GET') {
          response = await makeCoreGetRequest(`${action.url}?code=${product.code}`)
          dispatch(ProductActions.setProduct({ ...response.list[0] }))
        }
      })()
    }
  }

  React.useEffect(() => {
    try {
      run()
    } catch (error) {
      console.log(error)
    }
  }, [])

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(ProductActions.clearProduct())
  //   }
  // }, [])

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
          />
        </div>
        <div className={s.buttonContainer}>
          <IconButton
            onClick={scanCode}
            label="Scaneaza"
            variant="outlined"
            startIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill="primary" />}
          />
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
            opacity: isVisible ? 1 : 0
          }}
        />
      </div>
    </Paper>
  )
}

export default BarcodeScanner
