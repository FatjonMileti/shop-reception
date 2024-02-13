// import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo, useState } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { Container, Grid } from '@mui/material'
import s from './TruckDetail.modules.scss'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'

const TruckDetail = () => {
  const [showSealCamera, setShowSealCamera] = useState(false)
  const [sealImage, setSealImage] = useState(null)
  const { showNotification } = useNotification()

  const validationSchema = useMemo(() => getValidationSchema(), [])

  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = formik.values
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const onSealImageCapture = imageSrc => {
    console.log(imageSrc)
    setSealImage(imageSrc)
    setShowSealCamera(false)
  }

  return (
    <Container className={s.mainContainer}>
      {!showSealCamera && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TitleHeader title="DETALIU CAMION" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="medium" component="p">
              Numǎr înmatriculare: IF32KTL
            </Typography>
            <Typography variant="medium" component="p">
              Bon livrare: 61207
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Confirm Sigiliu"
              variant="standard"
              width="100%"
              value={formik.values.registrationNumber}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.registrationNumber}
              helperText={formik.errors.registrationNumber as string}
            />
            <IconButton onClick={() => setShowSealCamera(true)}>
              <CameraIcon />
            </IconButton>
            {sealImage && (
              <img src={sealImage} />
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="medium" component="p">
              Confirm documentele pentru depozit DEPOZIT DEVA APLS
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Aviz/BL"
              variant="standard"
              width="100%"
              value={formik.values.registrationNumber}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.registrationNumber}
              helperText={formik.errors.registrationNumber as string}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Scrisoare de transport/CMR"
              variant="standard"
              width="100%"
              value={formik.values.registrationNumber}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.registrationNumber}
              helperText={formik.errors.registrationNumber as string}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Conformitate termodiagrama"
              variant="standard"
              width="100%"
              value={formik.values.registrationNumber}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.registrationNumber}
              helperText={formik.errors.registrationNumber as string}
            />
            <IconButton>
              <CameraIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              label="APROBǍ CAMION"
              onClick={() => formik.handleSubmit()}
            />
          </Grid>
        </Grid>
      )}
      {showSealCamera && (
        <WebcamCapture
          onImageCapture={onSealImageCapture}
          videoConstraints={{
            width: 400,
            height: 225,
            facingMode: 'user'
          }}
        />
      )}
    </Container>
  )
}

export default TruckDetail
