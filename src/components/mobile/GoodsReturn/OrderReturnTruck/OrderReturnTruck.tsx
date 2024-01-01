import { Grid, Container, Box } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../../TitleHeader'

const OrderReturnTruck = () => {
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
      <TitleHeader />
      <Typography component='h4' variant='medium'
                  style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}>
        COMANDǍ CAMION RETUR
      </Typography>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='text'
                label='Locație in...'
                variant='standard'
                width='100%'
                value={'HYPER ORADEA2'}
                readonly
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='select'
                label='Locație descǎrcare'
                variant='standard'
                width='100%'
                value={formik.values.location}
                onChange={event => formik.setFieldValue('location', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.location}
                helperText={formik.errors.location as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='number'
                label='Numǎr stive'
                variant='standard'
                width='100%'
                value={formik.values.stacks}
                onChange={event => formik.setFieldValue('stacks', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.stacks}
                helperText={formik.errors.stacks as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component='p' variant='regular'>
                Pot fi inițiate comenzi de minim 25 stive și maxim 33.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='TRANSMITERE COMANDǍ'
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

export default OrderReturnTruck
