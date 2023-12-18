import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { URLS } from '../../../../constants'
import { Container, Grid, Paper } from '@mui/material'
import s from '../../../../Common.modules.scss'
import { TitleHeader } from '../../../../TitleHeader'
import { Button, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'

const DeliveryRandomProduct = () => {
  const navigate = useNavigate()
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT_FINAL)
    }
  })

  return <Container component='main' maxWidth='xs' className={s.container}>
    <TitleHeader />
    <Typography component='h4' variant='medium'
                style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
      PRODUSE ALEATOR VALIDARE LIVRARE
    </Typography>
    <form>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
            <Typography variant='medium' component='p'>PRODUSE ALEATOR</Typography>
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
              label='SCANEAZǍ SUPORT'
              onClick={() => formik.submitForm()}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  </Container>
}

export default DeliveryRandomProduct