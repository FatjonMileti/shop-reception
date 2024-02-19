import { useEffect } from 'react'
import { Grid, Divider } from '@mui/material'
import {
  Autocomplete,
  Button,
  DatePicker,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { SelectProduct } from '../../../ReceivedProducts/AddReceivedProduct/SelectProduct'
import { ProductDetailsBatches } from './ProductDetailsBatches'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from '../../../../../../utils/api'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'

interface ProductDetailsProps {
  onCancel: () => void
  onSelectBatch: (step?: number, metiCode?: any) => void
  selectedProduct: any
  selectedRows: any
  formik: any
  isEdit: boolean
}

export const ProductDetails = (props: ProductDetailsProps) => {
  const { formik, onCancel, onSelectBatch, selectedProduct, selectedRows, isEdit } = props

  const { showNotification } = useNotification()

  useEffect(() => {
    formik.setFieldValue('traceabilityProductionList', selectedRows)
  }, [selectedRows])

  const onDeleteBatch = id => {
    let newBatches = formik.values.traceabilityProductionList.filter(batch =>
      batch.batchId ? batch.batchId !== id : batch.childTraceabilityId !== id
    )
    formik.setFieldValue('traceabilityProductionList', newBatches)
  }

  const { data: receip, isLoading: isReceipLoading } = useQuery(
    ['receip'],
    async () => {
      const result = await makeCoreGetRequest(
        `/bakery/recipe/${selectedProduct?.metiCode || formik.values.metiCode}`
      )
      let charges = []
      let batches = []

      if (result) {
        result[0].componentList.forEach(item => {
          if (item.withBatch) batches.push(item)
          if (item.withRecipe) charges.push(item)
        })
      }

      return { charges, batches, details: result[0] }
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching recipe data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  return (
    <Grid container rowSpacing={3.5}>
      {!isEdit && (
        <Grid item xs={12} spacing={2}>
          <FormInfoItems
            items={[
              {
                label: 'Produs:',
                name: selectedProduct?.name
              },
              {
                label: 'Produs cod Meti:',
                name: selectedProduct?.metiCode
              },
              { label: 'Info:', name: `Greutate neta articol conform reteta: ${receip?.details?.recipeQuantity || ''}${receip?.details?.recipeUnit || ''}` }
            ]}
          />
        </Grid>
      )}

      <Grid container spacing={2} mt={2}>
        {isEdit && (
          <>
            <Grid item xs={3}>
              <Input
                type="text"
                variant="outlined"
                label="Cod METI"
                onChange={e => formik.setFieldValue('metiCode', e.currentTarget.value)}
                value={formik.values.metiCode}
                name="metiCode"
                disabled
              />
            </Grid>
            <Grid item xs={9}>
              <SelectProduct
                setSelectedProduct={product => {
                  formik.setFieldValue('productName', product?.name)
                  formik.setFieldValue('metiCode', product?.metiCode)
                }}
                selectedProduct={selectedProduct}
                onContinue={() => {}}
                onCancel={() => {}}
                customLabel={'Produs'}
                hideActions
              />
            </Grid>
          </>
        )}

        <Grid item xs={3}>
          <DatePicker
            label="Data productie"
            onChange={value => formik.setFieldValue('productionDate', value)}
            variant="outlined"
            required
            helperText={formik.errors.productionDate as string}
            error={!!formik.errors.productionDate}
            value={dayjs(formik.values.productionDate)}
            maxDate={dayjs()}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            type="text"
            variant="outlined"
            label="Sarja"
            onChange={e => formik.setFieldValue('chargeNumber', e.currentTarget.value)}
            value={formik.values.chargeNumber}
            name="chargeNumber"
            required
            error={!!formik.errors.chargeNumber}
            helperText={formik.errors.chargeNumber as string}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            type="text"
            variant="outlined"
            label="Cantitate sarja"
            onChange={e => formik.setFieldValue('quantity', e.currentTarget.value)}
            value={formik.values.quantity}
            name="quantity"
            infoIcon={selectedProduct.metricUnit}
            required
            error={!!formik.errors.quantity}
            helperText={formik.errors.quantity as string}
          />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={3}>
          <Input
            type="text"
            variant="outlined"
            label="Operator productie"
            onChange={e => formik.setFieldValue('productionOperator', e.currentTarget.value)}
            value={formik.values.productionOperator}
            name="productionOperator"
            required
            error={!!formik.errors.productionOperator}
            helperText={formik.errors.productionOperator as string}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            variant="outlined"
            label="Stare termica"
            disableClearable
            options={[
              { value: 'BAKED', label: 'COPT' },
              { value: 'UNBAKED', label: 'NECOPT' }
            ]}
            defaultValue={{
              value: formik.values.thermalCondition || '',
              label: formik.values.thermalCondition || ''
            }}
            onChange={(e, option) => formik.setFieldValue('thermalCondition', option.value)}
            required
            error={!!formik.errors.thermalCondition}
            helperText={formik.errors.thermalCondition as string}
          />
        </Grid>
        <Grid item xs={3}>
          <RadioButtonGroup
            label="Conform"
            dotStyle
            name="conform"
            onChange={(e, option) => {
              formik.setFieldValue('conform', option)
              formik.setFieldValue('nonComplianceReason', null)
              formik.setFieldValue('productDestination', null)
            }}
            value={formik.values.conform}
            defaultValue={formik.initialValues.conform ? 'DA' : 'NU'}
            row
            options={[
              {
                label: 'DA',
                value: 'true' // TODO: make this boolean after adding support in UI Library
              },
              {
                label: 'NU',
                value: 'false' // TODO: make this boolean after adding support in UI Library
              }
            ]}
          />
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={6}>
          <Input
            type="text"
            variant="outlined"
            label="Motiv neconformitate"
            onChange={e => formik.setFieldValue('nonComplianceReason', e.currentTarget.value)}
            value={formik.values.nonComplianceReason}
            disabled={formik.values.conform == null || formik.values.conform == true}
            name="nonComplianceReason"
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            type="text"
            variant="outlined"
            label="Destinatia produsului neconform"
            onChange={e => formik.setFieldValue('productDestination', e.currentTarget.value)}
            value={formik.values.productDestination}
            disabled={formik.values.conform == null || formik.values.conform == true}
            name="productDestination"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <ProductDetailsBatches
          formik={formik}
          productMetiCode={selectedProduct?.metiCode}
          onSelectBatch={onSelectBatch}
          onDeleteBatch={onDeleteBatch}
          receip={receip}
        />

        <Grid item xs={12} container justifyContent="space-between">
          <Grid>
            <Button size="large" variant="outlined" label="Anuleaza" onClick={onCancel} />
          </Grid>

          <Grid>
            <Button
              size="large"
              variant="contained"
              label="Salveaza"
              onClick={() => formik.handleSubmit()}
              disabled={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
