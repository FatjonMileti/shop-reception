import { TitleHeader } from '../../../../../../Common/TitleHeader'
import { Button, Divider, IconButton, Input, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../../../../Common/Grid'
import { URLS } from '../../../../../../constants'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { useMemo } from 'react'
import { getValidationSchema, initialValues, columns } from './helpers'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const DeliveryCompleteScanStep3 = () => {
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
      gridContainerStyle={{marginTop: '20px'}}
      maxWidth='xs'
      items={[
        <TitleHeader title='VALIDARE LIVRARE SCANARE INTEGRALǍ' />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>SCANARE INTEGRALǍ</Typography>,
            <Typography variant='medium' component='p'>Număr înmatriculare: BA32489</Typography>,
            <Typography variant='medium' component='p'>BL: 545465</Typography>,
            <Typography variant='medium' component='p'>Suporți verificați: 0 / 4</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>Etichetă suport: 45745865416</Typography>,
            <Typography variant='medium' component='p'>Număr suport: 545465</Typography>,
            <Typography variant='medium' component='p'>Produse verificați: 0</Typography>
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
          label='SCANEAZǍ PPRODUSE'
          onClick={null}
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
          label='CONFIRMĂ CANTITĂȚI'
          onClick={() => formik.submitForm()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}
export default DeliveryCompleteScanStep3
