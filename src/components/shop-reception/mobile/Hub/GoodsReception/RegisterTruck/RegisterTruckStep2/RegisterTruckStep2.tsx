import { Grid } from "../../../../../Common/Grid";
import { Button, Divider, IconButton, Input, Table, Typography } from "@fullscreendigital/carrefour-dex-fe";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotification } from "../../../../../../../hooks";
import { getValidationSchema, initialValues } from './helpers'
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { TitleHeader } from "../../../../Common/TitleHeader";
import { FlexCenter } from "../../../../../Common/FlexCenter";
import { ManageSearch as ManageSearchIcon } from "@mui/icons-material";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import AlertModal from "../../../../Common/AlertModal/AlertModal";
import { URLS } from "../../../../constants";

const RegisterTruckStep2 = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [counter, setCounter] = useState(0)
  const [isScanSuccessModalOpen, setIsScanSuccessModalOpen] = useState(false);
  const [scanSuccessModalContent, setScanSuccessModalContent] = useState({ title: '', buttons: [] });
  const [isInvalidScanModalOpen, setIsInvalidScanModalOpen] = useState(false);
  const [invalidScanModalContent, setInvalidScanModalContent] = useState({ title: '', description: '', buttons: [] });
  const [params] = useSearchParams();
  const id = params.get('id')

  const { data: truck, isLoading } = useQuery(
    'RTcounter',
    async () => {
      const truck = await makeCoreGetRequest('/shop-reception-mobile/truck/hub/summary/' + id, null)
      setCounter(truck.supportCounter)

      return truck;
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

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const toggleIsSearching = async () => {
    if (formik.values.supportCode.length > 0) {
      const resp = await makeCorePostRequest('/shop-reception-mobile/support/hub/register/scan/' + id, { supportCode: formik.values.supportCode })
      resp.scanSuccess && openScanSuccessModal(resp.message)
      !resp.scanSuccess && openInvalidScanModal(resp.message)
    }
  }

  const openScanSuccessModal = async (message) => {
    setScanSuccessModalContent({
      title: message,
      buttons: [
        {
          label: 'Refuză',
          onClick: () => {
            formik.setFieldValue('supportCode', '')
            setIsScanSuccessModalOpen(false);
          },
          color: 'primary'
        },
        {
          label: 'Urc în camion  confirm',
          onClick: async () => {
            const resp = await makeCorePostRequest('/shop-reception-mobile/support/hub/addInTruck/' + id, { supportCode: formik.values.supportCode })
            await formik.setFieldValue('supportCode', '')
            setCounter(resp.supportCounter)
            setIsScanSuccessModalOpen(false);
          },
          color: 'primary'
        },
      ]
    });
    setIsScanSuccessModalOpen(true);
  };

  const openInvalidScanModal = async (message) => {
    setInvalidScanModalContent({
      title: 'Atenție!',
      description: message,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            formik.setFieldValue('supportCode', '')
            setIsInvalidScanModalOpen(false);
          },
          color: 'primary'
        },
      ]
    });
    setIsInvalidScanModalOpen(true);
  };

  const closeScanSuccessModal = () => {
    setIsScanSuccessModalOpen(false);
  };

  const closeInvalidScanModal = () => {
    setIsInvalidScanModalOpen(false);
  };

  const handleSubmit = async () => {
    let time = new Date().toLocaleTimeString();
    let date = new Date().toISOString();
    const payload = {
      receptionTruckId: id,
      supportsNumber: null,
      inHubReleaseDateTime: null,
      inHubPresentationHour: null,
      inHubReleaseHour: null,
      inHubLoadingDateTime: date,
      inHubLoadingHour: time,
      truckNumberHub: truck.truckNumber,
      driverName: null,
      loadedSupportsNumber: counter,
      inShopReleaseDate: null,
      inShopReleaseHour: null
    }
    await makeCorePostRequest('/shop-reception-mobile/supportTraceability', payload)
    // navigate(URLS.AUTH_REGISTER_TRUCK_STEP_3, { state: { id } })
    navigate(`${URLS.AUTH_REGISTER_TRUCK_STEP_3}?id=${id}`)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <FlexCenter>
          <Input
            type='text'
            label='Cod Suport'
            variant='standard'
            width='100%'
            value={formik.values.supportCode}
            onChange={event => formik.setFieldValue('supportCode', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.supportCode}
            helperText={formik.errors.supportCode as string}
          />
          <IconButton onClick={toggleIsSearching}>
            <ManageSearchIcon />
          </IconButton>
        </FlexCenter>,
        <Divider>SAU</Divider>,
        <Button
          type='button'
          variant='contained'
          label='Suporți finalizați'
          size='large'
          style={{ width: '100%', display: counter === 0 ? 'none' : 'block' }}
          onClick={() => handleSubmit()}
        />,
        <>
          <Typography variant='medium' component='p'>Numǎr camion: {truck.truckNumber}</Typography>
          <Typography variant='medium' component='p'>Numǎr suporți scanați: {counter}</Typography>
        </>,
        <AlertModal
          open={isScanSuccessModalOpen}
          handleClose={closeScanSuccessModal}
          title={scanSuccessModalContent.title}
          buttons={scanSuccessModalContent.buttons}
        />,
        <AlertModal
          open={isInvalidScanModalOpen}
          handleClose={closeInvalidScanModal}
          title={invalidScanModalContent.title}
          description={invalidScanModalContent.description}
          buttons={invalidScanModalContent.buttons}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default RegisterTruckStep2