import { useState, useEffect } from 'react'
import { DatePicker, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper } from '@mui/material'
import { useNotification, useScandit } from 'hooks'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCorePostRequest } from 'utils/api'
import { ProductBarcodeScannerProps } from '../ProductBarcodeScanner/ProductBarcodeScannerDefinitions'
import s from '../ProductBarcodeScanner/ProductBarcodeScanner.modules.scss'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { formatPayloadDate, isScannerDevice } from 'utils/helpers'
import { formatErrorMessage } from 'utils/formatting'
import dayjs from 'dayjs'

const ReceiptBarcodeScanner = (props: ProductBarcodeScannerProps) => {
  const { action } = props

  const [code, setCode] = useState('')
  const [receiptDate, setReceiptDate] = useState(dayjs().format('DD/MM/YYYY'))
  const [isVisible, setIsVisible] = useState(false)
  const [isContinueEnabled, setIsContinueEnabled] = useState(false)

  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const { id } = useParams()

  const [searchParams] = useSearchParams()

  const onScan = scanResult => {
    setCode(scanResult.barcodes[0].data)
    setIsVisible(false)
  }

  const { run, destroy } = useScandit({ onScan, isVisible })
  const [isUsingScandit, setIsUsingScandit] = useState(false) // [~] kept false until we're reasonably sure we're not running on a device with infrared scanner available, like Urovo

  const scanCode = () => {
    setIsVisible(true)
  }

  const sendReceipt = () => {
    if (code && receiptDate) {
      ;(async () => {
        if (action.type === 'POST') {
          try {
            const result = await makeCorePostRequest(`${action.url}`, {
              receiptId: code,
              proformaId: id,
              date: formatPayloadDate(receiptDate)
            })
            if (action.href) {
              await destroy()
              navigate(
                `${action.href}?${action.variable}=${code}&clientId=${searchParams.get('clientId')}`
              )
            }
          } catch (error) {
            showNotification({
              message: `A aparut o eroare la trimiterea bonului. ${formatErrorMessage(error)}`,
              type: 'error'
            })
          }
        }
      })()
    }
  }

  useEffect(() => {
    isScannerDevice(() => {
      try {
        run()
        setIsUsingScandit(true)
      } catch (error) {
        console.log(error)
      }
    })
  }, [])

  useEffect(() => {
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
        <div>
          <DatePicker
            label="Alege data bonului"
            value={receiptDate}
            variant="standard"
            required
            onChange={newValue => setReceiptDate(newValue)}
          />
        </div>
        <div className={s.buttonContainer}>
          {isUsingScandit && (
            <IconButton
              onClick={scanCode}
              label="Scaneaza"
              variant="outlined"
              startIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill="primary" />}
            />
          )}
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
            opacity: isVisible ? 1 : 0,
            marginTop: isVisible ? '16px' : '0'
          }}
        />
      </div>
    </Paper>
  )
}

export default ReceiptBarcodeScanner
