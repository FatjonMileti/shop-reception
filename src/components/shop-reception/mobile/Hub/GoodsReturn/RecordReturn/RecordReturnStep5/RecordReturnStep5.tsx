import { Grid } from '../../../../../Common/Grid'
import { Button, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from "../../../../Common/TitleHeader";
import { useNotification } from "../../../../../../../hooks";
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { toPayload } from './serializers'
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import ImageUpload from "../../../../Common/ImageUpload/ImageUpload";

const ContinueReturnDetailFinal = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate()
  const [sealNumbers, setSealNumbers] = useState(['']);
  const [numFields, setNumFields] = useState(1)
  const [params] = useSearchParams();
  const id = params.get('id');

  const { data: CRTruck, isLoading} = useQuery(
    'getTruck',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/truck/' + id, null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
    }
  )

  const addSealNumberField = () => {
    if (numFields < 3) {
      setNumFields(numFields + 1);
      setSealNumbers([...sealNumbers, '']);
    }
  };

  const handleSuccess = () => {
    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    });
  };

  const handleError = (error) => {
    showNotification({
      message: `Error uploading image: ${error.message}`,
      type: 'error'
    });
  };



  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = toPayload(formik.values)

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const saveTruck = () => {
    const sealList = [];

    sealNumbers.forEach(seal => {
      sealList.push(seal);
    });

    const truck = {
      "notice": CRTruck.truckNumber,
      "stackNumber": CRTruck.stackNumber,
      sealList,
    };

    try {
      makeCorePostRequest('/shop-reception-mobile/truck/hub/return/registration/save-notice/' + id, truck).then(() => navigate('/goodsReturn'))
    }
    catch (error) {
      showNotification({
        message: `Error while saving truck. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='CONTINUARE RETUR CAMION' />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>Numǎr camion: {CRTruck?.truckNumber}</Typography>,
            <Typography variant='medium' component='p'>Destinație: {CRTruck?.depositName}</Typography>,
            <Typography variant='medium' component='p'>Numǎr stive: {CRTruck?.stackNumber}</Typography>
          ]}
          itemsPerRow={1}
        />,
        sealNumbers.map((sealNumber, idx) => (
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <Input
              key={idx}
              type='text'
              label='Număr sigiliu'
              value={sealNumbers[idx]}
              variant='standard'
              width='100%'
              onChange={(event) => {
                const newValues = [...sealNumbers];
                newValues[idx] = (event.target as HTMLInputElement).value;
                setSealNumbers(newValues);
              }}
            />
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/hub/return/registration/image/` + id + `?notice=false`}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )),
        <Button
          type='button'
          variant='contained'
          label='ADAUGĂ ALT SIGILIU'
          onClick={addSealNumberField}
          style={{ width: '100%' }}
        />,
        (sealNumbers[0] !== '' &&
          <Button
            type='button'
            variant='contained'
            label='FINALIZEAZǍ'
            onClick={saveTruck}
            style={{ width: '100%' }}
          />
        )
      ]}
      itemsPerRow={1}
    />
  )
}

export default ContinueReturnDetailFinal
