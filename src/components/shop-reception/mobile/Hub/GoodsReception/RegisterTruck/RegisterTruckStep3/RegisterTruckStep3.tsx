import { Grid } from '../../../../../Common/Grid'
import { Button, Input, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNotification } from '../../../../../../../hooks'
import { useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../../utils/api'
import ImageUpload from '../../../../Common/ImageUpload/ImageUpload'
import { getValidationSchema, initialValues } from './helpers'
import { CircularProgress } from '@mui/material'

const RegisterTruckStep3 = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [sealNumbers, setSealNumbers] = useState([''])
  const [numFields, setNumFields] = useState(1)
  const [params] = useSearchParams()
  const id = +params.get('id')

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async ({ truckNumber }: any) => {
      try {
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data, isLoading } = useQuery(
    'RTsummary',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/summary/' + id, null)
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

  const addSealNumberField = () => {
    if (numFields < 3) {
      setNumFields(numFields + 1)
      setSealNumbers([...sealNumbers, ''])
    }
  }

  const saveTruck = () => {
    const sealList = sealNumbers.map(seal => ({
      id: null,
      code: seal,
      type: null,
      broken: null,
      userMessage: null
    }))

    const truck = {
      id: data?.truckId,
      shopTemperature: null,
      sealList,
      documentList: null
    }

    try {
      makeCorePostRequest('/shop-reception-mobile/truck/hub/save/seals', truck)
      navigate('/goodsReturn')
    } catch (error) {
      showNotification({
        message: `Eroare la salvarea camionului. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="ÎNREGISTREAZǍ CAMION" />,
        <Typography variant="medium" component="p">
          Număr înmatriculare: {data?.truckNumber}
        </Typography>,
        <Typography variant="medium" component="p">
          Număr suporți scanaţi: {data?.supportCounter}
        </Typography>,
        sealNumbers.map((seal, idx) => (
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <Input
              key={idx}
              type="text"
              label="Număr sigiliu"
              value={sealNumbers[idx]}
              variant="standard"
              width="100%"
              onChange={event => {
                const newValues = [...sealNumbers]
                newValues[idx] = (event.target as HTMLInputElement).value
                setSealNumbers(newValues)
              }}
            />
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/hub/upload/new/` + id}
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
        sealNumbers[0] !== '' && (
          <Button
            type="button"
            variant="contained"
            label="FINALIZEAZǍ"
            onClick={saveTruck}
            style={{ width: '100%' }}
          />
        )
      ]}
      itemsPerRow={1}
    />
  )
}

export default RegisterTruckStep3
