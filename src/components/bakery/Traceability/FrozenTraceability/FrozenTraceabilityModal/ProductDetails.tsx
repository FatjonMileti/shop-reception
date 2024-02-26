import { useEffect } from 'react'
import { Grid, Divider } from '@mui/material'
import {
  Autocomplete,
  Button,
  DatePicker,
  IconButton,
  Input,
  RadioButtonGroup
} from '@fullscreendigital/carrefour-dex-fe'
import { AddActionIcon, DeleteActionIcon } from 'icons'
import { FormInfoItems } from '../../../../core-ui/FormInfoItems'
import dayjs from 'dayjs'
import { SelectProduct } from '../../ReceivedProducts/AddReceivedProduct/SelectProduct'

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
            infoIcon={selectedProduct?.metricUnit}
            required
            error={!!formik.errors.quantity}
            helperText={formik.errors.quantity as string}
          />
        </Grid>
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

        {formik.values.traceabilityFrozenList.map((item, index) => (
          <>
            <Grid item xs={3}>
              <Input
                type="text"
                variant="outlined"
                label={`Lot ${index + 1}`}
                onChange={(e: any) => {
                  const updatedList = [...formik.values.traceabilityFrozenList]
                  updatedList[index].batchId = e.target.value
                  formik.setFieldValue('traceabilityFrozenList', updatedList)
                }}
                value={item?.batchName}
                name="batchName"
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                type="text"
                variant="outlined"
                label={`Cantitatea lot ${index + 1}`}
                onChange={(e: any) => {
                  const updatedList = [...formik.values.traceabilityFrozenList]
                  updatedList[index].quantity = e.target.value
                  formik.setFieldValue('traceabilityFrozenList', updatedList)
                }}
                value={item.quantity}
                name="quantity"
                infoIcon={'kg'}
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="Data deschidere"
                onChange={(date: any) => {
                  const updatedList = [...formik.values.traceabilityFrozenList]
                  updatedList[index].openingDate = date

                  formik.setFieldValue('traceabilityFrozenList', updatedList)
                }}
                value={dayjs(item.openingDate)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} display={'flex'} alignSelf={'flex-end'} justifyContent={'flex-end'}>
              <Button
                onClick={() => onDeleteBatch(item.batchId)}
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
