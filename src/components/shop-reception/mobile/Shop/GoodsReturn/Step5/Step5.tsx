import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { makeCorePostRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { useEffect, useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import CircularProgress from '@mui/material/CircularProgress'

const Step5 = () => {
  const { showNotification } = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentUrl, setCurrentUrl] = useState('')
  const id = location.state?.id || ''
  const notice = location.state?.notice
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(0.5)
  const [pdfFile, setPdfFile] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (id == undefined) return

      try {
        const pdfResult = await makeCorePostRequest(
          '/shop-reception-mobile/truck/shop/exit/notice-as-pdf',
          {
            id: notice.id,
            noticeNumber: notice.code
          },
          {
            responseType: 'arraybuffer'
          }
        )

        // await makeCoreGetRequest(url, {
        //   responseType: 'arraybuffer'
        // })
        setPdfFile(pdfResult)
      } catch (error) {
        showNotification({
          message: `A aparut o eroare la descarcarea fisierului. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [id])

  const fetchPdfBlob = async () => {
    return await makeCorePostRequest(
      '/shop-reception-mobile/truck/shop/exit/notice-as-pdf',
      {
        id: notice.id,
        noticeNumber: notice.code
      },
      {
        responseType: 'arraybuffer'
      }
    )
  }

  const {
    data: pdfBlob,
    isLoading: isLoadingPdf,
    error
  } = useQuery('pdfBlob', fetchPdfBlob, {
    onError: error => {
      showNotification({
        message: `Error while fetching pdf. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  })

  const blobToBase64 = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.onerror = e => {
        console.error('FileReader error:', e)
        reject(e)
      }
      reader.readAsDataURL(blob)
    })
  }

  useEffect(() => {
    if (pdfBlob) {
      ;(async () => {
        try {
          const base64Pdf: any = await blobToBase64(pdfBlob)
          const dataUrl = `data:application/pdf;base64,${base64Pdf.split(',')[1]}`
          setCurrentUrl(dataUrl)
        } catch (error) {
          console.error('Conversion error:', error)
          showNotification({
            message: `Error while converting blob to base64. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        }
      })()
    }
  }, [pdfBlob])

  const print = () => {
    if (currentUrl) {
    }
  }

  if (isLoadingPdf) {
    return <div>Loading...</div>
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const onDocumentLoadError = error => {
    if (error?.message == 'Worker was destroyed') {
      return
    }

    showNotification({
      message: `A aparut o eroare la afisarea fisierului. ${error.message}`,
      type: 'error'
    })
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="COMANDǍ CAMION RETUR" />,
        <Input
          type="text"
          label="Număr aviz"
          variant="outlined"
          width="100%"
          value={notice?.code}
          readonly
        />,
        <Input
          type="text"
          label="Seria aviz"
          variant="outlined"
          width="100%"
          value={notice?.noticeSeries}
          readonly
        />,
        <Button
          type="button"
          variant="contained"
          label="PRINTEAZǍ"
          onClick={() => print()}
          style={{ width: '100%' }}
        />,
        currentUrl && (
          <div>
            <Document
              file={pdfBlob}
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
        ),
        <Button
          type="button"
          variant="contained"
          label="AM TERMINAT"
          onClick={() => navigate('/GoodsReturn')}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step5
