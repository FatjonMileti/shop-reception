import { TitleHeader } from '../../../../../../Common/TitleHeader'
import { Button, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../../../../Common/Grid'
import { URLS } from '../../../../../../constants'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import React, { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../../../../../../../../hooks";

const DeliveryRandomProductFinal = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const location = useLocation();
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const support = location.state;
  console.log(support);

  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT_CONFIRM)
    }
  })

  return (
    <Grid
      gridContainerStyle={{marginTop: '20px'}}
      maxWidth='xs'
      items={[
        <TitleHeader title="PRODUSE ALEATOR VALIDARE LIVRARE" />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>PRODUSE ALEATOR</Typography>,
            <Typography variant='medium' component='p'>Număr înmatriculare: {support?.truckNumber}</Typography>,
            <Typography variant='medium' component='p'>Suporți verificați: {support?.supportCounter} / {support?.totalSupportNumber}</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>Etichetă suport: {support?.supportCode}</Typography>,
            <Typography variant='medium' component='p'>Număr suport: {support?.supportNumber}</Typography>,
            <Typography variant='medium' component='p'>Produse verificate: {support?.productCounter}</Typography>
          ]}
          itemsPerRow={1}
        />,
        <div style={{ display: 'flex' }}>
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
        </div>,
        <Divider>SAU</Divider>,
        <Button
          type='button'
          variant='contained'
          label='SCANEAZǍ PRODUSE'
          onClick={null}
          style={{ width: '100%' }}
        />,
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZĂ SUPORT'
          onClick={() => formik.submitForm()}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}
export default DeliveryRandomProductFinal
