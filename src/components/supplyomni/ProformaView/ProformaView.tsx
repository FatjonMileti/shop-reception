import s from './ProformaView.modules.scss'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { PdfViewer } from 'components/core-ui/PdfViewer'

const ProformaView = () => {
  const { id } = useParams()

  return (
    <div className={s.mainContainer}>
      <Grid item xs={12}>
        <Typography color={'grey'}>PDF proforma: {id}</Typography>
      </Grid>

      <Grid item xs={12}>
        <PdfViewer
          action={{
            url: `/supply-omni/order/proforma`,
            type: 'GET'
          }}
          actions={{
            downloadAction: { url: '/supply-omni/order/proforma/pdf', type: 'GET' },
            printAction: { url: '/supply-omni/order/proforma/print', type: 'GET' },
            scanReceiptAction: { href: '/supplyOmni/scanReceipt', label: 'Scaneaza bon' },
            printersAction: { url: '/supply-omni/printer', type: 'GET' }
          }}
        />
      </Grid>
    </div>
  )
}

export default ProformaView
