import { Grid } from '../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../constants'

const RegisterTruck = () => {
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
        navigate(URLS.AUTH_SUPPORT_CODE)
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
          label='Număr înmatriculare'
          variant='standard'
          width='100%'
          value={formik.values.registrationNumber}
          onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.registrationNumber}
          helperText={formik.errors.registrationNumber as string}
        />,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          style={{width: '100%'}}
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default RegisterTruck
