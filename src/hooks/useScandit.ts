import { useState, useEffect } from 'react'
import * as ScanditSDK from 'scandit-sdk'

const licenseKey =
  'AdvCxxxqP9YMDLw4pEJP+dsPe9oXMocaM3lfSBh0s/aVVcbE5wXyA0UM1o80V+UrN2E3jX9d7ZV5XyHxOUBsVKp5yOdlfNJUwFPZNzx7tixcGAyEQQwBmEQllOq/Kf+TXFX3koaYYjYE4lFRIeWZAuicakUJdPasWE+TiDQzW25CVmprMQLQ67AtTO1q38y+ZbQ+b6kkH40AGWInUqvrZYg886XlyZa0NXqYnQUPVPj/LidmyCOYoQVK4oJoQokjIOaK9PuEEIuhxzj0PwCtJAea+LgqpBcZwhy6+dPijJ7ZMq4tc3I9XQAFVA3IUYBdsMuUg2PQKlTnR0ZmUnarXZYNY7gGMusaVaxManTSSOapGVNfuLT1DzkaKJvo+XfeT8Q9gTTkgzj2B0chuahu9PgId4djILV77u6p0gn7MqZxzu6mcXfAr+AbGgB7D95xYs75PrjPbCjVjVPNQJc5npy1eOt98EmRd8J483EyRwjiUAx7zvAKGgWN0SDpbPyL1Rk7zYRnKkQjfXmfHRpKYONAoFYCZVdDfxG6dOjvhgp+Tuz+LV4yvcHA23yVn6GVtpAeRbFcSmc7fm619b0/JRezllH8YtQ7pa06SHzJbdyhVU9/0ec0xsZnp9nbANJORv0GCYZD6Y6AyMh8XMtC02aUy4kkC4YmdlVYrd010/OYuQi8pJ6K0zx12Fel8fB4RqdK2ugfMy8lYrvh1wPMQRi3hOPCNCmZlvYg0uaK3B7gkwa7qjPjVn0FebsZLi+qNLMzu7cb7aNCfYQLDvAIREPWfIdSCjj3ST7zAjRGxw=='

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
        localPicker.resumeScanning(true)
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

  return { run }
}

export default useScandit
