import { Grid } from '../../../../../Common/Grid'
import { Button, Typography } from '@fullscreendigital/carrefour-dex-fe'
import React, { useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from "../../../../../../../utils/formatting";
import { useNotification } from '../../../../../../../hooks'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { URLS } from "../../../../constants";
import { TitleHeader } from "../../../../Common/TitleHeader";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../utils/api";
import { DeleteActionIcon } from "../../../../../../../icons";


const RecordReturnDetail = () => {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [selectedNls, setSelectedNls] = useState([]);
  const [params] = useSearchParams();
  const truckId = params.get('id');



  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const payload = formik.values.blList.map(bl => bl.id);
        await makeCorePostRequest('/shop-reception-mobile/truck/hub/return/registration/save-notices/' + truckId, payload, null);
        navigate(`${URLS.AUTH_RECORD_RETURN_STEP_3}?id=${truckId}`)


      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const { data: noticeList, isLoading: isNoticeListLoading} = useQuery(
    'getNoticeListId',
    async () => {
      const list = await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/notices/' + truckId, null)
      await formik.setFieldValue('blList', list)
      return list
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



  const { data: noticeLists, isLoading: isNoticeListsLoading} = useQuery(
    'getNoticeLists',
    async () => {
      return await makeCoreGetRequest('/shop-reception-mobile/truck/hub/return/registration/all-notices', null)
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

  const handleSelectChange = event => {
    const value = event.target.value;
    formik.setFieldValue('blList', value);
    setSelectedNls(value);
  };

  const removeBl = idx => {
    const newList = formik.values.blList.filter((_, index) => index !== idx);
    formik.setFieldValue('blList', newList);
    setSelectedNls(newList);
  };


  let items = [
    <TitleHeader title='ÎNREGISTREAZǍ CAMION' />,
    <Typography variant='medium' component='p'>Numǎr camion: {truckId}</Typography>,
    <Typography variant='medium' component='p'>Destinație: {noticeList?.[0]?.shopName ? noticeList[0].shopName : ''}</Typography>,
    <Select
      sx={{ width: "100%" }}
      multiple
      value={formik.values?.blList}
      onChange={handleSelectChange}
      renderValue={selected => selected?.map(item => `${item.noticeNumber}`).join(', ')}
    >
      {noticeLists?.map((nl) => (
        <MenuItem key={nl.id} value={nl}>
          {nl.noticeNumber} - {nl.shopName}
        </MenuItem>
      ))}
    </Select>,
    <Table>
      <TableHead style={{backgroundColor: '#0970E6'}}>
        <TableRow>
          <TableCell>Numar aviz</TableCell>
          <TableCell>Magazin</TableCell>
          <TableCell>Numar stive</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formik.values.blList?.map((nl, index) => (
          <TableRow key={index}>
            <TableCell>{nl.noticeNumber}</TableCell>
            <TableCell>{nl.shopName}</TableCell>
            <TableCell>{nl.stackNumber}</TableCell>
            <TableCell>
              <Button onClick={() => removeBl(index)} label=''><DeleteActionIcon /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>,
    <Button
      style={{ width: '100%' }}
      type='button'
      variant='contained'
      label='PRINT'
      size='large'
      onClick={null}
    />,
    <Button
      style={{ width: '100%' }}
      type='button'
      variant='contained'
      label='CONFIRMǍ'
      disabled={formik.values.blList?.length === 0}
      onClick={()=>formik.handleSubmit()}
    />,
    <Button
      style={{ width: '100%' }}
      type='button'
      variant='contained'
      label='ANULEAZǍ'
      onClick={() => navigate(URLS.AUTH_RECORD_RETURN, {state: truckId})}
    />
  ]

  if (isNoticeListLoading || isNoticeListsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={items}
      itemsPerRow={1}
    />
  )
}

export default RecordReturnDetail
