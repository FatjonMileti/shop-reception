import { Paper, Box } from '@mui/material'
import { Alert, Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './ReceiptInvoiceFinalized.modules.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ReceiptInvoiceFinalized: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const clientId = searchParams.get('clientId')
  const orderId = searchParams.get('orderId')

  return (
    <Paper className={s.container}>
      <Alert severity="success">Comandă finalizată</Alert>
      <Box className={s.btnContainer}>
        <Button
          variant="contained"
          label="Factură fiscală"
          onClick={() =>
            navigate(`/supplyOmni/receiptClientDetails/${clientId}?orderId=${orderId}`)
          }
        />
        <Button variant="contained" label="Vânzările mele" onClick={() => {
          navigate(`/supplyOmni/sales`)
        }} />
      </Box>
    </Paper>
  )
}

export default ReceiptInvoiceFinalized
