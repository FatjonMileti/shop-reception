import { Grid, Container, Box } from '@mui/material'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import cs from '../Common.modules.scss'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../utils/formatting'
import { useNotification } from '../../../../hooks'
import { TitleHeader } from '../TitleHeader'

const PackagingInventoryUpdate = () => {
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
      <TitleHeader title='ACTUALIZARE INVENTAR AMBALAJE' />
      <Grid container spacing={2} className={cs.wrapper}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type='select'
                label='Tip suport'
                variant='standard'
                width='100%'
                value={formik.values.supportType}
                onChange={event => formik.setFieldValue('supportType', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.supportType}
                helperText={formik.errors.supportType as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='number'
                label='Calitativi'
                variant='standard'
                width='100%'
                value={formik.values.quality}
                onChange={event => formik.setFieldValue('quality', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.quality}
                helperText={formik.errors.quality as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type='number'
                label='Defecți'
                variant='standard'
                width='100%'
                value={formik.values.defective}
                onChange={event => formik.setFieldValue('defective', (event.target as HTMLInputElement).value)}
                error={!!formik.errors.defective}
                helperText={formik.errors.defective as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Box className={cs.buttonWrapper}>
                <Button
                  type='button'
                  variant='contained'
                  label='CONFIRMǍ'
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

export default PackagingInventoryUpdate
