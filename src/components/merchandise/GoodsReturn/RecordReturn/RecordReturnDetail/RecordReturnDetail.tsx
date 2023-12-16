import { Grid, Container, Paper } from '@mui/material'
import { Button, Divider, Input, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import s from '../../../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues, columns } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'

const RecordReturnDetail = () => {
  const { showNotification } = useNotification()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = {
          opinion: formik.values.opinion
        }

        showNotification({
          message: 'codul de suport nu a fost găsit',
          type: 'warning'
        })

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
        ÎNREGISTREAZǍ CAMION
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={{ margin: '10px', padding: '20px' }}>
                <Typography variant='medium' component='p'>Numǎr camion: 56</Typography>
                <Typography variant='medium' component='p'>Destinație: Depozit Deva Abient</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Input
                type='select'
                label='Aviz'
                variant='standard'
                width='100%'
                value={formik.values.opinion}
                values={[
                  {
                    value: 'none',
                    label: ' Adaugaǎ Aviz'
                  }
                ]}
                onChange={event => formik.setFieldValue('opinion', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.opinion}
                helperText={formik.errors.opinion as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Table
                columns={columns}
                isLoading={false}
                rows={[]}
                disablePagination={true}
              />
            </Grid>
            <Grid container alignItems='center' justifyContent='space-around' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='PRINT'
                size='large'
                onClick={null}
              />
            </Grid>
            <Grid container alignItems='center' justifyContent='space-around' style={{ marginTop: '20px' }}>
              <Button
                type='button'
                variant='contained'
                label='CONFIRMǍ'
                disabled
                onClick={null}
              />
              <Button
                type='button'
                variant='contained'
                label='ANULEAZǍ'
                onClick={() => formik.handleSubmit()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RecordReturnDetail
