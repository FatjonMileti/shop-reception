import { TitleHeader } from '../../../../TitleHeader'
import { Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../../Common/Grid'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { getValidationSchema, initialValues } from './helpers'
import { useNavigate } from 'react-router-dom'
import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import { URLS } from '../../../../constants'
import { FlexCenter } from '../../../../../Common/FlexCenter'

const DeliveryRandomSupport = () => {
  const navigate = useNavigate()
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT_FINAL)
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
            <Typography variant='medium' component='p'>Număr Înmatriculare: 45745865416</Typography>,
            <Typography variant='medium' component='p'>suport verificați: 0 / 4</Typography>
          ]}
          itemsPerRow={1}
        />,
        <FlexCenter>
          <Input
            type='text'
            label='Cod suport'
            variant='standard'
            width='100%'
            value={formik.values.supportCode}
            onChange={event => formik.setFieldValue('supportCode', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.supportCode}
            helperText={formik.errors.supportCode as string}
          />
          <IconButton>
            <ManageSearchIcon />
          </IconButton>
        </FlexCenter>,
        <Divider>SAU</Divider>
      ]}
      itemsPerRow={1}
    />
  )
}

export default DeliveryRandomSupport