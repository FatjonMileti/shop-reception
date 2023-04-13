import * as ScanditSDK from 'scandit-sdk'

const licenseKey =
  'AdvCxxxqP9YMDLw4pEJP+dsPe9oXMocaM3lfSBh0s/aVVcbE5wXyA0UM1o80V+UrN2E3jX9d7ZV5XyHxOUBsVKp5yOdlfNJUwFPZNzx7tixcGAyEQQwBmEQllOq/Kf+TXFX3koaYYjYE4lFRIeWZAuicakUJdPasWE+TiDQzW25CVmprMQLQ67AtTO1q38y+ZbQ+b6kkH40AGWInUqvrZYg886XlyZa0NXqYnQUPVPj/LidmyCOYoQVK4oJoQokjIOaK9PuEEIuhxzj0PwCtJAea+LgqpBcZwhy6+dPijJ7ZMq4tc3I9XQAFVA3IUYBdsMuUg2PQKlTnR0ZmUnarXZYNY7gGMusaVaxManTSSOapGVNfuLT1DzkaKJvo+XfeT8Q9gTTkgzj2B0chuahu9PgId4djILV77u6p0gn7MqZxzu6mcXfAr+AbGgB7D95xYs75PrjPbCjVjVPNQJc5npy1eOt98EmRd8J483EyRwjiUAx7zvAKGgWN0SDpbPyL1Rk7zYRnKkQjfXmfHRpKYONAoFYCZVdDfxG6dOjvhgp+Tuz+LV4yvcHA23yVn6GVtpAeRbFcSmc7fm619b0/JRezllH8YtQ7pa06SHzJbdyhVU9/0ec0xsZnp9nbANJORv0GCYZD6Y6AyMh8XMtC02aUy4kkC4YmdlVYrd010/OYuQi8pJ6K0zx12Fel8fB4RqdK2ugfMy8lYrvh1wPMQRi3hOPCNCmZlvYg0uaK3B7gkwa7qjPjVn0FebsZLi+qNLMzu7cb7aNCfYQLDvAIREPWfIdSCjj3ST7zAjRGxw=='

const useScandit = () => {
  const run = async () => {
    ScanditSDK.configure(licenseKey, {
      // engineLocation: 'https://cdn.jsdelivr.net/npm/scandit-sdk'
      engineLocation: 'static/scandit'
    }).then(() => {
      ScanditSDK.BarcodePicker.create(document.getElementById('scandit-barcode-picker'), {
        playSoundOnScan: true,
        vibrateOnScan: true
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
          alert(
            scanResult.barcodes.reduce((string, barcode) => {
              return (
                string +
                `${ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${
                  barcode.data
                }\n`
              )
            }, '')
          )
        })
      })
    })
  }

  return { run }
}

export default useScandit

// import { useEffect } from 'react'
// import * as SDCCore from 'scandit-web-datacapture-core'
// import * as SDCBarcode from 'scandit-web-datacapture-barcode'

// declare global {
//   interface Window {
//     continueScanning: () => Promise<void>
//   }
// }

// const useScandit = () => {
//   async function run(): Promise<void> {
//     // Configure and load the library using your license key. The passed parameter represents the location of the wasm
//     // file, which will be fetched asynchronously. You must `await` the returned promise to be able to continue.
//     await SDCCore.configure({
//       licenseKey: 'AdvCxxxqP9YMDLw4pEJP+dsPe9oXMocaM3lfSBh0s/aVVcbE5wXyA0UM1o80V+UrN2E3jX9d7ZV5XyHxOUBsVKp5yOdlfNJUwFPZNzx7tixcGAyEQQwBmEQllOq/Kf+TXFX3koaYYjYE4lFRIeWZAuicakUJdPasWE+TiDQzW25CVmprMQLQ67AtTO1q38y+ZbQ+b6kkH40AGWInUqvrZYg886XlyZa0NXqYnQUPVPj/LidmyCOYoQVK4oJoQokjIOaK9PuEEIuhxzj0PwCtJAea+LgqpBcZwhy6+dPijJ7ZMq4tc3I9XQAFVA3IUYBdsMuUg2PQKlTnR0ZmUnarXZYNY7gGMusaVaxManTSSOapGVNfuLT1DzkaKJvo+XfeT8Q9gTTkgzj2B0chuahu9PgId4djILV77u6p0gn7MqZxzu6mcXfAr+AbGgB7D95xYs75PrjPbCjVjVPNQJc5npy1eOt98EmRd8J483EyRwjiUAx7zvAKGgWN0SDpbPyL1Rk7zYRnKkQjfXmfHRpKYONAoFYCZVdDfxG6dOjvhgp+Tuz+LV4yvcHA23yVn6GVtpAeRbFcSmc7fm619b0/JRezllH8YtQ7pa06SHzJbdyhVU9/0ec0xsZnp9nbANJORv0GCYZD6Y6AyMh8XMtC02aUy4kkC4YmdlVYrd010/OYuQi8pJ6K0zx12Fel8fB4RqdK2ugfMy8lYrvh1wPMQRi3hOPCNCmZlvYg0uaK3B7gkwa7qjPjVn0FebsZLi+qNLMzu7cb7aNCfYQLDvAIREPWfIdSCjj3ST7zAjRGxw==',
//       libraryLocation: new URL('library/engine/', document.baseURI).toString(),
//       moduleLoaders: [SDCBarcode.barcodeCaptureLoader({ highEndBlurryRecognition: false })]
//     })

//     // Create the data capture context.
//     const context: SDCCore.DataCaptureContext = await SDCCore.DataCaptureContext.create()

//     // Try to use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
//     // default and must be turned on to start streaming frames to the data capture context for recognition.
//     const camera: SDCCore.Camera = SDCCore.Camera.default
//     const cameraSettings = SDCBarcode.BarcodeCapture.recommendedCameraSettings
//     await camera.applySettings(cameraSettings)
//     await context.setFrameSource(camera)

//     // The barcode capturing process is configured through barcode capture settings,
//     // they are then applied to the barcode capture instance that manages barcode recognition.
//     const settings: SDCBarcode.BarcodeCaptureSettings = new SDCBarcode.BarcodeCaptureSettings()

//     // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
//     // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
//     // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
//     settings.enableSymbologies([
//       SDCBarcode.Symbology.EAN13UPCA,
//       SDCBarcode.Symbology.EAN8,
//       SDCBarcode.Symbology.UPCE,
//       SDCBarcode.Symbology.QR,
//       SDCBarcode.Symbology.DataMatrix,
//       SDCBarcode.Symbology.Code39,
//       SDCBarcode.Symbology.Code128,
//       SDCBarcode.Symbology.InterleavedTwoOfFive
//     ])

//     // Some linear/1D barcode symbologies allow you to encode variable-length data. By default, the Scandit
//     // Data Capture SDK only scans barcodes in a certain length range. If your application requires scanning of one
//     // of these symbologies, and the length is falling outside the default range, you may need to adjust the "active
//     // symbol counts" for this symbology. This is shown in the following few lines of code for one of the
//     // variable-length symbologies.
//     const symbologySettings: SDCBarcode.SymbologySettings = settings.settingsForSymbology(
//       SDCBarcode.Symbology.Code39
//     )
//     symbologySettings.activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

//     // Create a new barcode capture mode with the settings from above.
//     const barcodeCapture = await SDCBarcode.BarcodeCapture.forContext(context, settings)
//     // Disable the barcode capture mode until the camera is accessed.
//     await barcodeCapture.setEnabled(false)

//     // Register a listener to get informed whenever a new barcode got recognized.
//     barcodeCapture.addListener({
//       didScan: async (
//         barcodeCaptureMode: SDCBarcode.BarcodeCapture,
//         session: SDCBarcode.BarcodeCaptureSession
//       ) => {
//         // Hide the viewfinder.
//         await barcodeCaptureOverlay.setViewfinder(null)
//         // Disable the capture of barcodes until the user closes the displayed result.
//         await barcodeCapture.setEnabled(false)
//         const barcode: SDCBarcode.Barcode = session.newlyRecognizedBarcodes[0]
//         const symbology: SDCBarcode.SymbologyDescription = new SDCBarcode.SymbologyDescription(
//           barcode.symbology
//         )
//         showResult(`Scanned: ${barcode.data ?? ''} (${symbology.readableName})`)
//       }
//     })

//     // To visualize the ongoing barcode capturing process on screen, set up a data capture view that renders the
//     // camera preview. The view must be connected to the data capture context.
//     const view = await SDCCore.DataCaptureView.forContext(context)

//     // Connect the data capture view to the HTML element.
//     view.connectToElement(document.getElementById('data-capture-view')!)

//     // Add a control to be able to switch cameras.
//     view.addControl(new SDCCore.CameraSwitchControl())

//     // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
//     // the video preview. This is optional, but recommended for better visual feedback.
//     const barcodeCaptureOverlay: SDCBarcode.BarcodeCaptureOverlay =
//       await SDCBarcode.BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
//         barcodeCapture,
//         view,
//         SDCBarcode.BarcodeCaptureOverlayStyle.Frame
//       )
//     const viewfinder: SDCCore.Viewfinder = new SDCCore.RectangularViewfinder(
//       SDCCore.RectangularViewfinderStyle.Square,
//       SDCCore.RectangularViewfinderLineStyle.Light
//     )
//     await barcodeCaptureOverlay.setViewfinder(viewfinder)

//     // Switch the camera on to start streaming frames.
//     // The camera is started asynchronously and will take some time to completely turn on.
//     await camera.switchToDesiredState(SDCCore.FrameSourceState.On)
//     await barcodeCapture.setEnabled(true)

//     function showResult(result: string): void {
//       const resultElement = document.createElement('div')
//       resultElement.className = 'result'
//       resultElement.innerHTML = `<p class="result-text"></p><button onclick="continueScanning()">OK</button>`
//       resultElement.querySelector('.result-text')!.textContent = result
//       document.querySelector('#data-capture-view')!.append(resultElement)
//     }

//     window.continueScanning = async function continueScanning(): Promise<void> {
//       for (const r of document.querySelectorAll('.result')!) r.remove()
//       await barcodeCapture.setEnabled(true)
//       // Restore the viewfinder.
//       await barcodeCaptureOverlay.setViewfinder(viewfinder)
//     }
//   }

//   return { run }

//   // run().catch((error: unknown) => {
//   //   console.error(error)
//   //   alert(error)
//   // })
// }

// export default useScandit
