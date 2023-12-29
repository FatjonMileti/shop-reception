import { Grid, Container } from '@mui/material'
import { Button, IconButton, Input, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { columns } from './helpers'

const AddTruckStep2 = () => {
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
        ADAUGǍ CAMION
      </Typography>
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='medium' component='p'>Magazin HYPER ORADEA2</Typography>
              <Typography variant='medium' component='p'>ER / EW</Typography>
              <Typography variant='medium' component='p'>Sigilii ewr</Typography>
            </Grid>
            <Grid item xs={12}>
              <Input
                type='select'
                label='Adaugǎ bonuri de livrare'
                variant='standard'
                width='100%'
                value={formik.values.registrationNumber}
                values={[
                  {
                    value: 'none',
                    label: 'DA'
                  }
                ]}
                onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
              <Grid item xs={12}>
                <Table
                  columns={columns}
                  isLoading={false}
                  rows={[]}
                />
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: '20px' }} spacing={2}>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='ÎNCEPE RECEPȚIA'
                  onClick={() => formik.handleSubmit()}
                  style={{ width: '100%' }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  type='button'
                  variant='contained'
                  label='SALVARE CAMION'
                  onClick={() => formik.handleSubmit()}
                  style={{ width: '100%' }}
                  disabled
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddTruckStep2
