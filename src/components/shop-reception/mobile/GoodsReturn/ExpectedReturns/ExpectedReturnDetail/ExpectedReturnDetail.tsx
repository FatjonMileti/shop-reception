import { Grid } from '../../../../Common/Grid'
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { FlexCenter } from 'components/shop-reception/Common/FlexCenter'

const ExpectedReturnDetail = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = formik.values
        navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_2)

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
        <TitleHeader title='RETURURI AȘTEPTATE CAMION' />,
        <>
          <Typography variant='medium' component='p'>IF32KTL / ABCD</Typography>
          <Typography variant='medium' component='p'>ORADEA2 (25)</Typography>
        </>,
        <FlexCenter>
          <Input
            type='select'
            label='Confirm Sigiliu'
            variant='standard'
            width='100%'
            value={formik.values.sealNumber}
            values={[
              {
                value: 'none',
                label: 'DA'
              }
            ]}
            onChange={event => formik.setFieldValue('sealNumber', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.sealNumber}
            helperText={formik.errors.sealNumber as string}
          />
          <IconButton>
            <CameraIcon />
          </IconButton>
        </FlexCenter>,
        <FlexCenter>
          <Input
            type='select'
            label='Confirmă Aviz'
            variant='standard'
            width='100%'
            value={formik.values.opinion}
            values={[
              {
                value: 'none',
                label: 'DA'
              }
            ]}
            onChange={event => formik.setFieldValue('opinion', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.opinion}
            helperText={formik.errors.opinion as string}
          />
          <IconButton>
            <CameraIcon />
          </IconButton>
        </FlexCenter>,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMĂTOR'
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ExpectedReturnDetail
