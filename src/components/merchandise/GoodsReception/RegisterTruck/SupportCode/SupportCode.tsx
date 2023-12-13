import { Grid, Container, Paper } from '@mui/material'
import { Button, Divider, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'

const SupportCode = () => {
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
          supportCode: formik.values.supportCode
        }

        showNotification({
          message: 'codul de suport nu a fost găsit',
          type: 'warning'
        })

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
        ÎNREGISTREAZǍ CAMION
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Cod Suport'
                variant='standard'
                width='100%'
                value={formik.values.supportCode}
                onChange={event => formik.setFieldValue('supportCode', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.supportCode}
                helperText={formik.errors.supportCode as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider>SAU</Divider>
            </Grid>
            <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='SCANEAZǍ SUPORT'
                onClick={() => formik.handleSubmit()}
              />
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant="medium" component="p">Numǎr camion: 56</Typography>
                <Typography variant="medium" component="p">Numǎr suporți scanați: 0</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SupportCode
