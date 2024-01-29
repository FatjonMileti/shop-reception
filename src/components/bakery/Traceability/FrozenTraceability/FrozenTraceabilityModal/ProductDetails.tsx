import { Grid, Divider } from '@mui/material'
import { FormInfoItems } from '../../../../core-ui/FormInfoItems'
import {
  Autocomplete,
  Button,
  DatePicker,
  IconButton,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import { AddActionIcon, DeleteActionIcon } from 'icons'
import { useEffect } from 'react'

interface ProductDetailsProps {
  onCancel: () => void
  onSelectBatch: () => void
  selectedProduct: any
  selectedRows: any
  formik
  isEdit: boolean
}

export const ProductDetails = (props: ProductDetailsProps) => {
  const { formik, onCancel, onSelectBatch, selectedProduct, selectedRows, isEdit } = props

  console.log('debug formik.values', formik.values)
  useEffect(() => {
    formik.setFieldValue('traceabilityFrozenList', selectedRows)
  }, [selectedRows])

  const onDeleteBatch = id => {
    const newBatches = formik.values.traceabilityFrozenList.filter(batch => batch.batchId !== id)
    formik.setFieldValue('traceabilityFrozenList', newBatches)
  }

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
              }
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
                required
                error={!!formik.errors.metiCode}
                helperText={formik.errors.metiCode as string}
              />
            </Grid>
            <Grid item xs={9}>
              <Input
                type="text"
                variant="outlined"
                label="Produs"
                onChange={e => formik.setFieldValue('productName', e.currentTarget.value)}
                value={formik.values.productName}
                name="productName"
                required
                error={!!formik.errors.productName}
                helperText={formik.errors.productName as string}
              />
            </Grid>
          </>
        )}

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
            infoIcon={'kg'}
            required
            error={!!formik.errors.quantity}
            helperText={formik.errors.quantity as string}
          />
        </Grid>
        <Grid item xs={3}>
          <DatePicker
            label="Data productie"
            onChange={value => formik.setFieldValue('productionDate', value)}
            value={formik.values.productionDate}
            variant="outlined"
            required
            helperText={formik.errors.productionDate as string}
            error={!!formik.errors.productionDate}
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
              value: formik.initialValues.thermalCondition,
              label: 'NECOPT'
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
            disabled={formik.values.conform == null || formik.values.conform == 'true'}
            name="nonComplianceReason"
            required
            error={!!formik.errors.nonComplianceReason}
            helperText={formik.errors.nonComplianceReason as string}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            type="text"
            variant="outlined"
            label="Destinatia produsului neconform"
            onChange={e => formik.setFieldValue('productDestination', e.currentTarget.value)}
            value={formik.values.productDestination}
            disabled={formik.values.conform == null || formik.values.conform == 'true'}
            name="productDestination"
            required
            error={!!formik.errors.productDestination}
            helperText={formik.errors.productDestination as string}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {formik.values.traceabilityFrozenList.map((batch, index) => (
          <>
            <Grid item xs={3}>
              <Input
                type="text"
                variant="outlined"
                label={`Lot ${index + 1}`}
                onChange={() => {}}
                value={batch.batch.batchName}
                name="batchId"
                required
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                type="text"
                variant="outlined"
                label={`Cantitatea lot ${index + 1}`}
                onChange={() => {}}
                value={batch.quantity}
                name="quantity"
                infoIcon={'kg'}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Data deschidere"
                onChange={() => {}}
                // value={formatBakeryPayloadDate(batch.openingDate)}
                value={null}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={3} display={'flex'} alignSelf={'flex-end'} justifyContent={'flex-end'}>
              <Button
                onClick={() => onDeleteBatch(batch.batchId)}
                variant="outlined"
                size="large"
                style={{ width: '40px', height: '40px' }}
                label=""
              >
                <DeleteActionIcon />{' '}
              </Button>
            </Grid>
          </>
        ))}
        {formik.values.traceabilityFrozenList.length > 0 && (
          <Grid item xs={12}>
            <Divider />
          </Grid>
        )}

        <Grid item xs={12} container justifyContent="space-between">
          <Grid>
            <IconButton
              startIcon={<AddActionIcon />}
              size="large"
              variant="outlined"
              label="Adauga lot"
              onClick={onSelectBatch}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

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
