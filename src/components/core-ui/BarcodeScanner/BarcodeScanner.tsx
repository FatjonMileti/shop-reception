import * as React from 'react'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useScandit } from 'hooks'

const BarcodeScanner = () => {
  const [code, setCode] = React.useState('')
  const [showScanButton, setShowScanButton] = React.useState(true)

  const onScan = scanResult => {
    setCode(scanResult.barcodes[0].data)
    setShowScanButton(true)
  }

  const { run } = useScandit({ onScan })

  const scanCode = () => {
    setCode('')
    setShowScanButton(false)
    run()
  }

  return (
    <div>
      {showScanButton && <Button onClick={scanCode} label="Scan code" variant="contained" />}
      <div style={{ margin: '20px 0' }}>
        <Input value={code} type="text" variant="standard" />
      </div>
      <div id="scandit-barcode-picker" style={{ maxWidth: '400px', maxHeight: '400px' }} />
    </div>
  )
}

export default BarcodeScanner
