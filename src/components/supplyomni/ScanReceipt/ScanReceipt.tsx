import s from './ScanReceipt.modules.scss'
import { ReceiptBarcodeScanner } from 'components/core-ui/ReceiptBarcodeScanner'

const ScanReceipt = () => {
  return (
    <div className={s.mainContainer}>
      <ReceiptBarcodeScanner
        action={{
          url: `/supply-omni/order/confirmation`,
          type: 'PUT',
          href: 'receiptInvoiceFinalized',
          variable: 'orderId'
        }}
      />
    </div>
  )
}

export default ScanReceipt
