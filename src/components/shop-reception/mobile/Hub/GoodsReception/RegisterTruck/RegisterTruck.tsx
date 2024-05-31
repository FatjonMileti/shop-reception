import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../constants'
import { makeCorePostRequest } from "../../../../../../utils/api";
import AlertModal from "../../../Common/AlertModal/AlertModal";

const RegisterTruck = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isInvalidTruckNumberModalOpen, setIsInvalidTruckNumberModalOpen] = useState(false);
  const [InvalidTruckNumberModalContent, setInvalidTruckNumberModalContent] = useState({ title: '', description: '', buttons: [] });
  let id = 0;

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async ({ truckNumber }: any) => {
      try {
        const letters = '^[A-Za-z0-9]+$';
        if (truckNumber.match(letters)) {
          const resp = await makeCorePostRequest('/shop-reception-mobile/truck/hub/save', null);
          id = resp.id;
          navigate(`${URLS.AUTH_REGISTER_TRUCK_STEP_2}?id=${id}`)

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

  const openInvalidTruckNumberModal = async () => {
    setInvalidTruckNumberModalContent({
      title: 'Atenție!',
      description: 'Numărul camionului poate conţine doar litere şi cifre! Exemplu: IF01ABC',
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

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <Input
          type='text'
          label='Număr înmatriculare'
          variant='standard'
          width='100%'
          value={formik.values.truckNumber}
          onChange={event => formik.setFieldValue('truckNumber', (event.target as HTMLInputElement).value)}
          error={!!formik.errors.truckNumber}
          helperText={formik.errors.truckNumber as string}
        />,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          style={{ width: '100%' }}
          onClick={() => formik.handleSubmit(formik.values.truckNumber)}
          disabled={!formik.values.truckNumber.length}
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

export default RegisterTruck
