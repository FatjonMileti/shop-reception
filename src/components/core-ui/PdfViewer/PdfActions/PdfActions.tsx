import { useMemo } from 'react'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Add, Remove, FileDownloadOutlined, PrintOutlined } from '@mui/icons-material'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { downloadFile } from 'utils/helpers'
import s from './PdfActions.modules.scss'

const PdfActions = ({ pageNumber, numPages, scale, setScale, actions, id }) => {
  const { showNotification } = useNotification()

  const currentZoomPercent = useMemo(() => scale * 100, [scale])

  const zoomIn = () => setScale(scale + 0.25)

  const zoomOut = () => setScale(scale - 0.25)

  const download = () => {
    try {
      downloadFile(`${actions.downloadAction.url}/${id}`)
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la descarcarea fisierului. ${error?.message}`,
        type: 'error'
      })
    }
  }

  const print = async () => {
    try {
      if (actions.printAction.type === 'GET') {
        await makeCoreGetRequest(`${actions.printAction.url}/${id}`)
      }
      if (actions.printAction.type === 'POST') {
        await makeCorePostRequest(`${actions.printAction.url}/${id}`)
      }

      showNotification({
        message: 'Fisierul a fost printat cu succes',
        type: 'success'
      })
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la printarea fisierului. ${error?.message}`,
        type: 'error'
      })
    }
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
        <IconButton onClick={print} startIcon={<PrintOutlined />} variant="text" />
      </div>
    </div>
  )
}

export default PdfActions
