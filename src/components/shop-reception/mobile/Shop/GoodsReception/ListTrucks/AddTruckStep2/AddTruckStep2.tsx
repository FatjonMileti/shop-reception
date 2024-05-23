import { Grid } from '../../../../../Common/Grid'
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe";
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../../utils/formatting'
import { useNotification } from '../../../../../../../hooks'
import { TitleHeader } from '../../../../Common/TitleHeader'
import {useQuery} from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DeleteActionIcon } from "../../../../../../../icons";
import { URLS } from "../../../../constants";

const AddTruckStep2 = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [selectedBls, setSelectedBls] = useState([]);
  const location = useLocation();
  const truckId = location.state?.response.id;

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async () => {}
  })

  const onSubmit = async (values, navigateTo) => {
    const ticketIdList = [];
    try {
      values.blList.forEach(bl => {
        ticketIdList.push({id: bl.id});
      });

      await makeCorePostRequest('/shop-reception-mobile/truck/saveBlListForTruck', {id: truckId, deliveryTicketList: ticketIdList});

      navigate(navigateTo);
    } catch (error) {
      showNotification({
        message: `Error while submitting. ${formatErrorMessage(error)}`,
        type: 'error'
      });
    }
  };

  //TODO Go back to previous page, send truckId

  const { data: truck, isLoading} = useQuery(
    'truckWithBls',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/getTruckCreationDTOWithBls/' + truckId, null)
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching truck. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSelectChange = event => {
    const value = event.target.value;
    formik.setFieldValue('blList', value);
    setSelectedBls(value);
  };

  const removeBl = idx => {
    const newList = formik.values.blList.filter((_, index) => index !== idx);
    formik.setFieldValue('blList', newList);
    setSelectedBls(newList);
  };

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ADAUGǍ CAMION' />,
        <>
          <Typography variant='medium' component='p'>Magazin HYPER ORADEA2</Typography>
          <Typography variant='medium' component='p'>{truck.truckNumber} / {truck.driverName}</Typography>
          <Typography variant='medium' component='p'>Sigilii {truck.concatenatedSeals}</Typography>
        </>,
        <Typography variant='medium' component='p'>Adauga bonuri livrare</Typography>,
        <Select
          sx={{ width: "100%" }}
          multiple
          value={formik.values.blList}
          onChange={handleSelectChange}
          renderValue={selected => selected.map(item => `${item.externalTicketId}`).join(', ')}
        >
          {truck.deliveryTicketList?.map((bl) => (
            <MenuItem key={bl.id} value={bl}>
              {bl.externalTicketId} - {bl.depositName}
            </MenuItem>
          ))}
        </Select>,
        <Table>
          <TableHead style={{backgroundColor: '#0970E6'}}>
            <TableRow>
              <TableCell>External Ticket ID</TableCell>
              <TableCell>Deposit Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formik.values.blList.map((bl, index) => (
              <TableRow key={index}>
                <TableCell>{bl.externalTicketId}</TableCell>
                <TableCell>{bl.depositName}</TableCell>
                <TableCell>
                  <Button onClick={() => removeBl(index)} label=''><DeleteActionIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>,
        <Button
          type='button'
          variant='contained'
          label='ÎNCEPE RECEPȚIA'
          onClick={() => onSubmit(formik.values, URLS.AUTH_TRUCK_DETAIL.replace(':id', truckId.toString()))}
          style={{ width: '100%' }}
          disabled={selectedBls.length === 0}
        />,
        <Button
          type='button'
          variant='contained'
          label='SALVARE CAMION'
          onClick={() => onSubmit(formik.values, URLS.AUTH_LIST_TRUCKS)}
          style={{ width: '100%' }}
          disabled={selectedBls.length === 0}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default AddTruckStep2
