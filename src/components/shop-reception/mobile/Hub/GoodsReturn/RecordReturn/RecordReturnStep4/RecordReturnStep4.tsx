import { Grid } from '../../../../../Common/Grid'
import { Button, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from "../../../../Common/TitleHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { URLS } from "../../../../constants";
import { columns } from './helpers'
import React from 'react'
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { useNotification } from "../../../../../../../hooks";
import { TableRowType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table";


const ContinueReturnDetail2 = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate()
  const location = useLocation();

  const truckId = location.state;

  const { data: CRTruck, isLoading} = useQuery(
    'TruckById',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/getTruck/' + truckId, null)
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

  const { data: supportList, isLoading: supportListLoading} = useQuery(
    'SupportList',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/getSupportList/' + truckId, null)
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

  if (isLoading || supportListLoading) {
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
            <Typography variant='medium' component='p'>Numǎr camion: {CRTruck.truckNumber ? CRTruck.truckNumber : ''}</Typography>,
            <Typography variant='medium' component='p'>Destinație: {CRTruck.depositName ? CRTruck.depositName : ''}</Typography>,
            <Typography variant='medium' component='p'>Numǎr stive: {CRTruck.stackNumber}</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Typography variant='medium' component='h4'>Sumar Ambalaje</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={supportList as TableRowType[]}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Button
          style={{width: '100%'}}
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          onClick={() => {
            navigate(URLS.AUTH_RECORD_RETURN_STEP_5, {state: truckId})
          }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ContinueReturnDetail2