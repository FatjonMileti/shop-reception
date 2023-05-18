import * as React from 'react'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper } from '@mui/material'
import { useScandit } from 'hooks'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCoreGetRequest } from 'utils/api'
import { BarecodeScannerProps, ProductStockResponse } from './BarcodeScannerDefinitions'
import { useDispatch } from 'react-redux'
import { ProductActions } from 'reducers/productSlice'
import s from './BarcodeScanner.modules.scss'

const BarcodeScanner = (props: BarecodeScannerProps) => {
  const { action } = props

  const dispatch = useDispatch()

  const [code, setCode] = React.useState('')
  const [isVisible, setIsVisible] = React.useState(false)

  const onScan = scanResult => {
    setCode(scanResult.barcodes[0].data)
    setIsVisible(false)
  }

  const { run } = useScandit({ onScan, isVisible })

  const scanCode = () => {
    setCode('')
    setIsVisible(true)
  }

  const searchProduct = () => {
    if (code) {
      ;(async () => {
        let response: ProductStockResponse
        if (action.type === 'GET') {
          response = await makeCoreGetRequest(`${action.url}?code=${code}`)
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

  React.useEffect(() => {
    return () => {
      dispatch(ProductActions.clearProduct())
    }
  }, [])

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
            onChange={event => setCode(event.currentTarget.value)}
          />
        </div>
        <div className={s.buttonContainer}>
          <IconButton
            onClick={scanCode}
            label="Scaneaza"
            variant="outlined"
            startIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill='primary' />}
          />
          <IconButton
            onClick={searchProduct}
            label="Cauta Produs"
            variant="contained"
            startIcon={<Icon iconName="SearchOutlined" tiny={true} fill='white' />}
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
