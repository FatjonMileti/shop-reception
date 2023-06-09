import * as React from 'react'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper } from '@mui/material'
import { useNotification, useScandit } from 'hooks'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCorePostRequest } from 'utils/api'
import { ProductBarcodeScannerProps } from '../ProductBarcodeScanner/ProductBarcodeScannerDefinitions'
import s from '../ProductBarcodeScanner/ProductBarcodeScanner.modules.scss'
import { useNavigate } from 'react-router-dom'


const ReceiptBarcodeScanner = (props: ProductBarcodeScannerProps) => {
  const { action } = props

  const [code, setCode] = React.useState('')

  const [isVisible, setIsVisible] = React.useState(false)

  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const onScan = scanResult => {
    setCode(scanResult.barcodes[0].data)
    setIsVisible(false)
  }

  const { run } = useScandit({ onScan, isVisible })

  const scanCode = () => {
    setIsVisible(true)
  }

  const sendReceipt = () => {
    if (code) {
      ;(async () => {
        if (action.type === 'POST') {
            try {
                const result = await makeCorePostRequest(`${action.url}`, { code })
                if (action.href) {
                    navigate(action.href)
                }
            } catch (error) {
                showNotification({
                  message: `Error while sending receipt. ${error?.message}`,
                  type: 'error'
                })
            }
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

  return (
    <Paper className={s.scanContainer}>
      <div className={s.scannerControls}>
        <div className={s.scannerControlItem}>
          <Input
            value={code}
            type="text"
            variant="standard"
            label="Introdu codul bonului"
            fullWidth
            onChange={event => setCode(event.currentTarget.value)}
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
            onClick={sendReceipt}
            label="Continua"
            variant="contained"
            endIcon={<Icon iconName="ArrowRightSharp" tiny={true} fill="white" />}
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

export default ReceiptBarcodeScanner
