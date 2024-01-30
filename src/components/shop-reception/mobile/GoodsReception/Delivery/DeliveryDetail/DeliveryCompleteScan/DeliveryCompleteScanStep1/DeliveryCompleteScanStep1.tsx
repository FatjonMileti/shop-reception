import { TitleHeader } from '../../../../../TitleHeader'
import { Button, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../../../Common/Grid'
import { URLS } from '../../../../../constants'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const DeliveryCompleteScanStep1 = () => {
  const navigate = useNavigate()
  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN_STEP_2)
    }
  })

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='VALIDARE LIVRARE SCANARE INTEGRALǍ' />,
        <Grid
          hasPaper={true}
          spacing={1}
          items={[
            <Typography variant='medium' component='p'>SCANARE INTEGRALǍ</Typography>,
            <Typography variant='medium' component='p'>Număr înmatriculare: BA32489</Typography>,
            <Typography variant='medium' component='p'>BL: 545465</Typography>,
            <Typography variant='medium' component='p'>Suporți verificați: 0 / 4</Typography>
          ]}
          itemsPerRow={1}
        />,
        <>
          <Input
            type='text'
            label='Cod Suport'
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
        </>,
        <Divider>SAU</Divider>,
        <Button
          type='button'
          variant='contained'
          label='SCANEAZǍ SUPORT'
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZĂ'
          onClick={null}
        />,
        <Button
          type='button'
          variant='contained'
          label='SUMAR BL'
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}
export default DeliveryCompleteScanStep1