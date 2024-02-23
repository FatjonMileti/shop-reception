import { Grid } from '../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
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
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ACTUALIZARE INVENTAR AMBALAJE' />,
        <Input
          type='select'
          label='Tip suport'
          variant='standard'
          width='100%'
          value={formik.values.supportType}
          onChange={event => formik.setFieldValue('supportType', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.supportType}
          helperText={formik.errors.supportType as string}
        />,
        <Input
          type='number'
          label='Calitativi'
          variant='standard'
          width='100%'
          value={formik.values.quality}
          onChange={event => formik.setFieldValue('quality', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.quality}
          helperText={formik.errors.quality as string}
        />,
        <Input
          type='number'
          label='Defecți'
          variant='standard'
          width='100%'
          value={formik.values.defective}
          onChange={event => formik.setFieldValue('defective', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.defective}
          helperText={formik.errors.defective as string}
        />,
        <Button
          type='button'
          variant='contained'
          label='CONFIRMǍ'
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default PackagingInventoryUpdate
