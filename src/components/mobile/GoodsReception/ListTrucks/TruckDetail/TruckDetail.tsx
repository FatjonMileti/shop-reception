import { Grid, Container } from '@mui/material'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'

const TruckDetail = () => {
  const { showNotification } = useNotification()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = {
          registrationNumber: formik.values.registrationNumber,
          driver: formik.values.driver,
          sealNumber: formik.values.sealNumber
        }

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        DETALIU CAMION
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='medium' component='p'>Numǎr înmatriculare: IF32KTL</Typography>
              <Typography variant='medium' component='p'>Bon livrare: 61207</Typography>
            </Grid>
            <Grid item xs={10}>
              <Input
                type='select'
                label='Confirm Sigiliu'
                variant='standard'
                width='100%'
                value={formik.values.registrationNumber}
                values={[
                  {
                    value: 'none',
                    label: 'DA'
                  }
                ]}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton>
                <CameraIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='medium' component='p'>Confirm documentele pentru depozit DEPOZIT DEVA APLS</Typography>
            </Grid>
            <Grid item xs={12}>
              <Input
                type='select'
                label='Aviz/BL'
                variant='standard'
                width='100%'
                value={formik.values.registrationNumber}
                values={[
                  {
                    value: 'none',
                    label: 'DA'
                  }
                ]}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='select'
                label='Scrisoare de transport/CMR'
                variant='standard'
                width='100%'
                value={formik.values.registrationNumber}
                values={[
                  {
                    value: 'none',
                    label: 'DA'
                  }
                ]}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid item xs={10}>
              <Input
                type='select'
                label='Conformitate termodiagrama'
                variant='standard'
                width='100%'
                value={formik.values.registrationNumber}
                values={[
                  {
                    value: 'none',
                    label: 'DA'
                  }
                ]}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton>
                <CameraIcon />
              </IconButton>
            </Grid>

            <Grid container style={{ marginTop: '20px' }} spacing={2}>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='APROBǍ CAMION'
                  onClick={() => formik.handleSubmit()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TruckDetail
