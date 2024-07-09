import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { CircularProgress, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { useState } from 'react'
import ImageUpload from '../../../Common/ImageUpload/ImageUpload'

const SupportScanStep5 = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [sealNumbers, setSealNumbers] = useState([''])
  const [numFields, setNumFields] = useState(1)
  let { id } = useParams()

  const { data: counter, isLoading: isLoadingCounter } = useQuery(
    'counter',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/support/shop/counter/' + id, null)
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

  const saveTruck = () => {
    const sealList = sealNumbers.map(seal => ({
      id: null,
      code: seal,
      type: null,
      broken: null,
      userMessage: null
    }))

    const truck = {
      id,
      shopTemperature: null,
      sealList,
      documentList: null,
      thermodiagramConform: null
    }

    try {
      makeCorePostRequest('/shop-reception-mobile/truck/shop/save', truck).then(() =>
        navigate('/goodsReception')
      )
    } catch (error) {
      showNotification({
        message: `Error while saving truck. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const addSealNumberField = () => {
    if (numFields < 3) {
      setNumFields(numFields + 1)
      setSealNumbers([...sealNumbers, ''])
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

  if (isLoadingCounter) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="PROCESAREA RECEPȚIEI" />,
        <Typography variant="medium" component="p">
          Numǎr înmatriculare: {counter.truckNumber}
        </Typography>,
        sealNumbers.map((sealNumber, idx) => (
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
              uploadUrl={`/shop-reception-mobile/truck/shop/upload_shop/security/` + id}
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

export default SupportScanStep5
