import { Grid, Container, Box } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../constants'

const RegisterTruck = () => {
  const navigate = useNavigate()
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

        navigate(URLS.AUTH_SUPPORT_CODE)

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='ÎNREGISTREAZǍ CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Număr înmatriculare'
                variant='standard'
                width='100%'
                value={formik.values.registrationNumber}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='PASUL URMǍTOR'
                  onClick={() => formik.handleSubmit()}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RegisterTruck
