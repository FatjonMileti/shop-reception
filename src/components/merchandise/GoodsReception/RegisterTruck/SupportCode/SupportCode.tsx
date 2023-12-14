import { Grid, Container, Paper } from '@mui/material'
import { Button, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'

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
        Cod Suport
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
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
            <Grid item xs={2}>
              <IconButton
                onClick={() => {

                }}
              >
                <ManageSearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Divider>SAU</Divider>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='SCANEAZǍ SUPORT'
                  onClick={() => formik.handleSubmit()}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='medium' component='p'>Numǎr suport: 46565454516</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    type='select'
                    label='Tip Ambalaj'
                    variant='standard'
                    width='100%'
                    value={formik.values.registrationNumber}
                    values={[
                      {
                        value: 'none',
                        label: 'Palate'
                      }
                    ]}
                    onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                    error={!!formik.errors.registrationNumber}
                    helperText={formik.errors.registrationNumber as string}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Button
                      type='button'
                      variant='contained'
                      label='CONFORMITATE SUPORT'
                      onClick={() => null}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Button
                      type='button'
                      variant='contained'
                      label='ALTE AMBALAJE'
                      onClick={() => null}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems='center' justifyContent='center'>
                    <Button
                      type='button'
                      variant='contained'
                      label='CONFIRM TIP SUPORT'
                      onClick={() => null}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant='medium' component='p'>Numǎr camion: 56</Typography>
                <Typography variant='medium' component='p'>Numǎr suporți scanați: 0</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SupportCode
