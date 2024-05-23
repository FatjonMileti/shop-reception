import { Grid } from '../../../Common/Grid'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import React, {useMemo, useState} from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../utils/formatting'
import { useNotification } from '../../../../../hooks'
import { TitleHeader } from '../../Common/TitleHeader'
import {useQuery} from "react-query";
import {makeCoreGetRequest, makeCorePostRequest} from "../../../../../utils/api";
import ImageUpload from "../../Common/ImageUpload/ImageUpload";

const PackagingInventoryUpdate = () => {
  const { showNotification } = useNotification()
  const inputFileRef = React.useRef<HTMLInputElement>()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        await makeCorePostRequest('/shop-reception-mobile/support/inventory/save', values);
        clearFields()
      } catch (error) {
        showNotification({
            message: `Error while submitting. ${formatErrorMessage(error)}`,
            type: 'error'
        })
      }
    }
  })

  function clearFields() {
      setSelectedSupportId('')
      formik.setFieldValue('supportId', null);
      formik.setFieldValue('quality', 0);
      formik.setFieldValue('defective', 0);
  }

  const [selectedSupportId, setSelectedSupportId] = useState(formik.values.supportId || '');

  const { data: supportList, isLoading} = useQuery(
    'supportList',
    async () => {
        return await makeCoreGetRequest('/shop-reception-mobile/support/all/list', null)
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

  const { data: shopCode, isLoading: isLoadingShopCode} = useQuery(
    'shopCode',
    async () => {
        const shopCode = await makeCoreGetRequest('/shop-reception-mobile/getShopCode', null)
        await formik.setFieldValue('shopCode', Number(shopCode.value));

        return shopCode.value;
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

  if (isLoading || isLoadingShopCode) {
    return <div>Loading...</div>;
  }

  const handleSuccess = (data) => {
    formik.setFieldValue('defectPictureId', data.id);

    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    });
  };

  const handleError = (error) => {
    showNotification({
      message: `Error uploading image: ${error.message}`,
      type: 'error'
    });
  };

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='ACTUALIZARE INVENTAR AMBALAJE' />,
        <Input
          type='select'
          label='Tip suport'
          variant='standard'
          width='100%'
          value={selectedSupportId}
          values={supportList.map(support => ({ value: support.id, label: support.name }))}
          onChange={event => {
              const selectedValue = (event.target as HTMLInputElement).value;
              setSelectedSupportId(selectedValue);
              formik.setFieldValue('supportId', selectedValue);
          }}
          error={!!formik.errors.supportId}
          helperText={formik.errors.supportId as string}
        />,
        <Input
          type='number'
          label='Calitativi'
          variant='standard'
          width='100%'
          value={formik.values.quality}
          onChange={event => formik.setFieldValue('quality', +(event.target as HTMLInputElement).value)}
          error={!!formik.errors.quality}
          helperText={formik.errors.quality as string}
        />,
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Input
              type='number'
              label='Defecți'
              variant='standard'
              width='100%'
              value={formik.values.defective}
              onChange={event => formik.setFieldValue('defective', +(event.target as HTMLInputElement).value)}
              error={!!formik.errors.defective}
              helperText={formik.errors.defective as string}
          />
          {(formik.values.defective > 0 && +selectedSupportId > 0) && (
            <ImageUpload
              uploadUrl={'/shop-reception-mobile/support/upload/' + selectedSupportId}
              onSuccess={handleSuccess}
              onError={handleError}
              inputId='defective'
            />
          )}
        </div>,
        <Button
          type='button'
          variant='contained'
          label='CONFIRMǍ'
          style={{ width: '100%' }}
          onClick={() => formik.handleSubmit()}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default PackagingInventoryUpdate
