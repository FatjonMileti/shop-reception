import { Grid, Container } from '@mui/material'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'

const ExpectedReturnDetail = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = formik.values
        navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_2)

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
      <TitleHeader title='RETURURI AȘTEPTATE CAMION' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='medium' component='p'>IF32KTL / ABCD</Typography>
              <Typography variant='medium' component='p'>ORADEA2 (25)</Typography>
            </Grid>
            <Grid item xs={10}>
              <Input
                type='select'
                label='Confirm Sigiliu'
                variant='standard'
                width='100%'
                value={formik.values.sealNumber}
                values={[
                  {
                    value: 'none',
                    label: 'DA'
                  }
                ]}
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
            <Grid item xs={10}>
              <Input
                type='select'
                label='Confirmă Aviz'
                variant='standard'
                width='100%'
                value={formik.values.opinion}
                values={[
                  {
                    value: 'none',
                    label: 'DA'
                  }
                ]}
                onChange={event => formik.setFieldValue('opinion', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.opinion}
                helperText={formik.errors.opinion as string}
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
                  label='PASUL URMĂTOR'
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

export default ExpectedReturnDetail
