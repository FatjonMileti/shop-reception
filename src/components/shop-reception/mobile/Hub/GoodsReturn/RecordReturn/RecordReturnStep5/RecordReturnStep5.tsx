import { Grid } from '../../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from "../../../../Common/TitleHeader";
import { Typography } from "@mui/material";
import { useNotification } from "../../../../../../../hooks";
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { toPayload } from './serializers'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import ImageUpload from "../../../../Common/ImageUpload/ImageUpload";

const ContinueReturnDetailFinal = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate()
  const [sealNumbers, setSealNumbers] = useState(['']);
  const [numFields, setNumFields] = useState(1)

  const location = useLocation();

  const id = location.state;

  const { data: CRTruck, isLoading} = useQuery(
    'getTruck',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/getTruck/' + id, null)
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
    const sealList = sealNumbers.map(seal => ({
      id: null,
      code: seal,
      type: null,
      broken: null,
      userMessage: null
    }));

    const truck = {
      sealList,
    };

    try {
      makeCorePostRequest('/shop-reception-mobile/truck/hub/return/registration/saveNotice/' + id, truck).then(() => navigate('/goodsReturn'))
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
        <Typography variant='medium' component='p'>Numǎr camion: {CRTruck.truckNumber ? CRTruck.truckNumber : ''}</Typography>,
        <Typography variant='medium' component='p'>Destinație: {CRTruck.depositName ? CRTruck.depositName : ''}</Typography>,
        <Typography variant='medium' component='p'>Numǎr stive: {CRTruck.stackNumber}</Typography>,
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
              inputId={`seal${idx}`}
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