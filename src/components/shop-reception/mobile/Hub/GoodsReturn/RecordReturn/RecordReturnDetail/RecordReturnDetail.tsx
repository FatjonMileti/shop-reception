import { Grid } from '../../../../../Common/Grid'
import { Button, Input, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues, columns } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { useNotification } from '../../../../../../../hooks'
import { TitleHeader } from '../../../../Common/TitleHeader'

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
        const payload = formik.values

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

  let items = [
    <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
    <>
      <Typography variant='medium' component='p'>Numǎr camion: 56</Typography>
      <Typography variant='medium' component='p'>Destinație: Depozit Deva Abient</Typography>
    </>,
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
    />,
    <Table
      columns={columns}
      isLoading={false}
      rows={[]}
      disablePagination={true}
    />,
    <Button
      type='button'
      variant='contained'
      label='PRINT'
      size='large'
      onClick={null}
    />,
    <Button
      type='button'
      variant='contained'
      label='CONFIRMǍ'
      disabled
      onClick={null}
    />,
    <Button
      type='button'
      variant='contained'
      label='ANULEAZǍ'
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

export default RecordReturnDetail
