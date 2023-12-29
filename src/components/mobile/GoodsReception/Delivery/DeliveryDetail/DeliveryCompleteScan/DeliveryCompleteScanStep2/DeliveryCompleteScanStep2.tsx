import cs from '../../../../../Common.modules.scss'
import { TitleHeader } from '../../../../../TitleHeader'
import { Button, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Container, Grid, Paper } from '@mui/material'
import { URLS } from '../../../../../constants'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const DeliveryCompleteScanStep2 = () => {
  const navigate = useNavigate()
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_3)
    }
  })

  return <Container component='main' maxWidth='xs' className={cs.container}>
    <TitleHeader />
    <Typography component='h4' variant='medium'
                style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
      VALIDARE LIVRARE SCANARE INTEGRALǍ
    </Typography>
    <form>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
            <Typography variant='medium' component='p'>SCANARE INTEGRALǍ</Typography>
            <Typography variant='medium' component='p'>Număr înmatriculare: BA32489</Typography>
            <Typography variant='medium' component='p'>BL: 545465</Typography>
            <Typography variant='medium' component='p'>Suporți verificați: 0 / 4</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
            <Typography variant='medium' component='p'>Etichetă suport: 45745865416</Typography>
            <Typography variant='medium' component='p'>Număr suport: 545465</Typography>
            <Typography variant='medium' component='p'>Produse verificați: 0</Typography>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Input
            type='text'
            label='Cod Produse'
            variant='standard'
            width='100%'
            value={formik.values.productCode}
            onChange={event => formik.setFieldValue('productCode', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.productCode}
            helperText={formik.errors.productCode as string}
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
              label='SCANEAZǍ PPRODUSE'
              onClick={() => null}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems='center' justifyContent='center'>
            <Button
              type='button'
              variant='contained'
              label='FINALIZEAZĂ SUPORT'
              onClick={() => formik.submitForm()}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  </Container>
}
export default DeliveryCompleteScanStep2