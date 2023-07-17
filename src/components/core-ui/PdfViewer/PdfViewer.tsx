import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { makeCoreGetRequest } from 'utils/api'
import { useDataStore, useNotification } from 'hooks'
import { PdfViewerProps } from './PdfViewerDefinitions'
import { PdfActions } from './PdfActions'
import { PDFDocument } from './PDFDocument'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from '../Icon'
import s from './PdfViewer.modules.scss'

import '!style-loader!css-loader!react-pdf/dist/esm/Page/TextLayer.css'
import '!style-loader!css-loader!react-pdf/dist/esm/Page/AnnotationLayer.css'
import { useMediaQuery } from '@mui/material'

const PdfViewer = (props: PdfViewerProps) => {
  const { action, actions } = props

  const { id } = useParams()

  const navigate = useNavigate()

  const [proform, setProform] = React.useState(null)
  // [~] from https://github.com/wojtekmaj/react-pdf#usage
  const [numPages, setNumPages] = React.useState(null)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [scale, setScale] = React.useState(1.0)

  const { showNotification } = useNotification()
  const { storeData, retrieveData } = useDataStore()

  React.useEffect(() => {
    ;(async () => {
      if (id == undefined)
        return
        
      try {
        const proformResult = await makeCoreGetRequest(`${action.url}/${id}`)
        setProform(proformResult)
        if (action.storeIn) {
          storeData(action.storeIn, proformResult) // [~] if we store the response first, then this 'response' variable becomes read-only and the following toTableRowItems throws an error
          // console.log("stored in ", action.storeIn)
        }  
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la descarcarea fisierului. ${error?.message}`,
          type: 'error'
        })
      }
    })()
  }, [id])

  const isXs = useMediaQuery('(max-width:624px)')

  React.useEffect(() => {
    setScale(isXs ? 0.75 : 1.0)
  }, [isXs])

  const scanReceipt = () => {
    navigate(`${actions.scanReceiptAction.href}/${id}?clientId=${retrieveData("proformaDetails.client")}`)
  }

  // [~] on back from this page we get called with id=undefined by react...
  return (id ?
    <div>
      <div className={s.scanReceiptContainer}>
        {proform?.isActive && (<IconButton
          onClick={scanReceipt}
          label={actions.scanReceiptAction.label}
          variant="contained"
          endIcon={<Icon iconName="QrCodeScannerOutlined" tiny={true} fill="white" />}
        />)}
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
  : <></>)
}

export default PdfViewer
