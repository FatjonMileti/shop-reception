import { Grid } from '../../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../../Common/TitleHeader'
import {useLocation, useNavigate} from 'react-router-dom'
import { URLS } from '../../../../constants'
import {useNotification} from "../../../../../../../hooks";
import {useQuery} from "react-query";
import {makeCoreGetRequest} from "../../../../../../../utils/api";
import {formatErrorMessage} from "../../../../../../../utils/formatting";
import React from "react";

const DeliveryDetail = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const location = useLocation();
  const id = location.state?.truck.id;

  const { data: truck, isLoading} = useQuery(
    'validationTruck',
    async () => {
        return await makeCoreGetRequest('/shop-reception-mobile/integral/truck/deliveryTicketList/' + id, null)
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
          <Typography variant='medium' component='p'>Suporți verificați: {truck.supportCounter} / {truck.totalSupportNumber}</Typography>
        </>,
        <Button
          type='button'
          variant='contained'
          label='SCANARE INTEGRALǍ'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_COMPLETE_SCAN)}
        />,
        <Button
          type='button'
          variant='contained'
          label='PRODUSE SENSIBILE'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_SENSITIVE_PRODUCTS)}
        />,
        <Button
          type='button'
          variant='contained'
          label='SUPORT ALEATOR'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_SUPPORT)}
        />,
        <Button
          type='button'
          variant='contained'
          label='PRODUSE ALEATOR'
          size='large'
          style={{ width: '100%' }}
          onClick={() => navigate(URLS.AUTH_DELIVERY_RANDOM_PRODUCT)}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default DeliveryDetail
