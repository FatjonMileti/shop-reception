import { Fragment, useState } from 'react'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { useNotification } from '../../../../../../../hooks'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { Container, Grid } from '@mui/material'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import ImageUpload from '../../../../Common/ImageUpload/ImageUpload'
import { URLS } from '../../../../constants'
import s from './TruckDetail.modules.scss'

const TruckDetail = () => {
  const [hasSealImage, setHasSealImage] = useState(false)
  const [hasThermodiagramImage, setHasThermodiagramImage] = useState(false)

  const navigate = useNavigate()
  const { showNotification } = useNotification()
  let { id } = useParams()

  const validationSchema = useMemo(() => getValidationSchema(), [])

  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const payload = { id: +id, ...values }
      try {
        await makeCorePostRequest('/shop-reception-mobile/truck/shop/approve', payload)

        const item = { id }
        navigate(URLS.AUTH_SUPPORT_SCAN_STEP_1, { state: { item } })
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const approveDisabled = useMemo(
    () =>
      (!!formik.values.sealList.length && !hasSealImage) ||
      !(formik.values.thermodiagramConform === null || hasThermodiagramImage),
    [
      hasSealImage,
      formik.values.sealList,
      formik.values.thermodiagramConform,
      hasThermodiagramImage
    ]
  )

  const { data: truck, isLoading } = useQuery(
    'truck',
    () => makeCoreGetRequest('/shop-reception-mobile/truck/shop/' + id, null),
    {
      onSuccess: (data: any) => {
        formik.setValues({
          temperature: null,
          thermodiagramConform: true,
          sealList: data.sealList?.map(seal => ({
            id: seal.id,
            code: seal.code,
            integral: true
          })),
          documentList: data.depositDocumentList?.map(doc => ({
            depositId: doc.depositId,
            depositName: doc.depositName,
            hasNotice: true,
            hasTransportNote: true
          }))
        })
      },
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

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

  const handleSealUploadSuccess = () => {
    setHasSealImage(true)
    handleSuccess()
  }

  const handleThermodiagramUploadSuccess = () => {
    setHasThermodiagramImage(true)
    handleSuccess()
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TitleHeader title="DETALIU CAMION" />
        </Grid>
        <Grid item xs={12}>
          {truck?.hubName && (
            <Typography variant="medium" component="p">
              HUB: {truck?.hubName}
            </Typography>
          )}
          <Typography variant="medium" component="p">
            Numǎr înmatriculare: {truck?.truckNumber}
          </Typography>
          {truck?.ticketCodeList.length > 0 && (
            <Typography variant="medium" component="p">
              Bon livrare:{' '}
              {truck?.ticketCodeList?.map((ticket, idx) => (
                <Fragment key={idx}>
                  {idx > 0 && <span>/</span>}
                  {ticket}
                </Fragment>
              ))}
            </Typography>
          )}
        </Grid>
        {formik.values.sealList?.map((seal, index) => (
          <Grid key={index} item xs={12} className={s.imageContainer}>
            <Grid container>
              <Grid item xs={12}>
                <Input
                  type="select"
                  label={`Confirm Sigiliu ${seal.code}`}
                  variant="standard"
                  width="80%"
                  value={seal.integral}
                  values={[
                    { value: 'true', label: 'DA' },
                    { value: 'false', label: 'NU' }
                  ]}
                  onChange={event =>
                    formik.setFieldValue(
                      `sealList[${index}].integral`,
                      (event.target as HTMLInputElement).value
                    )
                  }
                  error={!!formik.errors.sealList && !!formik.errors.sealList[index]}
                  helperText={
                    formik.errors.sealList && formik.errors.sealList[index]
                      ? formik.errors.sealList[index].integral
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <ImageUpload
                  uploadUrl={`/shop-reception-mobile/truck/shop/upload-shop/reception_seal/` + id}
                  onSuccess={handleSealUploadSuccess}
                  onError={handleError}
                  btnStyle={{ position: 'absolute', right: 0, top: '42px' }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
        {formik.values.documentList?.map((document, idx) => (
          <Grid key={idx} item xs={12} container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="medium" component="p">
                Confirm documentele pentru depozit {truck?.depositName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Input
                type="select"
                label="Aviz/BL"
                variant="standard"
                width="100%"
                value={document.hasNotice || 'none'}
                values={[
                  {
                    value: 'true',
                    label: 'DA'
                  },
                  {
                    value: 'false',
                    label: 'NU'
                  },
                  {
                    value: 'none',
                    label: 'NU E CAZUL'
                  }
                ]}
                onChange={event => {
                  formik.setFieldValue(
                    `documentList[${idx}].hasNotice`,
                    (event.target as HTMLInputElement).value === 'none'
                      ? null
                      : (event.target as HTMLInputElement).value
                  )
                }}
                error={!!formik.errors.documentList && !!formik.errors.documentList[idx]}
                helperText={
                  !!formik.errors.documentList && !!formik.errors.documentList[idx]
                    ? formik.errors.documentList[idx].hasNotice
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="select"
                label="Scrisoare de transport/CMR"
                variant="standard"
                width="100%"
                value={document.hasTransportNote || 'none'}
                values={[
                  {
                    value: 'true',
                    label: 'DA'
                  },
                  {
                    value: 'false',
                    label: 'NU'
                  },
                  {
                    value: 'none',
                    label: 'NU E CAZUL'
                  }
                ]}
                onChange={event => {
                  formik.setFieldValue(
                    `documentList[${idx}].hasTransportNote`,
                    (event.target as HTMLInputElement).value === 'none'
                      ? null
                      : (event.target as HTMLInputElement).value
                  )
                }}
                error={!!formik.errors.documentList && !!formik.errors.documentList[idx]}
                helperText={
                  !!formik.errors.documentList && !!formik.errors.documentList[idx]
                    ? formik.errors.documentList[idx].hasTransportNote
                    : ''
                }
              />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} className={s.imageContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Input
                type="select"
                label="Conformitate termodiagrama"
                variant="standard"
                width="80%"
                value={formik.values.thermodiagramConform || 'none'}
                values={[
                  {
                    value: 'true',
                    label: 'DA'
                  },
                  {
                    value: 'false',
                    label: 'NU'
                  },
                  {
                    value: 'none',
                    label: 'NU E CAZUL'
                  }
                ]}
                onChange={event => {
                  formik.setFieldValue(
                    'thermodiagramConform',
                    (event.target as HTMLInputElement).value === 'none'
                      ? null
                      : (event.target as HTMLInputElement).value
                  )
                }}
                error={!!formik.errors.thermodiagramConform}
                helperText={formik.errors.thermodiagramConform as string}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '24px' }}>
              <ImageUpload
                uploadUrl={
                  '/shop-reception-mobile/truck/shop/upload-shop/reception_thermodiagram/' + id
                }
                onSuccess={handleThermodiagramUploadSuccess}
                onError={handleError}
                btnStyle={{ position: 'absolute', right: 0, top: '42px' }}
              />
            </Grid>
          </Grid>
        </Grid>
        {formik.values.thermodiagramConform === 'false' && (
          <Grid item xs={12}>
            <Input
              type="number"
              label="Temperatură"
              variant="standard"
              width="100%"
              value={formik.values.temperature}
              onChange={event =>
                formik.setFieldValue('temperature', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.temperature}
              helperText={!!formik.errors.temperature}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            label="Aproba camion"
            style={{ width: '100%' }}
            onClick={() => !approveDisabled && formik.handleSubmit()}
            disabled={approveDisabled}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default TruckDetail
