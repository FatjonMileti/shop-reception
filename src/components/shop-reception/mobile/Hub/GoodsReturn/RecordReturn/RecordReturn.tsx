import { Grid } from '../../../../Common/Grid'
import { Button, Checkbox, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, { useEffect, useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { URLS } from '../../../constants'
import { useQuery } from 'react-query'
import { TitleHeader } from '../../../Common/TitleHeader'
import { makeCoreGetRequest, makeCorePostRequest } from '../../../../../../utils/api'
import AlertModal from '../../../Common/AlertModal/AlertModal'
import { CircularProgress } from '@mui/material'

const RecordReturn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()
  const [truckId, setTruckId] = useState(0)
  const [isInvalidTruckNumberModalOpen, setIsInvalidTruckNumberModalOpen] = useState(false)
  const [InvalidTruckNumberModalContent, setInvalidTruckNumberModalContent] = useState({
    title: '',
    description: '',
    buttons: []
  })

  useEffect(() => {
    const id = location.state?.truckId;

    console.log(location.state);
    if (id) {
      loadReturnTruck(id);
      setTruckId(id);
    }
  }, [location])

  const { data: depositList, isLoading } = useQuery(
    'recordReturn',
    async () => {
      return await makeCoreGetRequest(
        '/shop-reception-mobile/truck/hub/return/registration/deposit-and-hub-returns',
        null
      )
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

  const loadReturnTruck = id => {
    try {
      makeCoreGetRequest(`/shop-reception-mobile/truck/hub/exit/truck/${id}`, null).then(truck => {
        formik.setValues({
          depositId: truck.depositId,
          truckNumber: truck.truckNumber,
          driverName: truck.driverName,
          packageReturn: truck.packageReturn,
          productReturn: truck.productReturn
        })
      })
    } catch (error) {
      showNotification({
        message: `Error while fetching truck. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const payload = {
        id: truckId,
        truckNumber: values.truckNumber,
        driverName: values.driverName,
        packageReturn: values.packageReturn,
        productReturn: false,
        depositType: null,
        depositId: values.depositId,
        noticeNumber: null,
        shopName: null,
        hubCode: null
      }
      try {
        const resp = await makeCorePostRequest(
          '/shop-reception-mobile/truck/hub/return/registration/save',
          payload
        )

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
      description:
        'Există deja un camion în curs de înregistrare cu acest număr pentru aceeasi dată!',
      buttons: [
        {
          label: 'Ok',
          onClick: () => setIsInvalidTruckNumberModalOpen(false),
          color: 'primary'
        }
      ]
    })
    setIsInvalidTruckNumberModalOpen(true)
  }

  const closeInvalidTruckNumberModal = () => {
    setIsInvalidTruckNumberModalOpen(false)
  }

  if (isLoading) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth="xs"
      items={[
        <TitleHeader title="ÎNREGISTRARE RETUR" />,
        <Input
          type="select"
          label="Destinație"
          variant="standard"
          width="100%"
          value={formik.values.depositId}
          values={depositList?.map(deposit => ({ value: deposit.id, label: deposit.name }))}
          onChange={event =>
            formik.setFieldValue('depositId', (event.target as HTMLInputElement).value)
          }
          error={!!formik.errors.depositId}
          helperText={formik.errors.depositId as string}
        />,
        <Input
          type="text"
          label="Numǎr înmatriculare"
          variant="standard"
          width="100%"
          value={formik.values.truckNumber}
          onChange={event =>
            formik.setFieldValue('truckNumber', (event.target as HTMLInputElement).value)
          }
          error={!!formik.errors.truckNumber}
          helperText={formik.errors.truckNumber as string}
        />,
        <Input
          type="text"
          label="Șofer"
          variant="standard"
          width="100%"
          value={formik.values.driverName}
          onChange={event =>
            formik.setFieldValue('driverName', (event.target as HTMLInputElement).value)
          }
          error={!!formik.errors.driverName}
          helperText={formik.errors.driverName as string}
        />,
        <Checkbox
          checked={formik.values.packageReturn}
          onChange={event =>
            formik.setFieldValue('packageReturn', (event.target as HTMLInputElement).checked)
          }
          label="Retur ambalaje"
        />,
        <Button
          style={{ width: '100%' }}
          type="button"
          variant="contained"
          label="PASUL URMǍTOR"
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
