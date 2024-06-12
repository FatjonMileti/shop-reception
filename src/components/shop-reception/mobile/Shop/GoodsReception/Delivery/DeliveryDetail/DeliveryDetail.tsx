import { Grid } from '../../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import { URLS } from '../../../../constants'
import { useNotification } from "../../../../../../../hooks";
import { useQuery, useQueryClient } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import React, { useState } from "react";
import AlertModal from "../../../../Common/AlertModal/AlertModal";

const DeliveryDetail = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const location = useLocation();
  const [isConfirmIntegrationModalOpen, setIsConfirmIntegrationModalOpen] = useState(false)
  const [confirmIntegrationModalContent, setConfirmIntegrationModalContent] = useState({ title: '', description: '', buttons: [] })
  const queryClient = useQueryClient();
  const id = location.state?.truck.id;

  const { data: truck, isLoading } = useQuery(
    'validationTruck',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/integral/truck/delivery-tickets/' + id, null)
    },
    {
      onSuccess: data => {
        if (data.deliveryTicketList.length === 0) {
          navigate("/goodsReception");
        }
      },
      onError: error => {
        showNotification({
          message: `Error while fetching trucks. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const confirmIntegration = (ticket) => {
    const received = ticket.receivedSupportNumber;
    const expected = ticket.expectedSupportNumber;
    const message = `Au fost recepţionaţi în magazin ${received} suporţi din ${expected} aşteptaţi. `

    setConfirmIntegrationModalContent({
      title: message,
      description: ' Sigur integraţi in Meti? Recepţia va fi închisă după integrare! ',
      buttons: [
        {
          label: 'Da',
          onClick: () => {
            sentDeliveryTicketToMeti(ticket);
            setIsConfirmIntegrationModalOpen(false);
          },
          color: 'primary'
        },
        {
          label: 'Nu',
          onClick: () => {
            setIsConfirmIntegrationModalOpen(false);
          },
          color: 'secondary'
        }
      ]
    });
    setIsConfirmIntegrationModalOpen(true);
  }

  const closeConfirmIntegrationModal = () => {
    setIsConfirmIntegrationModalOpen(false);
  };

  const sentDeliveryTicketToMeti = (deliveryTicket) => {
    try {
      makeCorePostRequest('/shop-reception-mobile/metiIntegration/do-integrate', { deliveryTicketId: deliveryTicket.id }).then(() => {
        queryClient.invalidateQueries('validationTruck').then(() => {});
        // localStorage.removeItem(`myData-${this.truckId}`);
      })
    }
    catch (error) {
      showNotification({
        message: `Error while sending data. ${formatErrorMessage(error)}`,
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
        <TitleHeader title='VALIDARE LIVRARE' />,
        <>
          <Typography variant='medium' component='p'>Numǎr înmatriculare: {truck.truckNumber}</Typography>
          <Typography variant='medium' component='p'>Suporți
            verificați: {truck.supportCounter} / {truck.totalSupportNumber}</Typography>
        </>,
        <Button
          type='button'
          variant='contained'
          label='SCANARE INTEGRALǍ'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN, {state: {id}})}
        />,
        <Button
          type='button'
          variant='contained'
          label='PRODUSE SENSIBILE'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS, {state: {id}})}
        />,
        <Button
          type='button'
          variant='contained'
          label='SUPORT ALEATOR'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT, {state: {id}})}
        />,
        <Button
          type='button'
          variant='contained'
          label='PRODUSE ALEATOR'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT, {state: {id}})}
        />,
        <Button
          type='button'
          variant='contained'
          label='PRODUSE SGR'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT)}
        />,
        <div>
          {truck.deliveryTicketList?.map(ticket => (
            <Button
              key={ticket.externalTicketId}
              size="large"
              variant="contained"
              onClick={() => {confirmIntegration(ticket)}}
              label={'Integrează in Meti  ' + ticket.externalTicketId}
              style={{ width: '100%', background: 'red' }}
            />
          ))}
        </div>,
        <AlertModal
          open={isConfirmIntegrationModalOpen}
          handleClose={closeConfirmIntegrationModal}
          title={confirmIntegrationModalContent.title}
          description={confirmIntegrationModalContent.description}
          buttons={confirmIntegrationModalContent.buttons}
        />,
      ]}
      itemsPerRow={1}
    />
  )
}

export default DeliveryDetail
