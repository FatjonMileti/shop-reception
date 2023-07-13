import { Paper, Box } from '@mui/material'
import { Alert, Button } from '@fullscreendigital/carrefour-dex-fe'
import s from './ReceiptInvoiceFinalized.modules.scss'
import { renderComponent } from 'utils/dynamicRenderingService'

const ReceiptInvoiceFinalized = props => {
  const { buttons } = props

  return (
    <Paper className={s.container}>
      <Alert severity="success">Comanda finalizata</Alert>
      <Box className={s.btnContainer}>
        {buttons.map(button =>
          renderComponent({
            ...button,
            key: button.id
          })
        )}
      </Box>
    </Paper>
  )
}

export default ReceiptInvoiceFinalized
