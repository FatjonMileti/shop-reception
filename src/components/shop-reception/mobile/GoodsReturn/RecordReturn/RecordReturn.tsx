import { Grid, Container, Box } from '@mui/material'
import { Button, Checkbox, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../constants'

const RecordReturn = () => {
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

        navigate(URLS.AUTH_RECORD_RETURN_DETAIL)

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
      <TitleHeader title='ÎNREGISTRARE RETUR' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='select'
                label='Destinație'
                variant='standard'
                width='100%'
                value={formik.values.destination}
                values={[
                  {
                    value: 'none',
                    label: 'Nu'
                  }
                ]}
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

export default RecordReturn
