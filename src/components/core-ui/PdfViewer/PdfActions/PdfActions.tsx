import { useMemo, useState } from 'react'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Add, Remove, FileDownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { useNotification } from 'hooks'
import { formatAndDownloadResponse } from 'utils/helpers'
import s from './PdfActions.modules.scss'
import { formatErrorMessage } from 'utils/formatting'
import { PrintersPopover } from './PrintersPopover'
import { makeCoreGetFileRequest } from 'utils/api'

const PdfActions = ({ pageNumber, numPages, scale, setScale, actions, id }) => {
  const { showNotification } = useNotification()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined

  const currentZoomPercent = useMemo(() => scale * 100, [scale])

  const zoomIn = () => setScale(scale + 0.25)

  const zoomOut = () => setScale(scale - 0.25)

  const download = async () => {
    try {
      const response = await makeCoreGetFileRequest(`${actions.downloadAction.url}/${id}`, {
        responseType: 'blob'
      })

      formatAndDownloadResponse(response)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const handlePrintBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePrintListClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={s.actions}>
      <div className={s.pageInfo}>
        {pageNumber}/{numPages}
      </div>
      <div className={s.zoomContainer}>
        <IconButton onClick={zoomOut} startIcon={<Remove />} variant="text" />
        <span className={s.zoomRatio}>{currentZoomPercent}%</span>
        <IconButton onClick={zoomIn} startIcon={<Add />} variant="text" />
      </div>
      <div className={s.buttons}>
        <IconButton onClick={download} startIcon={<FileDownloadOutlined />} variant="text" />
        <IconButton
          aria-describedby={popoverId}
          onClick={handlePrintBtnClick}
          startIcon={<PrintOutlined />}
          variant="text"
        />
        <PrintersPopover
          actions={actions}
          id={id}
          handlePrintListClose={handlePrintListClose}
          popoverId={popoverId}
          open={open}
          anchorEl={anchorEl}
        />
      </div>
    </div>
  )
}

export default PdfActions
