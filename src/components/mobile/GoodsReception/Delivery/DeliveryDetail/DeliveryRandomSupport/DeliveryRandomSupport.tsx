import cs from '../../../../Common.modules.scss'
import { TitleHeader } from '../../../../TitleHeader'
import { Button, Divider, IconButton, Input, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Container, Grid, Paper } from '@mui/material'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import {
  getValidationSchema,
  initialValues
} from './helpers'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useFormik } from 'formik'
import { URLS } from '../../../../constants'

const DeliveryRandomSupport = () => {
  const navigate = useNavigate()
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT_FINAL)
    }
  })

  return (
    <Container component='main' maxWidth='xs' className={cs.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        SUPORT ALEATOR VALIDARE LIVRARE
      </Typography>
      <form>
        <Grid container spacing={2} className={cs.wrapper}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
              <Typography variant='medium' component='p'>SUPORT ALEATOR</Typography>
              <Typography variant='medium' component='p'>Număr Înmatriculare: 45745865416</Typography>
              <Typography variant='medium' component='p'>suport verificați: 0 / 4</Typography>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Input
              type='text'
              label='Cod suport'
              variant='standard'
              width='100%'
              value={formik.values.supportCode}
              onChange={event => formik.setFieldValue('supportCode', (event.target as HTMLInputElement).value)}
              error={!!formik.errors.supportCode}
              helperText={formik.errors.supportCode as string}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton>
              <ManageSearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Divider>SAU</Divider>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Grid container alignItems='center' justifyContent='center'>
              <Button
                type='button'
                variant='contained'
                label='SCANEAZǍ PRODUSE'
                onClick={() => formik.submitForm()}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default DeliveryRandomSupport