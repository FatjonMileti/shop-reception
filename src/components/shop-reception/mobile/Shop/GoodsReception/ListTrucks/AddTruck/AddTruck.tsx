import { Grid } from '../../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, {useMemo, useState} from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { useNotification } from '../../../../../../../hooks'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../../constants'
import {makeCoreGetRequest, makeCorePostRequest} from "../../../../../../../utils/api";
import {useQuery} from "react-query";

const AddTruck = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [numFields, setNumFields] = useState(1)

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const response = await makeCorePostRequest('/shop-reception-mobile/truck/shop/create-truck', values);
        navigate(URLS.AUTH_ADD_TRUCK_STEP_2, { state: { response } })
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  //TODO get truckId from step 2 and search for truck, fill the fields with response
  const { data: truck, isLoading} = useQuery(
      'truck',
      async () => {
        return await makeCoreGetRequest('/shop-reception-mobile/truck/getTruckCreationDTO/' + 'truckId', null)
      },
      {
        onError: error => {
          showNotification({
            message: `Error while fetching truck. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        },
        enabled: false
      }
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const addSealNumberField = () => {
    if (numFields < 3) {
      setNumFields(numFields + 1);
      formik.setFieldValue('sealList', [
        ...formik.values.sealList,
        { id: numFields + 1, value: '' },
      ]);
    }
  };

  let items = [
    <TitleHeader title='ADAUGǍ CAMION' />,
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
    ...formik.values.sealList?.map((field, index) => (
        <Input
            key={field.id}
            type='text'
            label={`Număr Sigiliu ${index + 1}`}
            variant='standard'
            width='100%'
            value={field.code}
            onChange={(event) => {
              const newValues = [...formik.values.sealList];
              newValues[index].code = (event.target as HTMLInputElement).value;
              formik.setFieldValue('sealList', newValues);
            }}
            error={!!formik.errors.sealList?.[index]?.value}
            helperText={formik.errors.sealList?.[index]?.value}
        />
    )),
    numFields < 3 && (
        <Button
            type='button'
            variant='outlined'
            label='+ ADAUGĂ ALT SIGILIU'
            onClick={addSealNumberField}
        />
    ),
    <Button
      type='button'
      variant='contained'
      label='PASUL URMǍTOR'
      style={{ width: "100%" }}
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

export default AddTruck
