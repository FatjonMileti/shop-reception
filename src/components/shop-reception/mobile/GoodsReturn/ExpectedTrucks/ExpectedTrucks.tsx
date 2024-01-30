import { Grid } from '../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import useRoles from '../../useRoles'
import { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { URLS } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { TitleHeader } from '../../TitleHeader'

const ExpectedTrucks = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
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

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  let items = [
    <TitleHeader title='CAMIOANE AȘTEPTATE' />,
    <Input
      type='select'
      label='SELECTEAZǍ CAMION'
      variant='standard'
      width='100%'
      value={formik.values.truck}
      onChange={event => formik.setFieldValue('truck', (event.target as HTMLInputElement).value)}
      error={!!formik.errors.truck}
      helperText={formik.errors.truck as string}
    />,
    <Button
      type='button'
      variant='contained'
      label='CONFIRMĂ CAMION'
      style={{ width: '100%' }}
      onClick={() => {
        formik.handleSubmit()
      }}
    />
  ]

  if (isShopUser || isHubUser) {
    items.push(
      <Button
        type='button'
        variant='contained'
        label='ADAUGǍ CAMION'
        style={{ width: '100%' }}
        onClick={() => {
          navigate(URLS.AUTH_ADD_TRUCK)
        }}
      />
    )
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default ExpectedTrucks
