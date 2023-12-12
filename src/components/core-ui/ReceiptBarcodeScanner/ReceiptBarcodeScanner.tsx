import { useState, useEffect } from 'react'
import { DatePicker, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Paper, Grid, Stack, Box, useMediaQuery } from '@mui/material'
import { useNotification, useScandit } from 'hooks'
import { Icon } from 'components/core-ui/Icon'
import cn from 'classnames'
import { makeCorePutRequest } from 'utils/api'
import { ProductBarcodeScannerProps } from '../ProductBarcodeScanner/ProductBarcodeScannerDefinitions'
import s from '../ProductBarcodeScanner/ProductBarcodeScanner.modules.scss'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { formatPayloadDate, isScannerDevice } from 'utils/helpers'
import { formatErrorMessage } from 'utils/formatting'
import dayjs from 'dayjs'

const ReceiptBarcodeScanner = (props: ProductBarcodeScannerProps) => {
  const { action } = props

  const [code, setCode] = useState('')
  const [receiptDate, setReceiptDate] = useState(dayjs())
  const [isVisible, setIsVisible] = useState(false)
  const isXs = useMediaQuery('(max-width:624px)')
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
        if (action.type === 'PUT') {
          try {
            await makeCorePutRequest(`${action.url}/${id}`, {
              fiscalTicketId: code,
              fiscalTicketDate: formatPayloadDate(receiptDate)
            })

            if (action.href) {
              await destroy()
              navigate(
                `/supplyOmni/${action.href}?${action.variable}=${id}&clientId=${searchParams.get(
                  'clientId'
                )}`
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
    <div>
      <Grid container>
        <Grid xs={12} sm={12} md={6} lg={6} item>
          <div className={s.scannerControlItem} style={{ marginBottom: '16px' }}>
            <Input
              value={code}
              type="text"
              variant="outlined"
              label="Introdu codul bonului"
              fullWidth
              onChange={event => setCode(event.currentTarget.value)}
              id="receipt-scan-input"
              required
            />
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} item>
          <div className={s.pickerContainer} style={{ paddingLeft: 0, marginBottom: '16px' }}>
            <DatePicker
              label="Alege data bonului"
              value={receiptDate}
              variant="outlined"
              style={{
                padding: 0,
                width: '100%',
                '& .MuiTextField-root': { padding: 0, width: '100%' }
              }}
              closeButtonLabel="Inchide"
              confirmButtonLabel="Confirma"
              required
              onChange={newValue => setReceiptDate(newValue)}
            />
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <Stack
            sx={{ mt: 1, mb: 3 }}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 1, md: 1 }}
          >
            {isUsingScandit && (
              <Box sx={!isXs ? {} : { width: '100%' }}>
                <IconButton
                  sx={!isXs ? {} : { width: '100%' }}
                  onClick={scanCode}
                  label="Scaneaza"
                  variant="outlined"
                  startIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill="primary" />}
                />
              </Box>
            )}
            <Box sx={!isXs ? {} : { width: '100%' }}>
              <IconButton
                sx={!isXs ? {} : { width: '100%' }}
                onClick={sendReceipt}
                label="Continua"
                variant="contained"
                endIcon={<Icon iconName="ArrowRightSharp" tiny={true} fill="white" />}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid xs={12} md={12} lg={6} item>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default ReceiptBarcodeScanner
