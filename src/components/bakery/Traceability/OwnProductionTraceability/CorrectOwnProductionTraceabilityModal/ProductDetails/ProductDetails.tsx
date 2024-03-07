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
import { UseQueryResult } from 'react-query'
import { toBoolean } from 'utils/helpers'
import { useSelectProductSearch } from '../../../useSelectProductSearch'

interface ProductDetailsProps {
  onAddCharge: (componentMetiCode: string | number) => void
  onAddBatch: (componentMetiCode: string | number) => void
  onCancel: () => void
  formik: any
  recipeQuery: UseQueryResult<any>
}

export const ProductDetails = (props: ProductDetailsProps) => {
  const {
    formik,
    onCancel,
    recipeQuery,
    onAddBatch,
    onAddCharge
  } = props

  const selectProductSearch = useSelectProductSearch({
    optionsMap: ({ id, name, metiCode }) => ({ value: id, label: name, metiCode, id, name })
  })

  const onDeleteBatch = id => {
    let newBatches = formik.values.traceabilityProductionList.filter(batch =>
      batch.batchId ? batch.batchId !== id : batch.childTraceabilityId !== id
    )
    formik.setFieldValue('traceabilityProductionList', newBatches)
  }

  return (
    <Grid container rowSpacing={3.5}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Input
            type="text"
            variant="outlined"
            label="Cod METI"
            value={formik.values?.product?.metiCode || ''}
            name="metiCode"
            disabled
          />
        </Grid>

        <Grid item xs={9}>
          <Autocomplete
            {...selectProductSearch}
            variant="outlined"
            label="Produs"
            autoComplete={false}
            required
            filterOptions={x => x}
            onChange={(event, value) => {
              if (value) {
                formik.setFieldValue('product', {
                  name: value.name,
                  metiCode: value.metiCode,
                  id: value.id
                })
              } else {
                formik.setFieldValue('product', null)
              }
              formik.setFieldValue('traceabilityProductionList', [])
            }}
            value={
              formik.values?.product
                ? {
                    label: formik.values?.product.name,
                    value: formik.values?.product?.id
                  }
                : null
            }
            error={!!formik.errors.product}
            helperText={formik.errors.product as string}
          />
        </Grid>

        <Grid item xs={12} container spacing={2}>
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

          <Grid item xs={3}>
            <Input
              type="text"
              variant="outlined"
              label="Cantitate sarja"
              onChange={({ currentTarget: { value } }) => {
                formik.setFieldValue('quantity', value)
              }}
              value={formik.values.quantity}
              name="quantity"
              infoIcon={formik.values?.product?.metricUnit || ''}
              required
              error={!!formik.errors.quantity}
              helperText={formik.errors.quantity as string}
            />
          </Grid>
        </Grid>

        <Grid item xs={3}>
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
          onDeleteBatch={onDeleteBatch}
          onAddBatch={onAddBatch}
          onAddCharge={onAddCharge}
          receip={recipeQuery?.data}
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
