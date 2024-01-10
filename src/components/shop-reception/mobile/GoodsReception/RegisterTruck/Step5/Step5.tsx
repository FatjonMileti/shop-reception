import { Grid, Container } from '@mui/material'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { TitleHeader } from '../../../TitleHeader'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'

const Step5 = () => {
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

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader title='ÎNREGISTREAZǍ CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Destinație'
                variant='standard'
                width='100%'
                value={formik.values.destination}
                onChange={event => formik.setFieldValue('destination', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.destination}
                helperText={formik.errors.destination as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Numǎr înmatriculare'
                variant='standard'
                width='100%'
                value={formik.values.registrationNumber}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Șofer'
                variant='standard'
                width='100%'
                value={formik.values.driver}
                onChange={event => formik.setFieldValue('driver', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.driver}
                helperText={formik.errors.driver as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox
                checked={formik.values.isPackingReturn}
                onChange={event => formik.setFieldValue('isPackingReturn', (event.target as HTMLInputElement).checked)}
                label='Retur ambalaje'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    type='button'
                    variant='contained'
                    label='PASUL URMǍTOR'
                    onClick={() => formik.handleSubmit()}
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

export default Step5
