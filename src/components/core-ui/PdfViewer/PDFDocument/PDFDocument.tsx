import { useEffect, useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { useNotification } from 'hooks'
import { makeCoreGetRequest } from 'utils/api'
import s from './PDFDocument.modules.scss'
import { formatErrorMessage } from 'utils/formatting'
import CircularProgress from '@mui/material/CircularProgress'

// TODO add this in build
// [~] from https://github.com/wojtekmaj/react-pdf#use-external-cdn
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = 'static/pdfWorker/pdf.worker.min.js'

const PDFDocument = ({ pageNumber, scale, setNumPages, id, actions }) => {
  const [pdfFile, setPdfFile] = useState(null)

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      if (id == undefined) return

      try {
        const pdfResult = await makeCoreGetRequest(`${actions.downloadAction.url}/${id}`, {
          responseType: 'arraybuffer'
        })
        setPdfFile(pdfResult)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [id])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onDocumentLoadError = error => {
    if (error?.message == 'Worker was destroyed') {
      return
    }

    showNotification({
      message: `A aparut o eroare la afisarea fisierului. ${formatErrorMessage(error)}`,
      type: 'error'
    })
  }

  return id ? (
    <div className={s.PDFContainer}>
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<CircularProgress color="primary" style={{ margin: '40px auto' }} />}
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          loading={<CircularProgress color="primary" style={{ margin: '40px auto' }} />}
        />
      </Document>
    </div>
  ) : (
    <></>
  )
}

export default PDFDocument
