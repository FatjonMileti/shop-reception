import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'

const TruckDetail = () => {
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

  let items = [
    <TitleHeader title='DETALIU CAMION' />,
    <>
      <Typography variant='medium' component='p'>Numǎr înmatriculare: IF32KTL</Typography>
      <Typography variant='medium' component='p'>Bon livrare: 61207</Typography>
    </>,
    <>
      <Input
        type='select'
        label='Confirm Sigiliu'
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
      <IconButton>
        <CameraIcon />
      </IconButton>
    </>,
    <Typography variant='medium' component='p'>Confirm documentele pentru depozit DEPOZIT DEVA
      APLS</Typography>,
    <Input
      type='select'
      label='Aviz/BL'
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
    />,
    <Input
      type='select'
      label='Scrisoare de transport/CMR'
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
    />,
    <>
      <Input
        type='select'
        label='Conformitate termodiagrama'
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
      <IconButton>
        <CameraIcon />
      </IconButton>
    </>,
    <Button
      type='button'
      variant='contained'
      label='APROBǍ CAMION'
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

export default TruckDetail
