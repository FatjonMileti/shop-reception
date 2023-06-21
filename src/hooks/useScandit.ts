import { useState, useEffect } from 'react'
import * as ScanditSDK from 'scandit-sdk'

const licenseKey = process.env.SCANDIT_LICENCE_KEY

const useScandit = ({ onScan, isVisible }) => {
  const [localPicker, setLocalPicker] = useState(null)

  useEffect(() => {
    return () => {
      if (localPicker) {
        localPicker.destroy()
      }
    }
  }, [localPicker])

  useEffect(() => {
    if (localPicker) {
      if (isVisible) {
        localPicker.accessCamera()
        localPicker.resumeScanning()
      } else {
        localPicker.pauseScanning()
      }
    }
  }, [isVisible])

  const run = async () => {
    ScanditSDK.configure(licenseKey, {
      // engineLocation: 'https://cdn.jsdelivr.net/npm/scandit-sdk'
      engineLocation: 'static/scandit'
    }).then(() => {
      ScanditSDK.BarcodePicker.create(document.getElementById('scandit-barcode-picker'), {
        playSoundOnScan: true,
        vibrateOnScan: true,
        accessCamera: false
      }).then(barcodePicker => {
        const scanSettings = new ScanditSDK.ScanSettings({
          enabledSymbologies: [
            ScanditSDK.Barcode.Symbology.EAN8,
            ScanditSDK.Barcode.Symbology.EAN13
          ],
          codeDuplicateFilter: 1000 // Minimum delay between duplicate results
        })
        barcodePicker.applyScanSettings(scanSettings)
        barcodePicker.on('scan', scanResult => {
          onScan(scanResult)
          barcodePicker.pauseScanning(true)
          // barcodePicker.setVisible(false)
          // barcodePicker.destroy()
          // setLocalPicker(null)
        })
        barcodePicker.on('ready', () => {
          setLocalPicker(barcodePicker)
        })
      })
    })
  }

  const destroy = async () => {
    localPicker.destroy()
    setLocalPicker(null)
  }

  return { run, destroy }
}

export default useScandit
