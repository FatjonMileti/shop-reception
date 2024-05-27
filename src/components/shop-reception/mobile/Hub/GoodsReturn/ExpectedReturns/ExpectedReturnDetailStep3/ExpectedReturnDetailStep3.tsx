import { Grid } from "../../../../../Common/Grid";
import { Button, Input, Table, Typography } from "@fullscreendigital/carrefour-dex-fe";
import { TitleHeader } from "../../../../Common/TitleHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { URLS } from "../../../../constants";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { useFormik } from "formik";
import { getValidationSchema, initialValues } from "./helpers";
import React, { useMemo, useState } from "react";
import { useNotification } from "../../../../../../../hooks";
import { TableHeaderType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table";
import { MenuItem, Select } from "@mui/material";
import ImageUpload from "../../../../Common/ImageUpload/ImageUpload";
import AlertModal from "../../../../Common/AlertModal/AlertModal";


const ExpectedReturnDetailStep3 = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const location = useLocation();
  const [isInvalidTruckNumberModalOpen, setIsInvalidTruckNumberModalOpen] = useState(false);
  const [InvalidTruckNumberModalContent, setInvalidTruckNumberModalContent] = useState({ title: '', description: '', buttons: [] });
  const { parentId, truckId } = location.state;
  let imgMessage = "Atasaţi imagini doveditoare! ";

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        let message = 'Există diferențe între cantitatea aşteptată şi cea descărcată pentru ';
        let continueSubmit = true;
        let showTerminatButton = true;

        values.supportList.map((support: any) => {
          if(!support.hasPhoto && support.confirmedSupportNumber != 0) {
            console.log('hasPhoto: ', support.supportTypeName)
            message += support.supportTypeName + ', ';
            continueSubmit = false;
            if(!(support.confirmedSupportNumber === 0))  showTerminatButton = false;
            openInvalidTruckNumberModal(message, showTerminatButton);
          }
        })

        showTerminatButton && values.supportList.map((support: any) => {
          if(support.supportNumber != support.confirmedSupportNumber) {
            console.log('aaaa: ', support.supportTypeName)
            message += support.supportTypeName + ', ';
            continueSubmit = false;
            openInvalidTruckNumberModal(message, showTerminatButton)
          }
        })

        continueSubmit && await onContinueSubmit()

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: truck, isLoading} = useQuery(
    'RDsupportList',
    async () => {
      const truck = await makeCoreGetRequest('/shop-reception-mobile/truck/hub/exit/supportList/' + truckId  + '?parentId=' + parentId, null)
      await formik.setFieldValue("supportList", truck.supportList)
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

  const { data: allSupportList, isLoading: isSupportListLoading} = useQuery(
    'RDallSupportList',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/exit/allSupportList/' + truckId, null)
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
    await makeCorePostRequest('/shop-reception-mobile/truck/hub/exit/confirmSupportList', formik.values.supportList, null);
    navigate(URLS.AUTH_EXPECTED_RETURN_DETAIL_FINAL, {state: truckId})
  }

  const openInvalidTruckNumberModal = async (message, showTerminatButton) => {
    showTerminatButton ?
    setInvalidTruckNumberModalContent({
      title: 'Atenție!',
      description: message,
      buttons: [
        {
          label: 'Am terminat',
          onClick: async () => {
            await onContinueSubmit();
            setIsInvalidTruckNumberModalOpen(false);
          },
          color: 'primary'
        },
        {
          label: 'Mai verific',
          onClick: () => setIsInvalidTruckNumberModalOpen(false),
          color: 'primary'
        },
      ]
    }) :  setInvalidTruckNumberModalContent({
        title: 'Atenție!',
        description: message + imgMessage,
        buttons: [
          {
            label: 'Mai verific',
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

  if (isLoading || isSupportListLoading) {
    return <div>Loading...</div>;
  }

  const handleSuccess = (id) => {
    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    });
    formik.setFieldValue(`supportList[${id}].hasPhoto`, true)
  };

  const handleError = (error) => {
    showNotification({
      message: `Error uploading image: ${error.message}`,
      type: 'error'
    });
  };

  const columns: Array<TableHeaderType> = [
    {
      title: '',
      field: 'supportCode',
      align: 'left'
    },
    {
      title: '',
      field: 'supportTypeName',
      align: 'left'
    },
    {
      title: 'CANTITATE',
      field: 'confirmedSupportNumber',
      align: 'center',
      render: (rowData: any) => (
        <Input
          type="number"
          value={rowData.confirmedSupportNumber}
          onChange={(e) => {
            formik.values.supportList.map((support: any, idx) => {
              if (rowData.id === idx) {
                formik.setFieldValue(`supportList[${idx}].confirmedSupportNumber`, (e.target as HTMLInputElement).value)
              }
            })
          }}
          variant='standard'
        />
      )
    },
    {
      title: '',
      field: 'hasPhoto',
      align: 'left',
      render: (rowData: any) => (
        <ImageUpload
          uploadUrl={`/shop-reception-mobile/truck/hub/return/registration/image/` + rowData.id + `?notice=false`}
          onSuccess={() => handleSuccess(rowData.id)}
          onError={handleError}
          inputId={`support${rowData.id}`}
        />
      )
    },
  ]

  const rows = formik.values.supportList.map((support, index) => ({
    id: index,
    supportCode: support.supportCode,
    supportTypeName: support.supportTypeName,
    confirmedSupportNumber: support.confirmedSupportNumber,
    hasPhoto: support.hasPhoto,
    }))

  const handleSelectChange = event => {
    const value = event.target.value;
    formik.setFieldValue('supportList', value);
  };

  console.info('formik.values: ', formik.values)
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='RETURURI AȘTEPTATE CAMION' />,
        <>
          <Typography variant='medium' component='p'>{truck.truckNumber} / {truck.driverName}</Typography>
          <Typography variant='medium' component='p'>{truck.shopNameAndCode} - numar aviz {truck.noticeNumber}</Typography>
        </>,
        <Typography variant='medium' component='h4'>Recepție retur</Typography>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Select
          sx={{ width: "100%" }}
          multiple
          value={formik.values?.supportList}
          onChange={handleSelectChange}
          renderValue={selected => selected?.map(item => `${item.supportCode}`).join(', ')}
        >
          {allSupportList?.map((sl) => (
            <MenuItem key={sl.id} value={sl}>
              {sl.supportCode} - {sl.supportTypeName}
            </MenuItem>
          ))}
        </Select>,
        <Button
          style={{ width: "100%" }}
          type='button'
          variant='contained'
          label='SUMAR CAMION'
          onClick={() => {
            formik.handleSubmit(formik.values.supportList)
          }}
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

export default ExpectedReturnDetailStep3
