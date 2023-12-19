import { Box, Paper, useMediaQuery } from '@mui/material'
import { PdfViewer } from 'components/core-ui/PdfViewer'

const Bill = () => {
  const isXs = useMediaQuery('(max-width:624px)')
  return (
    <Box sx={!isXs ? { margin: '24px' } : { margin: '12px' }}>
      <Paper sx={{ pt: 0, pb: 2, minHeight: '400px' }}>
        <Box sx={{ pt: 0, overflow: 'hidden' }}>
          <PdfViewer
            actions={{
              downloadAction: { url: '/supply-omni/order/invoice/pdf', type: 'GET' },
              printAction: { url: '/supply-omni/order/invoice/print', type: 'POST' },
              printersAction: { url: '/supply-omni/printer', type: 'GET' }
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default Bill
