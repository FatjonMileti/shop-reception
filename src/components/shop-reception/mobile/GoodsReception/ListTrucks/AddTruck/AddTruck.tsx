import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, {useMemo, useState} from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import {makeCoreGetRequest, makeCorePostRequest} from "../../../../../../utils/api";
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
        const response = await makeCorePostRequest('/shop-reception-mobile/truck/createTruck', values);
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
      formik.setFieldValue('sealNumbers', [
        ...formik.values.sealNumbers,
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
      value={formik.values.registrationNumber}
      onChange={event => formik.setFieldValue('registrationNumber', (event.target as HTMLInputElement).value)}
      error={!!formik.errors.registrationNumber}
      helperText={formik.errors.registrationNumber as string}
    />,
    <Input
      type='text'
      label='Șofer'
      variant='standard'
      width='100%'
      value={formik.values.driver}
      onChange={event => formik.setFieldValue('driver', (event.target as HTMLInputElement).value)}
      error={!!formik.errors.driver}
      helperText={formik.errors.driver as string}
    />,
    ...formik.values.sealNumbers.map((field, index) => (
        <Input
            key={field.id}
            type='text'
            label={`Număr Sigiliu ${index + 1}`}
            variant='standard'
            width='100%'
            value={field.value}
            onChange={(event) => {
              const newValues = [...formik.values.sealNumbers];
              newValues[index].value = (event.target as HTMLInputElement).value;
              formik.setFieldValue('sealNumbers', newValues);
            }}
            error={!!formik.errors.sealNumbers?.[index]?.value}
            helperText={formik.errors.sealNumbers?.[index]?.value}
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
