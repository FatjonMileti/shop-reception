import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import ImageUpload from '../../../Common/ImageUpload/ImageUpload'
import { useNotification } from '../../../../../../hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useMemo, useState } from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { URLS } from '../../../constants'
import { CircularProgress } from '@mui/material'

const Step4 = () => {
  const { showNotification } = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const [numFields, setNumFields] = useState(1)
  const id = location.state || ''

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const notice = await makeCorePostRequest(
          '/shop-reception-mobile/truck/shop/exit/save-notice/' + id,
          values
        )

        returnTruck.depositOrHubName === 'FURNIZOR CHEP'
          ? navigate('/goodsReturn')
          : navigate(URLS.AUTH_RETURN_STEP_5, { state: { id: id, notice: notice } })
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: returnTruck, isLoading: isLoadingTruck } = useQuery(
    'returnTruck',
    async () => {
      return await makeCoreGetRequest(
        '/shop-reception-mobile/truck/shop/exit/truck-model/' + id,
        null
      )
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const addSealNumberField = () => {
    if (numFields < 3) {
      setNumFields(numFields + 1)
      formik.setFieldValue('sealList', [...formik.values.sealList, ''])
    }
  }

  const handleSuccess = () => {
    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    })
  }

  const handleError = error => {
    showNotification({
      message: `Error uploading image: ${error.message}`,
      type: 'error'
    })
  }

  if (isLoadingTruck) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="ÎNREGISTREAZǍ CAMION" />,
        <Input
          type="text"
          label="Număr stive"
          variant="outlined"
          value={formik.values.stackNumber}
          width="100%"
          onChange={event =>
            formik.setFieldValue('stackNumber', +(event.target as HTMLInputElement).value)
          }
          error={!!formik.errors.stackNumber}
          helperText={formik.errors.stackNumber as string}
        />,
        formik.values.sealList?.map((sealCode, idx) => (
          <div>
            <Input
              key={idx}
              type="text"
              label="Număr sigiliu"
              variant="standard"
              value={sealCode}
              onChange={event => {
                const newValues = [...formik.values.sealList]
                newValues[idx] = (event.target as HTMLInputElement).value
                formik.setFieldValue('sealList', newValues)
              }}
              width="100%"
              error={!!formik.errors?.sealList?.[idx]}
              helperText={formik.errors?.sealList?.[idx] as string}
            />
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/shop/exit/image/` + id}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )),
        <Button
          type="button"
          variant="contained"
          label="ADAUGĂ ALT SIGILIU"
          onClick={addSealNumberField}
          style={{ width: '100%' }}
        />,
        <Button
          type="button"
          variant="contained"
          label="FINALIZEAZǍ"
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step4
