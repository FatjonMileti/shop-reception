import { Grid } from '../../../../../Common/Grid'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import React, { useMemo } from 'react'
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
  const truckId = Number(params.get('id'))

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = {
          id: truck.id,
          truckNumber: truck.truckNumber,
          driverName: truck.driverName,
          shopNamesAndCodes: truck.shopNamesAndCodes,
          sealList: formik.values.sealList,
          noticeList: formik.values.noticeList
        }

        const resp = await makeCorePostRequest(
          '/shop-reception-mobile/truck/hub/exit/verify-notices',
          formik.values.noticeList,
          null
        )

        if (resp.hasNoticeDuplications) {
          showNotification({
            message: `${resp.message}`,
            type: 'error'
          })
        } else {
          await makeCorePostRequest(
            '/shop-reception-mobile/truck/hub/exit/confirm-truck',
            payload,
            null
          )
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
      await formik.setValues({
        sealList: truck.sealList,
        noticeList: truck.noticeList
      })
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

  const handleSuccess = () => {
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
        formik.values?.sealList?.map((seal, idx) => (
          <div style={{ display: 'flex', marginTop: '20px' }}>
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
              onChange={event =>
                formik.setFieldValue(
                  `sealList[${idx}].conform`,
                  (event.target as HTMLInputElement).value
                )
              }
              error={!!formik.errors?.sealList?.[idx]?.conform}
              helperText={formik.errors?.sealList?.[idx]?.conform as string}
            />
            ,
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/hub/upload/return_reception_seal/` + truckId}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )),
        <Typography variant="regular" component="p">
          Confirmă număr aviz
        </Typography>,
        formik.values?.noticeList?.map((notice, idx) => (
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <Input
              type="select"
              label={'Confirm sigiliu ' + notice.shopName}
              variant="standard"
              width="100%"
              value={notice.correct}
              values={[
                { value: 'true', label: 'Da' },
                { value: 'false', label: 'Nu' }
              ]}
              onChange={event =>
                formik.setFieldValue(
                  `noticeList[${idx}].correct`,
                  (event.target as HTMLInputElement).value
                )
              }
              error={!!formik.errors?.noticeList?.[idx]?.correct}
              helperText={formik.errors?.noticeList?.[idx]?.correct as string}
            />
            ,
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/hub/upload/return_reception_seal/` + truckId}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )),
        <Button
          style={{ width: '100%' }}
          type="button"
          variant="contained"
          label="PASUL URMĂTOR"
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ExpectedReturnDetail
