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
import dayjs from 'dayjs'
import { toBoolean } from 'utils/helpers'
import { useSelectProductSearch } from '../../useSelectProductSearch'

interface ProductDetailsProps {
  onCancel: () => void
  onSelectBatch: () => void
  formik: any
}

export const ProductDetails = ({ formik, onCancel, onSelectBatch }: ProductDetailsProps) => {
  const selectProductSearch = useSelectProductSearch({
    optionsMap: ({ id, name, metiCode, metricUnit }) => ({
      value: id,
      label: name,
      metiCode,
      id,
      name,
      metricUnit
    })
  })

  const onDeleteBatch = id => {
    const newBatches = formik.values.traceabilityFrozenList.filter(batch => batch.batchId !== id)
    formik.setFieldValue('traceabilityFrozenList', newBatches)
  }

  return (
    <Grid container rowSpacing={3.5}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Input
            type="text"
            variant="outlined"
            label="Cod METI"
            onChange={() => {}}
            value={formik.values.product?.metiCode || ''}
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
                  id: value.id,
                  metricUnit: value.metricUnit
                })
              } else {
                formik.setFieldValue('product', null)
              }

              formik.setFieldValue('traceabilityFrozenList', [])
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

        <Grid item xs={3}>
          <Input
            type="number"
            variant="outlined"
            label="Sarja"
            required
            onChange={e => formik.setFieldValue('chargeNumber', e.currentTarget.value)}
            value={formik.values.chargeNumber}
            name="chargeNumber"
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
              formik.setFieldValue(
                'traceabilityFrozenList',
                formik.values.traceabilityFrozenList.map(tf => ({
                  ...tf,
                  quantity: value
                }))
              )
            }}
            value={formik.values.quantity}
            name="quantity"
            infoIcon={formik.values?.product?.metricUnit || ''}
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
              const value = toBoolean(option)
              formik.setFieldValue('conform', value)
              if (value) {
                formik.setFieldValue('nonComplianceReason', '')
                formik.setFieldValue('productDestination', '')
              }
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

        {formik.values.traceabilityFrozenList.map((item, index) => (
          <Grid item container xs={12} spacing={2} key={index}>
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
                infoIcon={formik.values?.product?.metricUnit || ''}
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
          </Grid>
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
              disabled={!formik.values?.quantity}
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
              onClick={() => {
                formik.handleSubmit()
              }}
              disabled={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
