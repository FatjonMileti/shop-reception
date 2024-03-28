import { Grid, Divider } from '@mui/material'
import {
  Autocomplete,
  Button,
  DatePicker,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import dayjs from 'dayjs'
import { ProductDetailsBatches } from './ProductDetailsBatches'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { UseQueryResult } from 'react-query'
import { formatPayloadDate, toBoolean } from 'utils/helpers'
import { thermalContiotionOptions } from '../../../interfaces'
import { quantityCalculation } from '../helpers'

interface ProductDetailsProps {
  onCancel: () => void
  onAddCharge: (componentMetiCode: string | number) => void
  onAddBatch: (componentMetiCode: string | number) => void
  selectedProduct: any
  formik: any
  recipeQuery: UseQueryResult<any>
}

export const ProductDetails = (props: ProductDetailsProps) => {
  const { formik, onCancel, selectedProduct, recipeQuery, onAddBatch, onAddCharge } = props

  const onDeleteBatch = id => {
    let newBatches = formik.values.traceabilityProductionList.filter(batch =>
      batch.batchId ? batch.batchId !== id : batch.childTraceabilityId !== id
    )
    formik.setFieldValue('traceabilityProductionList', newBatches)
  }

  const updateComponentQuantities = mainProductQuantity => {
    formik.values.traceabilityProductionList.forEach((component, cIndex) => {
      const componentQuantity = recipeQuery?.data?.[
        (component.batchId && 'batches') || (component.childTraceabilityId && 'charges') || 'others'
      ]?.find(c => c.componentCode === component.componentCode)?.componentQuantity

      const calculatedQuantity = quantityCalculation(
        mainProductQuantity,
        componentQuantity,
        recipeQuery?.data?.details?.recipeQuantity
      )

      formik.setFieldValue(
        `traceabilityProductionList[${cIndex}].componentQuantity`,
        calculatedQuantity
      )
    })
  }

  return (
    <Grid container rowSpacing={3.5}>
      <Grid item xs={12}>
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
            {
              label: 'Info:',
              name: `Greutate neta articol conform reteta: ${
                recipeQuery?.data?.details?.recipeQuantity || ''
              }${recipeQuery?.data?.details?.recipeUnit || ''}`
            }
          ]}
        />
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={3}>
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
        <Grid item xs={12} md={3}>
          <Input
            type="number"
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
        <Grid item xs={12} md={4}>
          <Input
            type="number"
            variant="outlined"
            label="Cantitate sarja"
            onChange={({ currentTarget: { value } }) => {
              formik.setFieldValue('quantity', value)

              updateComponentQuantities(value)
            }}
            value={formik.values.quantity}
            name="quantity"
            infoIcon={selectedProduct?.metricUnit || ''}
            required
            error={!!formik.errors.quantity}
            helperText={formik.errors.quantity as string}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Input
            type="text"
            variant="outlined"
            label="Operator productie"
            onChange={e => formik.setFieldValue('productionOperator', e.currentTarget.value)}
            value={formik.values.productionOperator}
            name="productionOperator"
            error={!!formik.errors.productionOperator}
            helperText={formik.errors.productionOperator as string}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            variant="outlined"
            label="Stare termica"
            disableClearable
            options={thermalContiotionOptions}
            value={
              thermalContiotionOptions.find(thC => thC.value === formik.values.thermalCondition) ||
              null
            }
            onChange={(e, option) => formik.setFieldValue('thermalCondition', option.value)}
            error={!!formik.errors.thermalCondition}
            helperText={formik.errors.thermalCondition as string}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{'& .MuiFormControl-root': {marginTop: '16px'}}}>
          <RadioButtonGroup
            label="Conform"
            dotStyle
            name="conform"
            onChange={(e, option) => {
              formik.setFieldValue('conform', toBoolean(option))
              formik.setFieldValue('nonComplianceReason', null)
              formik.setFieldValue('productDestination', null)
            }}
            value={formik.values.conform}
            defaultValue={formik.initialValues.conform ? 'DA' : 'NU'}
            row
            options={[
              {
                label: 'DA',
                value: 'true'
              },
              {
                label: 'NU',
                value: 'false'
              }
            ]}
          />
        </Grid>

        <Grid item xs={12} md={5}>
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
        <Grid item xs={12} md={5}>
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
          onDeleteBatch={onDeleteBatch}
          onAddBatch={onAddBatch}
          onAddCharge={onAddCharge}
          receip={recipeQuery.data}
          productMetricUnit={selectedProduct.metricUnit}
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
