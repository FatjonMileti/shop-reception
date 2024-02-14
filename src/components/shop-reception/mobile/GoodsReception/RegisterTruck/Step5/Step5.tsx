import { Grid } from '../../../../Common/Grid'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../TitleHeader'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'

const Step5 = () => {
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
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <Input
          type='text'
          label='Destinație'
          variant='standard'
          width='100%'
          value={formik.values.destination}
          onChange={event => formik.setFieldValue('destination', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.destination}
          helperText={formik.errors.destination as string}
        />,
        <Input
          type='text'
          label='Numǎr înmatriculare'
          variant='standard'
          width='100%'
          value={formik.values.registrationNumber}
          onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.registrationNumber}
          helperText={formik.errors.registrationNumber as string}
        />,
        <Input
          type='text'
          label='Șofer'
          variant='standard'
          width='100%'
          value={formik.values.driver}
          onChange={event => formik.setFieldValue('driver', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.driver}
          helperText={formik.errors.driver as string}
        />,
        <Checkbox
          checked={formik.values.isPackingReturn}
          onChange={event => formik.setFieldValue('isPackingReturn', (event.target as HTMLInputElement).checked)}
          label='Retur ambalaje'
        />,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step5
