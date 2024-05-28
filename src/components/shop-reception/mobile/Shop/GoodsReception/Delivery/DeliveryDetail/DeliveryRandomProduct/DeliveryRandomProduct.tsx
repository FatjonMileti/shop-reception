import { useLocation, useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { URLS } from '../../../../../constants'
import { Grid } from '../../../../../../Common/Grid'
import { TitleHeader } from '../../../../../Common/TitleHeader'
import { Button, Divider, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { ManageSearch as ManageSearchIcon } from '@mui/icons-material'
import { useNotification } from "../../../../../../../../hooks";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../../utils/formatting";
import AlertModal from "../../../../../Common/AlertModal/AlertModal";

const DeliveryRandomProduct = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const location = useLocation();
  const [isSupportScanModalOpen, setIsSupportScanModalOpen] = useState(false)
  const [supportScanModalContent, setSupportScanModalContent] = useState({ title: '', description: '', buttons: [] })
  const id = location.state?.id;

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      if (!values.supportCode) {
        return;
      }

      search();
    }
  })

  const { data: truck, isLoading } = useQuery(
    'validationTruck',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/integral/truck/summary/' + id, null)
    },
    {
      onSuccess: data => {
        console.log(data);},
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )
  
  const search = () => {
    try {
      makeCorePostRequest('/shop-reception-mobile/aleatory/support/scan/' + id, formik.values?.supportCode).then(resp => {
        const scanOk = resp.scanSuccess;
        const mess = resp.errorMessage;

        if (scanOk !== true) {
          openSupportScanModal(mess);
        }
        else {
          navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT_FINAL, { state: { ...truck, ...resp } });
          formik.setFieldValue('supportCode', '');
        }
      })
    }
    catch (error) {
      showNotification({
        message: `Error while scanning support. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const openSupportScanModal = (msg) => {
    setSupportScanModalContent({
      title: 'Atenție!',
      description: msg,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsSupportScanModalOpen(false);
          },
          color: 'primary'
        }
      ]
    });
    setIsSupportScanModalOpen(true);
  };

  const closeSupportScanModal = () => {
    setIsSupportScanModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      items={[
        <TitleHeader title='PRODUSE ALEATOR VALIDARE LIVRARE' />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>PRODUSE ALEATOR</Typography>,
            <Typography variant='medium' component='p'>Număr Înmatriculare: {truck?.truckNumber}</Typography>,
            <Typography variant='medium' component='p'>suport verificați: {truck?.supportCounter} / {truck?.totalSupportNumber}</Typography>
          ]}
          itemsPerRow={1}
        />,
        <div style={{ display: 'flex' }}>
          <Input
            type='text'
            label='Cod suport'
            variant='standard'
            width='100%'
            value={formik.values?.supportCode}
            onChange={event => formik.setFieldValue('supportCode', (event.target as HTMLInputElement).value)}
            error={!!formik.errors.supportCode}
            helperText={formik.errors.supportCode as string}
          />
          <IconButton onClick={() => formik.handleSubmit()}>
            <ManageSearchIcon />
          </IconButton>
        </div>,
        <Divider>SAU</Divider>,
        <Button
          type='button'
          variant='contained'
          label='SCANEAZǍ SUPORT'
          onClick={() => console.log('Scanning...')}
          style={{ width: '100%' }}
        />,
        <AlertModal
          open={isSupportScanModalOpen}
          handleClose={closeSupportScanModal}
          title={supportScanModalContent.title}
          description={supportScanModalContent.description}
          buttons={supportScanModalContent.buttons}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default DeliveryRandomProduct
