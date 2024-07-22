import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, { useMemo, useState } from 'react'
import { getValidationSchema, initialValues, isEmpty } from './helpers'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { useNotification } from 'hooks'
import { makeCoreGetRequest, makeCorePostRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { URLS } from 'components/shop-reception/mobile/constants'
import { TitleHeader } from 'components/shop-reception/mobile/Common/TitleHeader'
import SourceIcon from '@mui/icons-material/Source'

const RegisterTruck = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const createTruck = async (values: any) => {
    return await makeCorePostRequest(`/shop-reception-mobile/truck/shop/create-truck`, values)
  }

  const { isLoading, mutate } = useMutation(createTruck, {
    onSuccess: (res, data) => {
      showNotification({
        message: `Camionul a fost creat cu success.`,
        type: 'success'
      })
      navigate(URLS.AUTH_REGISTER_TRUCK_STEP_2, { state: { truckId: res.id } })
    },
    onError: error => {
      showNotification({
        message: `A aparut o eroare ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  })

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(values)
    }
  })

  const disableNextButton =
    isEmpty(formik.values.driverName) ||
    isEmpty(formik.values.truckNumber) ||
    formik.values.sealList.some(seal => isEmpty(seal.code))

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <TitleHeader title="" />
      <Grid xs={10} item>
        <Input
          type="text"
          value={formik.values.truckNumber}
          onChange={event =>
            formik.setFieldValue('truckNumber', (event.target as HTMLInputElement).value)
          }
          label="Numar inmatriculare"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.truckNumber}
          helperText={formik.errors.truckNumber as string}
          required
        />
      </Grid>
      <Grid xs={10} item>
        <Input
          type="text"
          value={formik.values.driverName}
          onChange={event =>
            formik.setFieldValue('driverName', (event.target as HTMLInputElement).value)
          }
          label="Sofer"
          variant="outlined"
          style={{ width: '100%' }}
          error={!!formik.errors.driverName}
          helperText={formik.errors.driverName as string}
          required
        />
      </Grid>
      {formik.values.sealList.map((seal, index) => (
        <>
          <Grid xs={10} item>
            <Input
              id={`seal-${index}`}
              type="text"
              value={seal.code}
              onChange={event =>
                formik.setFieldValue(
                  `sealList[${index}].code`,
                  (event.target as HTMLInputElement).value
                )
              }
              label="Numar sigiliu"
              variant="outlined"
              style={{ width: '100%' }}
              error={!!formik.errors.sealList}
              helperText={formik.errors.sealList as string}
              required
            />
          </Grid>

          <Grid xs={10} item>
            <Button
              variant="outlined"
              children={<SourceIcon />}
              label=""
              onClick={() => document.getElementById(`seal-${index}`).focus()}
              style={{ width: '100%' }}
            />
          </Grid>
        </>
      ))}
      {formik.values.sealList.length < 3 && (
        <Grid xs={10} item>
          <Button
            variant="outlined"
            label="Adauga alt sigiliu"
            onClick={() =>
              formik.setFieldValue('sealList', [...formik.values.sealList, { code: null }])
            }
            style={{ width: '100%' }}
          />
        </Grid>
      )}
      <Grid xs={10} item>
        <Button
          variant="outlined"
          label="Pasul urmator"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
          disabled={disableNextButton || isLoading}
        />
      </Grid>
    </Grid>
  )
}

export default RegisterTruck
