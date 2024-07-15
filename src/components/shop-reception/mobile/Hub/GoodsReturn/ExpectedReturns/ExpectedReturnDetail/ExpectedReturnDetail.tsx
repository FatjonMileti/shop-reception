import { Grid } from '../../../../../Common/Grid'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import React, { useEffect, useState } from "react";
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { useNotification } from '../../../../../../../hooks'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URLS } from '../../../../constants'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../../utils/api'
import ImageUpload from '../../../../Common/ImageUpload/ImageUpload'
import { getValidationSchema, initialValues } from './helpers'
import { CircularProgress } from '@mui/material'

const ExpectedReturnDetail = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [uploadedSealImages, setUploadedSealImages] = useState([])
  const [uploadedNoticeImages, setUploadedNoticeImages] = useState([])
  const truckId = Number(params.get('id'))

  const [sealList, setSealList] = useState([])
  const [noticeList, setNoticeList] = useState([])
  const [canProceed, setCanProceed] = useState(false)

  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    onSubmit: async (values: any) => {
      try {
        const payload = {
          id: truck.id,
          truckNumber: truck.truckNumber,
          driverName: truck.driverName,
          shopNamesAndCodes: truck.shopNamesAndCodes,
          sealList: sealList,
          noticeList: noticeList
        }

        const resp = await makeCorePostRequest('/shop-reception-mobile/truck/hub/exit/verify-notices', noticeList)

        if (resp.hasNoticeDuplications) {
          showNotification({
            message: `${resp.message}`,
            type: 'error'
          })
        } else {
          await makeCorePostRequest('/shop-reception-mobile/truck/hub/exit/confirm-truck', payload)
          navigate(`${URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_2}?id=${truckId}`)
        }
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: truck, isLoading } = useQuery(
    'getById',
    async () => {
      const truck = await makeCoreGetRequest(
        '/shop-reception-mobile/truck/hub/exit/truck/' + truckId,
        null
      )
      setSealList(truck.sealList.map(seal => ({ ...seal, imageUploaded: false })))
      setNoticeList(truck.noticeList.map(notice => ({ ...notice, imageUploaded: false })))
      return truck
    },
    {
      initialData: [],
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const handleSuccess = (index, type) => {
    if (type === 'seal') {
      let updatedSealImages = [...uploadedSealImages]
      updatedSealImages[index] = true
      setUploadedSealImages(updatedSealImages)
      setSealList(prevState => {
        const updatedList = [...prevState]
        updatedList[index].imageUploaded = true
        return updatedList
      })
    } else {
      let updatedNoticeImages = [...uploadedNoticeImages]
      updatedNoticeImages[index] = true
      setUploadedNoticeImages(updatedNoticeImages)
      setNoticeList(prevState => {
        const updatedList = [...prevState]
        updatedList[index].imageUploaded = true
        return updatedList
      })
    }
    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    })
  }

  const handleError = error => {
    showNotification({
      message: `Error uploading image: ${error.message}`,
      type: 'error'
    })
  }

  useEffect(() => {
    const allSealsValid = sealList.every(seal => (seal.conform === true ? seal.imageUploaded : true))
    const allNoticesValid = noticeList.every(notice => (notice.correct === true ? notice.imageUploaded : true))

    setCanProceed(allSealsValid && allNoticesValid)
  }, [sealList, noticeList])

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="RETURURI AȘTEPTATE CAMION" />,
        <>
          {truck?.truckNumber && truck?.driverName && (
            <Typography variant="medium" component="p">
              {truck?.truckNumber + '/' + truck?.driverName}
            </Typography>
          )}
          <Typography variant="medium" component="p">
            {truck.shopNamesAndCodes}
          </Typography>
        </>,
        sealList.map((seal, idx) => (
          <div key={idx}>
            <Input
              type="select"
              label={'Confirm sigiliu ' + seal.sealCode}
              variant="standard"
              width="100%"
              value={seal.conform}
              values={[
                { value: 'true', label: 'Da' },
                { value: 'false', label: 'Nu' }
              ]}
              onChange={event => {
                const updatedSealList = [...sealList]
                updatedSealList[idx].conform = (event.target as HTMLInputElement).value === 'true';
                setSealList(updatedSealList)
              }}
            />
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/hub/upload/return_reception_seal/` + truckId}
              onSuccess={() => handleSuccess(idx, 'seal')}
              onError={handleError}
            />
          </div>
        )),
        <Typography variant="regular" component="p">
          Confirmă număr aviz
        </Typography>,
        noticeList.map((notice, idx) => (
          <div key={idx}>
            <Input
              type="select"
              label={'Confirm aviz ' + notice.shopName}
              variant="standard"
              width="100%"
              value={notice.correct}
              values={[
                { value: 'true', label: 'Da' },
                { value: 'false', label: 'Nu' }
              ]}
              onChange={event => {
                const updatedNoticeList = [...noticeList]
                updatedNoticeList[idx].correct = (event.target as HTMLInputElement).value === 'true';
                setNoticeList(updatedNoticeList)
              }}
            />
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/hub/upload/return_reception_notice/` + truckId}
              onSuccess={() => handleSuccess(idx, 'notice')}
              onError={handleError}
            />
          </div>
        )),
        canProceed && (
          <Button
            style={{ width: '100%' }}
            type="button"
            variant="contained"
            label="PASUL URMĂTOR"
            onClick={() => formik.handleSubmit()}
          />
        )
      ]}
      itemsPerRow={1}
    />
  )
}

export default ExpectedReturnDetail
