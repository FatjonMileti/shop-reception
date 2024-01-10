import { Grid, Container } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { toPayload } from './serializers'

const AddTruck = () => {
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
        const payload = toPayload(formik.values)

        navigate(URLS.AUTH_ADD_TRUCK_STEP_2)

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
      <TitleHeader title="ADAUGǍ CAMION" />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
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
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button
                type='button'
                variant='outlined'
                label='+ ADAUGǍ ALT SIGILIU'
              />
            </Grid>

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
    </Container>
  )
}

export default AddTruck
