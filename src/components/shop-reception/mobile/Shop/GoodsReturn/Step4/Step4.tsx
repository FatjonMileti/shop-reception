import { Grid } from "../../../../Common/Grid";
import { Button, Input } from "@fullscreendigital/carrefour-dex-fe";
import { TitleHeader } from "../../../Common/TitleHeader";
import ImageUpload from "../../../Common/ImageUpload/ImageUpload";
import { useNotification } from "../../../../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from "../Step3/helpers";
import { useFormik } from "formik";
import { URLS } from "../../../constants";

const Step4 = () => {
  const { showNotification } = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const [numFields, setNumFields] = useState(1)
  const id = location.state || '';

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        await makeCorePostRequest('/shop-reception-mobile/truck/exit/saveSupportList/' + id, {});
        navigate(URLS.AUTH_RETURN_STEP_5, { state: id });
      }
      catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: returnTruck, isLoading: isLoadingTruck} = useQuery(
    'returnTruck',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/exit/getTruckModel/' + id, null);
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
      setNumFields(numFields + 1);
      formik.values.sealList.map(sealCode => {
        console.log(sealCode);
      })
      // setSealNumbers([...sealNumbers, '']);
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

  if (isLoadingTruck) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <Input
          type='text'
          label='Număr stive'
          variant='standard'
          width='100%'
        />,
        formik.values.sealList.map((sealNumber, idx) => (
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <Input
              type='text'
              label='Număr sigiliu'
              variant='standard'
              width='100%'
            />
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/truck/upload_shop/security/` + id}
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
          onClick={null}
          style={{ width: '100%' }}
        />,
        <Button
          type='button'
          variant='contained'
          label='FINALIZEAZǍ'
          onClick={null}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step4
