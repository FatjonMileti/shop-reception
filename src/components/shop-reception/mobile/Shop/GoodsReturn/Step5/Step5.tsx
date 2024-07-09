import { Grid } from '../../../../Common/Grid'
import { Button, Input, Typography } from "@fullscreendigital/carrefour-dex-fe";
import { TitleHeader } from '../../../Common/TitleHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { makeCorePostRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

const Step5 = () => {
  const { showNotification } = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentUrl, setCurrentUrl] = useState('')
  const id = location.state?.id || ''
  const notice = location.state?.notice

  const fetchPdfBlob = async () => {
    return await makeCorePostRequest(
      '/shop-reception-mobile/truck/shop/exit/notice-as-pdf',
      {
        id: notice.id,
        noticeNumber: notice.code
      },
      {
        responseType: 'blob'
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
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="COMANDǍ CAMION RETUR" />,
        <Typography variant='medium' component='p' style={{textAlign: 'center'}}>A fost generat avizul!</Typography>,
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
          <object data={currentUrl} type="application/pdf" width="100%" height="500px">
            <embed src={currentUrl} type="application/pdf" />
          </object>
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
