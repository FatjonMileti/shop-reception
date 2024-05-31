import { Grid } from '../../../../../Common/Grid'
import { Table, Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from "../../../../Common/TitleHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URLS } from "../../../../constants";
import React from 'react';
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../../../../../utils/api";
import { TableRowType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table";
import { columns } from "./helpers";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { useNotification } from "../../../../../../../hooks";


const ContinueReturnDetail = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate()
  const [params] = useSearchParams();
  const truckId = params.get('id')


  const { data: CRTruck, isLoading} = useQuery(
    'getTruckById',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/getNoticeList/' + truckId, null)
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

  const { data: noticeList, isLoading: isNoticeListLoading} = useQuery(
    'CReturnDetails',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/exit/getTruckModel/' + truckId, null)
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

  const calculateTotal = (data) => {
    return data.reduce((sum, item) => sum + parseInt(item.truckNumber, 10), 0)
  }

  if (isLoading || isNoticeListLoading) {
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
            <Typography variant='medium' component='p'>Numǎr camion: {truckId}</Typography>,
            <Typography variant='medium' component='p'>Destinație: {CRTruck[0].shopName ? CRTruck[0].shopName : ''}</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Typography variant='medium' component='h4'>Sumar Avize</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={noticeList as TableRowType[]}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Typography variant='medium' component='p'>Total: {calculateTotal(noticeList)}</Typography>,
        <Button
          type='button'
          variant='contained'
          label='PASUL URMǍTOR'
          style={{width: '100%'}}
          onClick={() => {
            navigate(`${URLS.AUTH_RECORD_RETURN_STEP_4}?id=${truckId}`)
          }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default ContinueReturnDetail