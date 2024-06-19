import { TitleHeader } from '../../../../../../Common/TitleHeader'
import { Button, DatePicker, Input, Table, Typography } from "@fullscreendigital/carrefour-dex-fe";
import { Grid } from '../../../../../../../Common/Grid'
import { URLS } from '../../../../../../constants'
import React, { useEffect, useMemo, useState } from "react";
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from "react-router-dom";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../../../../utils/formatting";
import { useNotification } from "../../../../../../../../../hooks";
import { useQuery } from "react-query";
import { TableHeaderType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table";
import ImageUpload from "../../../../../../Common/ImageUpload/ImageUpload";
import { DefectReason, Mark } from "../../../../../../../enums";

const DeliveryRandomProductModifica = () => {
  const { showNotification } = useNotification();
  const location = useLocation();
  const queryParams = location.state;
  const navigate = useNavigate()

  const [marks, setMarks] = useState([]);
  const [defectReasons, setDefectReasons] = useState([]);
  const [litigation, setLitigation] = useState(null);

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {

      let submitDlc = values?.dlc;
      if (submitDlc && typeof submitDlc === 'object') {
        submitDlc = submitDlc.toISOString().split('T')[0];
      }

      const payload = {
        id: values.truckId,
        name: values.productName,
        code: values.supportCode,
        ean: values.productEan,
        eanReceived: values.productEans,
        unit: null,
        integral: values.conformQuantity,
        broken: values.defectQuantity,
        quantity: queryParams.quantity,
        shortDlc: true,
        dlc: submitDlc,
        defectReason: values.defectReason,
        mark: values.mark,
        shopReceptionDeviation: values.shopReceptionDeviation,
        supportId: values.supportId,
      }

      try {
        makeCorePostRequest(`/shop-reception-mobile/aleatory/product/saveNewQuantities`, payload).then(
          goBack
        )
      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  })

  const goBack = () => {
    const state = {
      truckId: formik.values.productId,
      ticketId: formik.values.ticketNumber,
      supportCode: formik.values.supportCode,
      productCode: formik.values.productEan,
      supportId: formik.values.supportId,
      currentConformQuantity:formik.values.conformQuantity,
      currentDefectQuantity:formik.values.defectQuantity
    }
    queryParams.flow === 'aleatory_product' && navigate(
      URLS.AUTH_DELIVERY_RANDOM_PRODUCT,
      {state: state}
    );
    queryParams.flow === 'aleatory_support' && navigate(
      URLS.AUTH_DELIVERY_RANDOM_SUPPORT,
      {state: state}
    );
  }

  const {data: productQuantityModification, isLoading } = useQuery(
    ['productQuantityModification'],
    async () => {
      return await makeCoreGetRequest(`/shop-reception-mobile/integral/productQuantityModification/${queryParams.productId}/${queryParams.supportId}/${queryParams.truckId}`, null)
    },
    {
      initialData: [],
      onError: error => showNotification({
        message: `A aparut o eroare. ${formatErrorMessage(error)}`,
        type: 'error'
      }),
      onSuccess: (data: any) => {
        formik.setValues(data)
      }
    }
  )

  if (isLoading) return <div>Loading...</div>

  useEffect(() => {
    calculateLitigationType()
  }, [formik.values.conformQuantity, formik.values.defectQuantity])

  const calculateLitigationType = () => {
    const currentConformValue = parseFloat(formik.values.conformQuantity);
    const currentDefectValue = parseFloat(formik.values.defectQuantity);
    const currentTotalValue = currentConformValue + currentDefectValue;

    if (queryParams?.quantity > currentConformValue && queryParams?.quantity === currentTotalValue) {
      setMarks( [
        Mark.VEGETABLE_FRUIT_QUALITY,
        Mark.EXPIRED,
        Mark.SHORT_TERM,
        Mark.DAMAGED,
        Mark.VEGETABLES_FRUITS,
        Mark.DETERIORATION_A
      ]);

      setLitigation(2);
    } else if (queryParams?.quantity > currentConformValue && queryParams?.quantity !== currentTotalValue) {
      setMarks( [
        Mark.PALLETS_MERCHANDISE_MISSING,
        Mark.MISSING_CARRIER,
        Mark.QUANTITATIVE_DIFFERENCE
      ]);

      setLitigation(1);
    } else if (queryParams?.quantity < currentTotalValue) {
      setMarks( [
        Mark.PALLETS_MERCHANDISE_MISSING,
        Mark.QUANTITATIVE_DIFFERENCE
      ]);

      setLitigation(1);
    } else if (queryParams?.quantity === currentConformValue) {
      setLitigation(null);
    }


    formik.setFieldValue('mark', '');
    formik.setFieldValue('defectReason', '');
  }

  const populateDefectReasons = (selectedMark) => {
    if (formik.values.mark) {
      formik.setFieldValue('defectReason', '');

      switch (litigation) {
        case 1:
          setDefectReasons([DefectReason.PROVIDER]);
          formik.setFieldValue('defectReason', DefectReason.PROVIDER);
          break;
        case 2:
          if (selectedMark === Mark.EXPIRED || selectedMark === Mark.SHORT_TERM) {
            setDefectReasons([DefectReason.PROVIDER]);
            formik.setFieldValue('defectReason', DefectReason.PROVIDER);
          } else if (selectedMark === Mark.VEGETABLE_FRUIT_QUALITY) {
            setDefectReasons([DefectReason.PROVIDER, DefectReason.SHOP]);
          } else if (selectedMark === Mark.DAMAGED) {
            setDefectReasons([DefectReason.PROVIDER, DefectReason.TRANSPORTER, DefectReason.SHOP]);
          } else if (selectedMark === Mark.VEGETABLES_FRUITS || selectedMark === Mark.DETERIORATION_A) {
            setDefectReasons([DefectReason.PROVIDER, DefectReason.TRANSPORTER]);
          }
          break;
        default:
          setDefectReasons([]);
      }
    }
  }

  useEffect(() => {
    populateDefectReasons(formik.values.mark)
  }, [formik.values.mark])

  const handleSuccess = () => {
    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    });
  };

  const handleError = (error) => {
    showNotification({
      message: `${formatErrorMessage(error)}`,
      type: 'error'
    });
  };

  const columns: Array<TableHeaderType> = [
    {
      title: 'Produs',
      field: 'product',
      align: 'left'
    },
    {
      title: 'Calitativ',
      field: 'qualitative',
      align: 'left',
      render: (rowData: any) => (
        <Input
          type="number"
          value={rowData.qualitative}
          onChange={(e) => {
            formik.setFieldValue('conformQuantity', (e.target as HTMLInputElement).value);
          }}
          variant='standard'
        />
      )
    },
    {
      title: 'Defect',
      field: 'defective',
      align: 'left',
      render: (rowData: any) => (
        <div style={{ display: "flex" }}>
          <Input
            type="number"
            value={rowData.defective}
            onChange={(e) => {
              formik.setFieldValue('defectQuantity', (e.target as HTMLInputElement).value);
            }}
            variant='standard'
          />
          {
            litigation === 2 &&
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/integral/upload/${queryParams.supportId}/${queryParams.productId}`}
              onSuccess={() => handleSuccess()}
              onError={handleError}
              inputId={`support${queryParams.supportId}`}
            />
          }
        </div>
      )
    }
  ]

  const rows = [
    {
      product: formik.values.productName,
      qualitative: formik.values.conformQuantity,
      defective: formik.values.defectQuantity
    }
  ]

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='PRODUSE ALEATOR VALIDARE LIVRARE' />,
        <Grid
          spacing={1}
          hasPaper={true}
          items={[
            <Typography variant='medium' component='p'>PRODUSE ALEATOR</Typography>,
            <Typography variant='medium' component='p'>Număr înmatriculare: {productQuantityModification?.truckNumber}</Typography>,
            formik.values?.ticketNumber && <Typography variant='medium' component='p'> BL: {formik.values?.ticketNumber} </Typography>,
            <Typography variant='medium' component='p'>Etichetă suport: {productQuantityModification?.supportCode}</Typography>
          ]}
          itemsPerRow={1}
        />,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
          hideCheckbox={true}
        />,
        (!!litigation &&
          <>
            <Input
              type='select'
              label='Marca'
              variant='outlined'
              width='100%'
              value={formik.values.mark}
              values={marks?.map((mark) => ({ value: mark, label: mark }))}
              onChange={event => {
                formik.setFieldValue("mark", (event.target as HTMLInputElement).value);
              }}
              error={!!formik.errors.mark}
              helperText={formik.errors.mark as string}
            />
            <Input
              type='select'
              label='Motiv'
              variant='outlined'
              width='100%'
              value={formik.values.defectReason}
              values={defectReasons?.map((defect) => ({ value: defect, label: defect }))}
              onChange={event => {
                formik.setFieldValue("defectReason", (event.target as HTMLInputElement).value);
              }}
              disabled={formik.values.mark === ''}
              error={!!formik.errors.defectReason}
              helperText={formik.errors.defectReason as string}
            />
            <DatePicker
              style={{ width: '100%' }}
              value={formik.values.dlc}
              onChange={value => formik.setFieldValue('dlc', (value as Date | string))}
            />
          </>
        ),
        <Button
          type='button'
          variant='contained'
          label='Anulează'
          onClick={() => goBack()}
          style={{ width: '100%' }}
        />,
        <Button
          type='button'
          variant='contained'
          label='Salvează'
          onClick={() => formik.handleSubmit()}
          style={{ width: '100%' }}
        />
      ]}
      itemsPerRow={1}
    />
  )
}
export default DeliveryRandomProductModifica
