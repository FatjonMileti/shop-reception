import { Grid } from '../../../../../Common/Grid'
import { Button, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { columns } from './helpers'
import { useNotification } from "../../../../../../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import React, { useState } from "react";
import { TableRowType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table/Table";
import AlertModal from "../../../../Common/AlertModal/AlertModal";


const ExpectedReturnDetailFinal = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate()
  const [isInvalidTruckNumberModalOpen, setIsInvalidTruckNumberModalOpen] = useState(false);
  const [InvalidTruckNumberModalContent, setInvalidTruckNumberModalContent] = useState({ title: '', description: '', buttons: [] });
  const [params] = useSearchParams();
  const truckId = params.get('id');

  const { data, isLoading} = useQuery(
    'getSummaryById',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/exit/summary/' + truckId, null)
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

  const openInvalidTruckNumberModal = async () => {
      setInvalidTruckNumberModalContent({
        title: 'Confirmaţi finalizarea recepţiei ambalajelor?',
        description: '',
        buttons: [
          {
            label: 'Finalizare',
            onClick: async () => {
              await makeCorePostRequest('/shop-reception-mobile/truck/hub/exit/finaliseReturn/' + truckId, null);
              setIsInvalidTruckNumberModalOpen(false);
              navigate('/goodsReturn')
            },
            color: 'primary'
          },
          {
            label: 'Continuă verificarea',
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='RETURURI AȘTEPTATE CAMION' />,
        <>
          <Typography variant='medium' component='p'>{data.truckNumber} / {data.driverName}</Typography>
          <Typography variant='medium' component='p'>{data.shopNamesAndCodes}</Typography>
        </>,
        <Typography variant='medium' component='h4'>Sumar Recepție Ambalaje</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={data.supportList as TableRowType[]}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Button
          style={{ width: "100%" }}
          type='button'
          variant='contained'
          label='FINALIZEAZĂ'
          onClick={openInvalidTruckNumberModal}
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

export default ExpectedReturnDetailFinal
