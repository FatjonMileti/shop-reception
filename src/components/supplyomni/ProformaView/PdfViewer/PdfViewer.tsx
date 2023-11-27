import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PdfViewerProps } from './PdfViewerDefinitions'
import { PdfActions } from './PdfActions'
import { PDFDocument } from './PDFDocument'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import s from './PdfViewer.modules.scss'
import '!style-loader!css-loader!react-pdf/dist/esm/Page/TextLayer.css'
import '!style-loader!css-loader!react-pdf/dist/esm/Page/AnnotationLayer.css'
import { CircularProgress, useMediaQuery } from '@mui/material'
import { Icon } from 'components/core-ui/Icon'

const PdfViewer = (props: PdfViewerProps) => {
  const { actions, proform, isLoading } = props

  const { id } = useParams()

  const navigate = useNavigate()

  // [~] from https://github.com/wojtekmaj/react-pdf#usage
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)

  const isXs = useMediaQuery('(max-width:624px)')

  useEffect(() => {
    setScale(isXs ? 0.75 : 1.0)
  }, [isXs])

  const scanReceipt = () => {
    navigate(`${actions.scanReceiptAction.href}/${id}?clientId=${proform.clientId}`)
  }

  // [~] on back from this page we get called with id=undefined by ..
  return id ? (
    isLoading ? (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    ) : (
      <div>
        <div className={s.scanReceiptContainer}>
          {!proform?.paid && actions.scanReceiptAction && (
            <IconButton
              onClick={scanReceipt}
              label={actions.scanReceiptAction.label}
              variant="contained"
              endIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill="white" />}
            />
          )}
        </div>
        <div className={s.PDFViewer}>
          <PdfActions
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            setScale={setScale}
            actions={actions}
            id={id}
          />
          <PDFDocument
            pageNumber={pageNumber}
            scale={scale}
            setNumPages={setNumPages}
            id={id}
            actions={actions}
          />
        </div>
      </div>
    )
  ) : (
    <></>
  )
}

export default PdfViewer
