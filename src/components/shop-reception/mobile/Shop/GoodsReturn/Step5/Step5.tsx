import { Grid } from '../../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { makeCorePostRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { useNotification } from "../../../../../../hooks";
import { useState } from "react";

const Step5 = () => {
  const { showNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id || '';
  const notice = location.state?.notice;

  const { data: pdfBlob, isLoading: isLoadingPdf} = useQuery(
    'pdfBlob',
    async () => {
      return await makeCorePostRequest('/shop-reception-mobile/truck/exit/getNoticeAsPdf', {id: notice.id, noticeNumber: notice.code});
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching pdf. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const print = () => {
    console.log('Here');
  }

  if (isLoadingPdf) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='COMANDǍ CAMION RETUR' />,
        <Input
          type='text'
          label='Număr aviz'
          variant='outlined'
          width='100%'
          value={notice?.code}
          readonly
        />,
        <Input
          type='text'
          label='Seria aviz'
          variant='outlined'
          width='100%'
          value={notice?.noticeSeries}
          readonly
        />,
        <Button
          type='button'
          variant='contained'
          label='PRINTEAZǍ'
          onClick={() => print()}
          style={{ width: '100%' }}
        />,
        <Button
          type='button'
          variant='contained'
          label='AM TERMINAT'
          onClick={() => navigate('/GoodsReturn')}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step5
