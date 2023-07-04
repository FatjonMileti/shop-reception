import * as React from 'react'
import { IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper } from '@mui/material'
import { useNotification, useScandit } from 'hooks'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCorePostRequest } from 'utils/api'
import { ProductBarcodeScannerProps } from '../ProductBarcodeScanner/ProductBarcodeScannerDefinitions'
import s from '../ProductBarcodeScanner/ProductBarcodeScanner.modules.scss'
import { useNavigate, useParams } from 'react-router-dom'

const ReceiptBarcodeScanner = (props: ProductBarcodeScannerProps) => {
  const { action } = props

  const [code, setCode] = React.useState('')

  const [isVisible, setIsVisible] = React.useState(false)

  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const { id } = useParams()

  const onScan = scanResult => {
    setCode(scanResult.barcodes[0].data)
    setIsVisible(false)
  }

  const { run, destroy } = useScandit({ onScan, isVisible })

  const scanCode = () => {
    setIsVisible(true)
  }

  const sendReceipt = () => {
    if (code) {
      ;(async () => {
        if (action.type === 'POST') {
          try {
            const result = await makeCorePostRequest(`${action.url}`, {
              receiptId: code,
              proformaId: id
            })
            if (action.href) {
              await destroy()
              navigate(`${action.href}?${action.variable}=${code}`)
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

  React.useEffect(() => {
    document.getElementById('receipt-scan-input').focus()
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
            id="receipt-scan-input"
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
