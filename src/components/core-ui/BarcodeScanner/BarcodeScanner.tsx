import * as React from 'react'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useScandit } from 'hooks'

const BarcodeScanner = () => {
  const [code, setCode] = React.useState('')
  // const [showScanButton, setShowScanButton] = React.useState(true)
  const [isVisible, setIsVisible] = React.useState(false)

  const onScan = scanResult => {
    setCode(scanResult.barcodes[0].data)
    setIsVisible(false)
  }

  const { run } = useScandit({ onScan, isVisible })

  const scanCode = () => {
    setCode('')
    setIsVisible(true)
    // run()
  }

  React.useEffect(() => {
    try {
      run()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div>
      {!isVisible && <Button onClick={scanCode} label="Scan code" variant="contained" />}
      <div style={{ margin: '20px 0' }}>
        <Input value={code} type="text" variant="standard" />
      </div>
      <div
        id="scandit-barcode-picker"
        style={{
          maxWidth: '400px',
          maxHeight: '400px',
          visibility: isVisible ? 'visible' : 'hidden',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  )
}

export default BarcodeScanner
