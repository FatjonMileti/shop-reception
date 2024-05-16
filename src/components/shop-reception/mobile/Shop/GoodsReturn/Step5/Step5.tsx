import { Grid } from '../../../../Common/Grid'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../Common/TitleHeader'

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
        <TitleHeader title='COMANDǍ CAMION RETUR' />,
        <Input
          type='text'
          label='Locație in...'
          variant='standard'
          width='100%'
          value={'HYPER ORADEA2'}
          readonly
        />,
        <Input
          type='select'
          label='Locație descǎrcare'
          variant='standard'
          width='100%'
          value={formik.values.location}
          onChange={event => formik.setFieldValue('location', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.location}
          helperText={formik.errors.location as string}
        />,
        <Input
          type='number'
          label='Numǎr stive'
          variant='standard'
          width='100%'
          value={formik.values.stacks}
          onChange={event => formik.setFieldValue('stacks', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.stacks}
          helperText={formik.errors.stacks as string}
        />,
        <Typography component='p' variant='regular'>
          Pot fi inițiate comenzi de minim 25 stive și maxim 33.
        </Typography>,
        <Button
          type='button'
          variant='contained'
          label='TRANSMITERE COMANDǍ'
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step5
