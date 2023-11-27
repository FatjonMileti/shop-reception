import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { PdfViewer } from './PdfViewer'
import { makeCoreGetRequest } from 'utils/api'
import { useNotification } from 'hooks'
import s from './ProformaView.modules.scss'
import { formatErrorMessage } from 'utils/formatting'

const ProformaView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [proform, setProform] = useState(null)

  const { id } = useParams()

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      if (id == undefined) return

      try {
        setIsLoading(true)
        const proformResult = await makeCoreGetRequest(`/supply-omni/order/proforma/${id}`)
        setProform(proformResult)
        setIsLoading(false)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [id])

  return (
    <div className={s.mainContainer}>
      <Grid item xs={12}>
        <Typography color={'grey'}>PDF proforma: {proform.proformaId}</Typography>
      </Grid>

      <Grid item xs={12}>
        <PdfViewer
          proform={proform}
          isLoading={isLoading}
          actions={{
            downloadAction: { url: '/supply-omni/order/proforma/pdf', type: 'GET' },
            printAction: { url: '/supply-omni/order/proforma/print', type: 'POST' },
            scanReceiptAction: { href: '/supplyOmni/scanReceipt', label: 'Scaneaza bon' },
            printersAction: { url: '/supply-omni/printer', type: 'GET' }
          }}
        />
      </Grid>
    </div>
  )
}

export default ProformaView
