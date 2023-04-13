import * as React from 'react'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import Scanner from './Scanner'
import ScanditBarcodeScanner from 'scandit-sdk-react'
import { Barcode, ScanSettings, BarcodePicker } from 'scandit-sdk'
import { useScandit } from 'hooks'

const getScanSettings = () => {
  return new ScanSettings({ enabledSymbologies: [Barcode.Symbology.CODE128] })
}

const licenseKey =
  'AdvCxxxqP9YMDLw4pEJP+dsPe9oXMocaM3lfSBh0s/aVVcbE5wXyA0UM1o80V+UrN2E3jX9d7ZV5XyHxOUBsVKp5yOdlfNJUwFPZNzx7tixcGAyEQQwBmEQllOq/Kf+TXFX3koaYYjYE4lFRIeWZAuicakUJdPasWE+TiDQzW25CVmprMQLQ67AtTO1q38y+ZbQ+b6kkH40AGWInUqvrZYg886XlyZa0NXqYnQUPVPj/LidmyCOYoQVK4oJoQokjIOaK9PuEEIuhxzj0PwCtJAea+LgqpBcZwhy6+dPijJ7ZMq4tc3I9XQAFVA3IUYBdsMuUg2PQKlTnR0ZmUnarXZYNY7gGMusaVaxManTSSOapGVNfuLT1DzkaKJvo+XfeT8Q9gTTkgzj2B0chuahu9PgId4djILV77u6p0gn7MqZxzu6mcXfAr+AbGgB7D95xYs75PrjPbCjVjVPNQJc5npy1eOt98EmRd8J483EyRwjiUAx7zvAKGgWN0SDpbPyL1Rk7zYRnKkQjfXmfHRpKYONAoFYCZVdDfxG6dOjvhgp+Tuz+LV4yvcHA23yVn6GVtpAeRbFcSmc7fm619b0/JRezllH8YtQ7pa06SHzJbdyhVU9/0ec0xsZnp9nbANJORv0GCYZD6Y6AyMh8XMtC02aUy4kkC4YmdlVYrd010/OYuQi8pJ6K0zx12Fel8fB4RqdK2ugfMy8lYrvh1wPMQRi3hOPCNCmZlvYg0uaK3B7gkwa7qjPjVn0FebsZLi+qNLMzu7cb7aNCfYQLDvAIREPWfIdSCjj3ST7zAjRGxw=='

const BarcodeScanner = () => {
  // const [data, setData] = React.useState('')
  // const onResult = result => setData(result.text)
  // const onError = error => console.log(error)
  // return data ? (
  //   <div>
  //     <div>{data}</div>
  //     <Button label=" Scan again" variant="contained" onClick={() => setData('')} />
  //   </div>
  // ) : (
  //   <Scanner onResult={onResult} onError={onError} />
  // )
  // const [scannerReady, setScannerReady] = React.useState(false)
  // const [barCodeList, setBarCodeList] = React.useState([])

  // const addBarCodeHandler = barCode => {
  //   const list = barCodeList.concat(barCode)
  //   setBarCodeList(list)
  // }
  // const clearRecordsHandler = () => {
  //   setBarCodeList([])
  // }

  // console.log(barCodeList)

  // return (
  //   <div>
  //     <div>
  //       <ScanditBarcodeScanner
  //         licenseKey={licenseKey}
  //         laserArea={{ x: 0, y: 0, width: 1, height: 0.4 }}
  //         vibrateOnScan={true}
  //         scanSettings={getScanSettings()}
  //         playSoundOnScan={true}
  //         engineLocation="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build"
  //         onReady={() => setScannerReady(true)}
  //         onScan={scanResult => {
  //           debugger
  //           let barCode = scanResult.barcodes.reduce(function (string, barcode) {
  //             return (
  //               string + Barcode.Symbology.toHumanizedName(barcode.symbology) + ': ' + barcode.data
  //             )
  //           }, '')
  //           addBarCodeHandler(barCode)
  //         }}
  //       />
  //     </div>
  //     <div className="resultList">
  //       {barCodeList
  //         .reverse()
  //         .map(item => {
  //           return <p key={item}>{item}</p>
  //         })}
  //     </div>
  //     <div className="bottomControls">
  //       <button onClick={clearRecordsHandler}>CLEAR</button>
  //     </div>
  //   </div>
  // )

  // return (
  //   <ScanditBarcodeScanner
  //     // Library licensing & configuration options (see https://docs.scandit.com/stable/web/globals.html#configure)
  //     licenseKey="AdvCxxxqP9YMDLw4pEJP+dsPe9oXMocaM3lfSBh0s/aVVcbE5wXyA0UM1o80V+UrN2E3jX9d7ZV5XyHxOUBsVKp5yOdlfNJUwFPZNzx7tixcGAyEQQwBmEQllOq/Kf+TXFX3koaYYjYE4lFRIeWZAuicakUJdPasWE+TiDQzW25CVmprMQLQ67AtTO1q38y+ZbQ+b6kkH40AGWInUqvrZYg886XlyZa0NXqYnQUPVPj/LidmyCOYoQVK4oJoQokjIOaK9PuEEIuhxzj0PwCtJAea+LgqpBcZwhy6+dPijJ7ZMq4tc3I9XQAFVA3IUYBdsMuUg2PQKlTnR0ZmUnarXZYNY7gGMusaVaxManTSSOapGVNfuLT1DzkaKJvo+XfeT8Q9gTTkgzj2B0chuahu9PgId4djILV77u6p0gn7MqZxzu6mcXfAr+AbGgB7D95xYs75PrjPbCjVjVPNQJc5npy1eOt98EmRd8J483EyRwjiUAx7zvAKGgWN0SDpbPyL1Rk7zYRnKkQjfXmfHRpKYONAoFYCZVdDfxG6dOjvhgp+Tuz+LV4yvcHA23yVn6GVtpAeRbFcSmc7fm619b0/JRezllH8YtQ7pa06SHzJbdyhVU9/0ec0xsZnp9nbANJORv0GCYZD6Y6AyMh8XMtC02aUy4kkC4YmdlVYrd010/OYuQi8pJ6K0zx12Fel8fB4RqdK2ugfMy8lYrvh1wPMQRi3hOPCNCmZlvYg0uaK3B7gkwa7qjPjVn0FebsZLi+qNLMzu7cb7aNCfYQLDvAIREPWfIdSCjj3ST7zAjRGxw=="
  //     engineLocation="https://cdn.jsdelivr.net/npm/scandit-sdk@5.13.0/build/" // could also be a local folder, e.g. "build"
  //     // Picker events
  //     preloadBlurryRecognition={true}
  //     preloadEngine={true}
  //     onReady={console.log}
  //     onScan={() => {
  //       debugger
  //     }}
  //     // onScanError={console.log}
  //     // onSubmitFrame={console.log}
  //     // onProcessFrame={console.log}
  //     // Picker options
  //     scanSettings={getScanSettings()}
  //     playSoundOnScan={true}
  //     targetScanningFPS={30}
  //     vibrateOnScan={true}
  //     videoFit={BarcodePicker.ObjectFit.CONTAIN}
  //   />
  // )

  const { run } = useScandit()

  React.useEffect(() => {
    ;(async () => {
      await run()
    })()
  }, [])

  return <div id="scandit-barcode-picker" style={{ maxWidth: '400px', maxHeight: '400px' }} />
}

export default BarcodeScanner
