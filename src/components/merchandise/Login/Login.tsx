import { Grid, Container } from '@mui/material'
import { Input, Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useFormik } from 'formik'
import { useNotification } from 'hooks'
import { formatErrorMessage } from '../../../utils/formatting'
import { useMemo } from 'react'
import { getValidationSchema } from './helpers'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../constants'
import FlagIcon from '@mui/icons-material/Flag'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'

const Login = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: {
      language: 'romanian',
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = {
          language: formik.values.language,
          username: formik.values.username,
          password: formik.values.password
        }

        console.log(payload)

        navigate(URLS.AUTH_MERCHANDISE_HOME, { replace: true })
      } catch (error) {
        showNotification({
          message: `Error while signing in. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })
  return (
    <Container component='main' maxWidth='xs' style={{ margin: 'auto', marginTop: '20px' }}>
      <Typography component='h1' variant='medium' style={{ textAlign: 'center' }}>
        Bine ai venit!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            type='select'
            label='Limba'
            variant='standard'
            values={[
              {
                value: 'romanian',
                label: 'Românǎ'
              },
              {
                value: 'english',
                label: 'English'
              }
            ]}
            width='100%'
            // infoIcon={<FlagIcon />}
            value={formik.values.language}
            onChange={event => formik.setFieldValue('language', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.language}
            helperText={formik.errors.language as string}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type='text'
            label='Nume utlizator'
            variant='standard'
            fullWidth={true}
            // infoIcon={<PersonIcon />}
            value={formik.values.username}
            onChange={event => formik.setFieldValue('username', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.username}
            helperText={formik.errors.username as string}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type='password'
            label='Parolǎ'
            variant='standard'
            width='100%'
            // infoIcon={<LockIcon />}
            value={formik.values.password}
            onChange={event => formik.setFieldValue('password', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.password}
            helperText={formik.errors.password as string}
          />
        </Grid>
        <Grid container alignItems='center' justifyContent='center' style={{ marginTop: '20px' }}>
          <Button
            type='submit'
            variant='contained'
            label='AUTENTIFICARE'
            onClick={() => formik.handleSubmit()}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
