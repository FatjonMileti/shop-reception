import { Grid } from '../../../../Common/Grid'
import { Button, Input, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
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
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ADAUGǍ CAMION' />,
        <>
          <Typography variant='medium' component='p'>Magazin HYPER ORADEA2</Typography>
          <Typography variant='medium' component='p'>ER / EW</Typography>
          <Typography variant='medium' component='p'>Sigilii ewr</Typography>
        </>,
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
        />,
        <Table
          columns={columns}
          isLoading={false}
          rows={[]}
        />,
        <Button
          type='button'
          variant='contained'
          label='ÎNCEPE RECEPȚIA'
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled
        />,
        <Button
          type='button'
          variant='contained'
          label='SALVARE CAMION'
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default AddTruckStep2
