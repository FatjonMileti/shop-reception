import { Grid, Container, Paper } from '@mui/material'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { useNotification } from '../../../../../../hooks'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { toPayload } from './serializers'

const ContinueReturnDetailFinal = () => {
  const { showNotification } = useNotification()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = toPayload(formik.values)

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
      <TitleHeader title='CONTINUARE RETUR CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant='medium' component='p'>Numǎr camion: ASDS23</Typography>
                <Typography variant='medium' component='p'>Destinație: Hub Deva Abient</Typography>
                <Typography variant='medium' component='p'>Numǎr stive: 2</Typography>
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Input
                type='text'
                label='Numǎr Aviz hub'
                variant='standard'
                width='100%'
                value={formik.values.hubNumber}
                onChange={event => formik.setFieldValue('hubNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.hubNumber}
                helperText={formik.errors.hubNumber as string}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton>
                <CameraIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Input
                type='text'
                label='Numǎr Sigiliu'
                variant='standard'
                width='100%'
                value={formik.values.sealNumber}
                onChange={event => formik.setFieldValue('sealNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.sealNumber}
                helperText={formik.errors.sealNumber as string}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton>
                <CameraIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    type='button'
                    variant='contained'
                    label='ADAUGǍ ALT SIGILIU'
                    size='small'
                    onClick={null}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    type='button'
                    variant='contained'
                    label='FINALIZEAZǍ'
                    size='large'
                    onClick={() => formik.submitForm()}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ContinueReturnDetailFinal
