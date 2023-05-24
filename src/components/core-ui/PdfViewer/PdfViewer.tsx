import * as React from 'react'
import { pdfjs, Document, Page } from 'react-pdf';
import { useLocation } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api';
import { useNotification } from 'hooks'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PdfViewer = () => {
  const location = useLocation()
  const { pdfUrl } = location.state || {}

  const [pdfFile, setPdfFile] = React.useState(null)

  const { showNotification } = useNotification()

  React.useEffect(() => {
    ;(async () => {
      try {
        const result = await makeCoreGetRequest(pdfUrl, { responseType: 'arraybuffer' })
        setPdfFile(result)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la descarcarea fisierului. ${error?.message}`,
          type: 'error'
        })
      }
    })()
  }, [])

  // [~] from https://github.com/wojtekmaj/react-pdf#use-external-cdn
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  // [~] from https://github.com/wojtekmaj/react-pdf#usage
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error) {
    showNotification({
      message: `A aparut o eroare la afisarea fisierului. ${error?.message}`,
      type: 'error'
    })
  }

  return (
    <div>
      <Document file={{data: pdfFile}} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PdfViewer
