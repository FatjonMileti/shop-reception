import { Grid } from '../../../../Common/Grid'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'

import { useNavigate, useSearchParams } from "react-router-dom";
import { URLS } from '../../../constants'
import { useQuery } from "react-query";
import { TitleHeader } from "../../../Common/TitleHeader";
import { makeCoreGetRequest, makeCorePostRequest  } from "../../../../../../utils/api";
import AlertModal from "../../../Common/AlertModal/AlertModal";

const RecordReturn = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [params] = useSearchParams();
  const truckId = params.get('id');
  const [isInvalidTruckNumberModalOpen, setIsInvalidTruckNumberModalOpen] = useState(false)
  const [InvalidTruckNumberModalContent, setInvalidTruckNumberModalContent] = useState({ title: '', description: '', buttons: [] })

  const { data: depositList, isLoading} = useQuery(
    'recordReturn',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/getDepositAndHubReturnList', null)

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

  const { data: truck, isLoading: truckLoading} = useQuery(
    'recordTruck',
    async () => {
      const truck = await makeCoreGetRequest('/shop-reception-mobile/truck/exit/getTruck/' + truckId, null)
      await formik.setValues({
        id: truck.depositId,
        truckNumber: truck.truckNumber,
        driverName: truck.driverName,
        packageReturn: truck.packageReturn,
        productReturn: truck.productReturn
      })
      return truck

    },
    {
      enabled:!!truckId,
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
    onSubmit: async (values: any) => {
      try {
        const resp = await makeCorePostRequest('/shop-reception-mobile/truck/hub/return/registration/save', {
          "id": values.id,
          "truckNumber": values.truckNumber,
          "driverName": values.driverName,
          "packageReturn": values.packageReturn,
          "productReturn": false,
          "depositType": null,
          "depositId": truck.depositId,
          "noticeNumber": null,
          "shopName": null,
          "hubCode": null
        })

        if (resp.id) {
          navigate(`${URLS.AUTH_RECORD_RETURN_STEP_2}?id=${resp.id}`)
        } else {
          openInvalidTruckNumberModal()
        }

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })


  const openInvalidTruckNumberModal = () => {
    setInvalidTruckNumberModalContent({
      title: 'Atenție!',
      description: 'Există deja un camion în curs de înregistrare cu acest număr pentru aceeasi dată!',
      buttons: [
        {
          label: 'Ok',
          onClick: () => setIsInvalidTruckNumberModalOpen(false),
          color: 'primary'
        },
      ]
    });
    setIsInvalidTruckNumberModalOpen(true);
  };

  const closeInvalidTruckNumberModal = () => {
    setIsInvalidTruckNumberModalOpen(false);
  };

  if (isLoading || truckLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTRARE RETUR' />,
        <Input
          type='select'
          label='Destinație'
          variant='standard'
          width='100%'
          value={formik.values.id}
          values={depositList?.map(deposit => ({ value: deposit.id, label: deposit.name }))}
          onChange={event => formik.setFieldValue('id', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.id}
          helperText={formik.errors.id as string}
        />,
        <Input
          type='text'
          label='Numǎr înmatriculare'
          variant='standard'
          width='100%'
          value={formik.values.truckNumber}
          onChange={event => formik.setFieldValue('truckNumber', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.truckNumber}
          helperText={formik.errors.truckNumber as string}
        />,
        <Input
          type='text'
          label='Șofer'
          variant='standard'
          width='100%'
          value={formik.values.driverName}
          onChange={event => formik.setFieldValue('driverName', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.driverName}
          helperText={formik.errors.driverName as string}
        />,
        <Checkbox
          checked={formik.values.packageReturn}
          onChange={event => formik.setFieldValue('packageReturn', (event.target as HTMLInputElement).checked)}
          label='Retur ambalaje'
        />,
        <Button
          style={{width: '100%'}}
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          disabled={formik.values.packageReturn === false && formik.values.productReturn === false}
          onClick={() => formik.handleSubmit()}
        />,
        <AlertModal
          open={isInvalidTruckNumberModalOpen}
          handleClose={closeInvalidTruckNumberModal}
          title={InvalidTruckNumberModalContent.title}
          description={InvalidTruckNumberModalContent.description}
          buttons={InvalidTruckNumberModalContent.buttons}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default RecordReturn