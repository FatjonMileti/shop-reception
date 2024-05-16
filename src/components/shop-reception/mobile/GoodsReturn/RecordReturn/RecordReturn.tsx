import { Grid } from '../../../Common/Grid'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, { useMemo } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../constants'
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../utils/api";

const RecordReturn = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { data: truckList, isLoading} = useQuery(
    'recordReturn',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/getDepositAndHubReturnList', null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching trucks. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const resp = await makeCorePostRequest('/shop-reception-mobile/truck/hub/return/registration/save', {
          "id": values.id,
          "truckNumber": values.truckNumber,
          "driverName": values.driverName,
          "packageReturn": values.packageReturn,
          "productReturn": false,
          "depositType": null
        })

        if (resp.success) {
          navigate(URLS.AUTH_RECORD_RETURN_DETAIL)
        }

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
        <TitleHeader title='ÎNREGISTRARE RETUR' />,
        <Input
          type='select'
          label='Destinație'
          variant='standard'
          width='100%'
          value={formik.values.id}
          values={truckList?.map(trunk => ({ value: trunk.id, label: trunk.name }))}
          onChange={event => formik.setFieldValue('id', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.id}
          helperText={formik.errors.id as string}
        />,
        <Input
          type='text'
          label='Numǎr înmatriculare'
          variant='standard'
          width='100%'
          value={formik.values.truckNumber}
          onChange={event => formik.setFieldValue('truckNumber', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.truckNumber}
          helperText={formik.errors.truckNumber as string}
        />,
        <Input
          type='text'
          label='Șofer'
          variant='standard'
          width='100%'
          value={formik.values.driverName}
          onChange={event => formik.setFieldValue('driverName', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.driverName}
          helperText={formik.errors.driverName as string}
        />,
        <Checkbox
          checked={formik.values.packageReturn}
          onChange={event => formik.setFieldValue('packageReturn', (event.target as HTMLInputElement).checked)}
          label='Retur ambalaje'
        />,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default RecordReturn
