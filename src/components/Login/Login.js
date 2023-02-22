import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import s from './Login.scss'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { loginRedirect } from 'utils/api'
import { Input, Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { authenticate } from 'utils/authService'
import cn from 'classnames'

const Login = props => {
  const formSubmit = async values => {
    const { username, password } = values

    try {
      // const response = await makePostRequest('/v1/users/signin', {
      //   username: username.trim().toLowerCase(),
      //   password
      // })
      if (!username && !password) {
        throw 'Error logging in'
      }
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJbnZvaWNlIiwiaWF0IjoxNjcxMDI0ODkzLCJleHAiOjE3MDI1NjA5NTksImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6ImFkbWluMSJ9.vM4-YbiGlmzYNWyP7PtrATvYwcZjxTpIDUypZFrMJNQ'
      authenticate(token)
      loginRedirect()
    } catch (error) {
      alert('Error logging in')
    }
  }

  return (
    <Formik
      props={props}
      initialValues={{ username: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        formSubmit(values).then(() => setTimeout(() => setSubmitting(false), 2000))
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Nume utilizator este necesar!'),
        password: Yup.string().required('Parola este necesara!')
      })}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange, handleSubmit } = props

        return (
          <div className={s.loginWrapper}>
            <Container className={s.loginContainer}>
              <Paper className={s.loginPaper}>
                <Box className={s.loginBox}>
                  <Link className={s.logo} href="/">
                    <img src="images/logo2.jpeg" />
                  </Link>
                  <Typography component="h3" variant="medium">
                    Autentificare
                  </Typography>
                  <Typography component="p">Autentificare in platforma de facturi.</Typography>
                </Box>
                <Box className={cn(s.loginBox, s.formContainer)}>
                  <form onSubmit={handleSubmit}>
                    <div className={s.formItem}>
                      <Input
                        label="Utilizator"
                        onChange={handleChange}
                        type="text"
                        name="username"
                        variant="outlined"
                        value={values.username}
                        disabled={isSubmitting}
                        fullWidth
                        error={errors.username && touched.username}
                        helperText={errors.username}
                      />
                    </div>
                    <div className={s.formItem}>
                      <Input
                        label="Parola"
                        onChange={handleChange}
                        type="password"
                        name="password"
                        variant="outlined"
                        value={values.password}
                        disabled={isSubmitting}
                        fullWidth
                        width="100%"
                        error={errors.password && touched.password}
                        helperText={errors.password}
                      />
                    </div>
                    <div className={s.formItem}>
                      <Button
                        gradient="blue"
                        label="Log in"
                        variant="contained"
                        style={{ width: '100%' }}
                        type="submit"
                      />
                    </div>
                  </form>
                </Box>
              </Paper>
            </Container>
          </div>
        )
      }}
    </Formik>
  )
}

export default Login
