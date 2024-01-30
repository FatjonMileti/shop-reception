import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { toPayload } from './serializers'

const AddTruck = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = toPayload(formik.values)

        navigate(URLS.AUTH_ADD_TRUCK_STEP_2)

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  let items = [
    <TitleHeader title='ADAUGǍ CAMION' />,
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
    <Input
      type='text'
      label='Numǎr Sigiliu'
      variant='standard'
      width='100%'
      value={formik.values.sealNumber}
      onChange={event => formik.setFieldValue('sealNumber', (event.target as HTMLInputElement).value)}
      error={!!formik.errors.sealNumber}
      helperText={formik.errors.sealNumber as string}
    />,
    <Button
      type='button'
      variant='outlined'
      label='+ ADAUGǍ ALT SIGILIU'
    />,
    <Button
      type='button'
      variant='contained'
      label='PASUL URMǍTOR'
      onClick={() => formik.handleSubmit()}
    />
  ]

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default AddTruck
