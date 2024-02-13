import { TitleHeader } from '../../../../../TitleHeader'
import { Button, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../../../Common/Grid'
import { URLS } from '../../../../../constants'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import React, { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const DeliveryRandomSupportFinal = () => {
  const navigate = useNavigate()
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT_CONFIRM)
    }
  })

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='SUPORT ALEATOR VALIDARE LIVRARE' />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>SUPORT ALEATOR</Typography>,
            <Typography variant='medium' component='p'>Număr înmatriculare: BA32489</Typography>,
            <Typography variant='medium' component='p'>Produse verificate: 0 / 4</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>Etichetă suport: 45745865416</Typography>,
            <Typography variant='medium' component='p'>Număr suport: 545465</Typography>,
            <Typography variant='medium' component='p'>Produse verificate: 0</Typography>
          ]}
          itemsPerRow={1}
        />,
        <>
          <Input
            type='text'
            label='Cod Produse'
            variant='standard'
            width='100%'
            value={formik.values.productCode}
            onChange={event => formik.setFieldValue('productCode', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.productCode}
            helperText={formik.errors.productCode as string}
          />
          <IconButton>
            <ManageSearchIcon />
          </IconButton>
        </>,
        <Divider>SAU</Divider>,
        <Button
          type='button'
          variant='contained'
          label='SCANEAZǍ PRODUSE'
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZĂ SUPORT'
          onClick={() => formik.submitForm()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}
export default DeliveryRandomSupportFinal