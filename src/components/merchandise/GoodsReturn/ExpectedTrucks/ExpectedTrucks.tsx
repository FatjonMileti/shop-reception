import { Grid, Container, Paper, Box } from '@mui/material'
import { Button, Divider, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../Common.modules.scss'
import useRoles from '../../useRoles'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import TitleHeader from '../../TitleHeader/TitleHeader'

const ExpectedTrucks = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
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

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  return (
    <Container component='main' maxWidth='xs' className={s.container}>
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        CAMIOANE AȘTEPTATE
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='select'
                label='SELECTEAZǍ CAMION'
                variant='standard'
                width='100%'
                value={formik.values.truck}
                onChange={event => formik.setFieldValue('truck', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.truck}
                helperText={formik.errors.truck as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='button'
                variant='contained'
                label='CONFIRMĂ CAMION'
                style={{ width: '100%' }}
                onClick={() => {
                  formik.handleSubmit()
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider>SAU</Divider>
            </Grid>
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type='button'
                variant='contained'
                label='ADAUGǍ CAMION'
                style={{ width: '100%' }}
                onClick={() => {
                  navigate(URLS.AUTH_ADD_TRUCK)
                }}
              />
            </Grid>}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ExpectedTrucks
