import { Grid } from '../../../../Common/Grid'
import { Button, Table, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { TitleHeader } from '../../../Common/TitleHeader'
import { columns } from './helpers'
import { useNotification } from "../../../../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { getValidationSchema, initialValues } from "../Step2/helpers";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";

const rows = [
  {
    'packagingType': 'POLITA ROLLS FLORI (POL)',
    'amount': 1
  },
  {
    'packagingType': 'PALET INDUSTRIAL/ATIPIC 100X120',
    'amount': 8
  },
  {
    'packagingType': 'PALET CHEP',
    'amount': 10
  }
]

const Step3 = () => {
  const { showNotification } = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.state?.id || '';

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {

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
          onClick={null}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default Step3
