import { Grid } from '../../../../Common/Grid'
import { Button, Input, Table, Typography } from "@fullscreendigital/carrefour-dex-fe";
import { TitleHeader } from '../../../Common/TitleHeader'
import { useNotification } from "../../../../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { getValidationSchema, initialValues } from "./helpers";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { TableHeaderType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table";
import { URLS } from "../../../constants";

const Step3 = () => {
  const { showNotification } = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.state || '';

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const supportList = values.supportList.map(support => ({
        supportTypeId: support.supportTypeId,
        supportNumber: support.supportNumber
      }));

      try {
        await makeCorePostRequest('/shop-reception-mobile/truck/exit/saveSupportList/' + id, {supportList});
        navigate(URLS.AUTH_RETURN_STEP_4, { state: id });
      }
      catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: returnTruck, isLoading: isLoadingSupportList} = useQuery(
    'supportListReturn',
    async () => {
      const truck = await makeCoreGetRequest('/shop-reception-mobile/truck/exit/getReturnSupportList/' + id, null);

      await formik.setValues({ supportList: truck.supportList });
      return truck;
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching supports. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoadingSupportList) {
    return <div>Loading...</div>;
  }

  const columns:Array<TableHeaderType> = [
    {
      title: 'TIP AMBALAJ',
      field: 'packagingType',
      align: 'left'
    },
    {
      title: 'CANTITATE',
      field: 'amount',
      align: 'center',
      render: (rowData: any) => (
        <Input
          type="number"
          value={rowData.amount}
          onChange={(e) => {
            const updatedSupportList = formik.values.supportList.map((support: any) => {
              if (support.supportTypeId === rowData.supportTypeId) {
                return { ...support, supportNumber: (e.target as HTMLInputElement).value };
              }
              return support;
            });
            formik.setFieldValue('supportList', updatedSupportList);
          }}
         variant='standard'
        />
      )
    }
  ]

  const rows = formik.values.supportList.map((support: any) => ({
    packagingType: support.supportTypeNameAndCode,
    amount: support.supportNumber,
    supportTypeId: support.supportTypeId
  }));

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
        <>
          <Typography variant='medium' component='p'>Numǎr camion: {returnTruck?.truckNumber}</Typography>
          <Typography variant='medium' component='p'>Destinație: {returnTruck?.depositOrHubName}</Typography>
        </>,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Button
          type='button'
          variant='contained'
          label='CONFIRMǍ AMBALAJE'
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step3
