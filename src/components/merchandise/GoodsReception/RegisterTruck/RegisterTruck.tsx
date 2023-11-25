import { Grid, Container } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from './RegisterTruck.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import TitleHeader from '../../TitleHeader/TitleHeader'

const RegisterTruck = () => {
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
          username: formik.values.username,
          password: formik.values.password
        }

        console.log(payload)

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  return (
    <Container component="main" maxWidth="xs" className={s.container}>
      <TitleHeader />
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Typography component="h4" variant="medium"
                      style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
            ÎNREGISTREAZǍ CAMION
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type="text"
                label="Număr înmatriculare"
                variant="standard"
                width="100%"
                value={formik.values.registrationNumber}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: '20px' }}>
              <Button
                type="button"
                variant="contained"
                label="PASUL URMǍTOR"
                onClick={() => formik.handleSubmit()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RegisterTruck
