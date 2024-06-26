import { Grid } from '../../../../../Common/Grid'
import { Button, Input, Typography, Table } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../../Common/TitleHeader'
import { useNavigate, useSearchParams } from "react-router-dom";
import { URLS } from '../../../../constants';
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { useNotification } from "../../../../../../../hooks";
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from "./helpers";
import { useFormik } from "formik";
import { TableHeaderType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table";
import AlertModal from "../../../../Common/AlertModal/AlertModal";


const ExpectedReturnDetailStep2 = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const [isInvalidTruckNumberModalOpen, setIsInvalidTruckNumberModalOpen] = useState(false);
  const [InvalidTruckNumberModalContent, setInvalidTruckNumberModalContent] = useState({ title: '', description: '', buttons: [] });
  const [params] = useSearchParams();
  const parentId = params.get('id');

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      let message = 'Există diferențe între cantitatea aşteptată şi cea descărcată pentru ';
      let continueSubmit = true

      values.stackList.map((stack: any) => {
        if( stack.stackNumber != stack.confirmedStackNumber) {
          message += ' numărul de stive la ' + stack.shopName + ', ';
          continueSubmit = false;
          openInvalidTruckNumberModal(message)
        }
      })

      continueSubmit && await onContinueSubmit()

    }
  })
  const { data: truck, isLoading} = useQuery(
    'stackList',
    async () => {
      const truck = await makeCoreGetRequest('/shop-reception-mobile/truck/hub/exit/stacks/' + parentId, null)
      const newStackList = truck.stackList.map((stack, index) => ({
        ...stack,
        id: index,
      }));
      await formik.setValues({
        stackList: newStackList
      })
      return truck
    },
    {
      initialData: [],
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      },
    }
  )

  const onContinueSubmit = async () => {
    const stackList = formik.values.stackList.map(({id, ...rest }) => rest);
    const payload = {
      "id": truck.id,
      "truckNumber": truck.truckNumber,
      "driverName": truck.driverName,
      "shopNamesAndCodes": truck.shopNamesAndCodes,
      "stackList": stackList,
      "nextTruckId": truck.nextTruckId
    }
    await makeCorePostRequest('/shop-reception-mobile/truck/hub/exit/confirm-stacks', payload, null);
    navigate(`${URLS.AUTH_EXPECTED_RETURN_DETAIL_STEP_3}?truckId=${truck.nextTruckId}&parentId=${parentId}`)
  }


  const openInvalidTruckNumberModal = async (message) => {
    setInvalidTruckNumberModalContent({
      title: 'Atenție!',
      description: message,
      buttons: [
        {
          label: 'Mai verific',
          onClick: () => setIsInvalidTruckNumberModalOpen(false),
          color: 'primary'
        },
        {
          label: 'Am terminat',
          onClick: async () => {
            await onContinueSubmit();
            setIsInvalidTruckNumberModalOpen(false);
          },
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

  const columns: Array<TableHeaderType> = [
    {
      title: 'MAGAZIN',
      field: 'shopName',
      align: 'left'
    },
    {
      title: 'NUMĂR STIVE',
      field: 'confirmedStackNumber',
      align: 'center',
      render: (rowData: any) => (
        <Input
          type="number"
          value={rowData.confirmedStackNumber}
          onChange={(e) => {
            formik.values.stackList.map((stack: any) => {
              if (rowData.id === stack.id) {
                formik.setFieldValue(`stackList[${stack.id}].confirmedStackNumber`, (e.target as HTMLInputElement).value)
              }
            })
          }}
          variant='standard'
        />
      )
    },
  ]

  const rows = formik.values.stackList.map((stack: any) => ({
    id: stack.id,
    shopName: stack.shopName,
    confirmedStackNumber: stack.confirmedStackNumber,
  }));

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='RETURURI AȘTEPTATE CAMION' />,
        <>
          <Typography variant='medium' component='p'>{truck.truckNumber} / {truck.driverName}</Typography>
          <Typography variant='medium' component='p'>{truck.shopNamesAndCodes}</Typography>
        </>,
        <Typography variant='medium' component='h4'>Descărcare stive</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Button
          style={{ width: "100%" }}
          type='button'
          variant='contained'
          label='PASUL URMĂTOR'
          onClick={() => formik.handleSubmit(formik.values.stackList)}
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

export default ExpectedReturnDetailStep2
