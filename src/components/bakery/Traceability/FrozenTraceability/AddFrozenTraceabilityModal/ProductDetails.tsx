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
import { formatPayloadDate, toBoolean } from 'utils/helpers'
import { thermalContiotionOptions } from '../../interfaces'

interface ProductDetailsProps {
  onCancel: () => void
  onSelectBatch: () => void
  selectedProduct: any
  formik: any
}

export const ProductDetails = ({
  formik,
  onCancel,
  onSelectBatch,
  selectedProduct
}: ProductDetailsProps) => {
  const onDeleteBatch = id => {
    const newBatches = formik.values.traceabilityFrozenList.filter(batch => batch.batchId !== id)
    formik.setFieldValue('traceabilityFrozenList', newBatches)
  }

  return (
    <Grid container rowSpacing={3.5}>
      <Grid
        item
        xs={12}
        spacing={2}
        sx={{
          '& div': {
            whiteSpace: 'unset !important'
          }
        }}
      >
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

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} container spacing={2}>
          <Grid item lg={3} xs={6}>
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
          <Grid item lg={3} xs={6}>
            <Input
              type="number"
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
              infoIcon={selectedProduct?.metricUnit || ''}
              required
              error={!!formik.errors.quantity}
              helperText={formik.errors.quantity as string}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <DatePicker
              label="Data productie"
              onChange={value => formik.setFieldValue('productionDate', value)}
              variant="outlined"
              required
              helperText={formik.errors.productionDate as string}
              error={!!formik.errors.productionDate}
              value={dayjs(formik.values.productionDate)}
              maxDate={dayjs()}
              style={{ display: 'flex' }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container spacing={2}>
          <Grid item lg={3} xs={6}>
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

          <Grid item lg={3} xs={6}>
            <Autocomplete
              variant="outlined"
              label="Stare termica"
              disableClearable
              options={thermalContiotionOptions}
              value={
                thermalContiotionOptions.find(
                  thC => thC.value === formik.values.thermalCondition
                ) || null
              }
              onChange={(e, option) => formik.setFieldValue('thermalCondition', option.value)}
              required
              error={!!formik.errors.thermalCondition}
              helperText={formik.errors.thermalCondition as string}
            />
          </Grid>

          <Grid item lg={3} xs={12} sx={{ marginTop: '17px' }}>
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
        </Grid>

        <Grid item lg={6} xs={12}>
          <Input
            type="text"
            variant="outlined"
            label="Motiv neconformitate"
            onChange={e => formik.setFieldValue('nonComplianceReason', e.currentTarget.value)}
            value={formik.values.nonComplianceReason ?? ''}
            disabled={formik.values.conform == null || formik.values.conform == true}
            name="nonComplianceReason"
            style={{ display: 'flex' }}
            error={!!formik.errors.nonComplianceReason}
            helperText={formik.errors.nonComplianceReason as string}
          />
        </Grid>

        <Grid item lg={6} xs={12}>
          <Input
            type="text"
            variant="outlined"
            label="Destinatia produsului neconform"
            onChange={e => formik.setFieldValue('productDestination', e.currentTarget.value)}
            value={formik.values.productDestination ?? ''}
            disabled={formik.values.conform == null || formik.values.conform == true}
            name="productDestination"
            style={{ display: 'flex' }}
            error={!!formik.errors.productDestination}
            helperText={formik.errors.productDestination as string}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {formik.values.traceabilityFrozenList.map((item, index) => (
          <Grid item container xs={12} spacing={0.5} key={index}>
            <Grid item container xs={12} spacing={2}>
              <Grid item container xs={9} spacing={2}>
              <Grid item md={4} xs={6}>
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
              <Grid item md={4} xs={6}>
                <Input
                  type="number"
                  variant="outlined"
                  label={`Cantitatea lot ${index + 1}`}
                  onChange={(e: any) => {
                    const updatedList = [...formik.values.traceabilityFrozenList]
                    updatedList[index].quantity = e.target.value
                    formik.setFieldValue('traceabilityFrozenList', updatedList)
                  }}
                  value={item.quantity}
                  name="quantity"
                  infoIcon={selectedProduct?.metricUnit || ''}
                  helperText={formik.errors?.traceabilityFrozenList?.[index]?.quantity as string}
                  error={!!formik.errors?.traceabilityFrozenList?.[index]?.quantity}
                />
              </Grid>
              {item.hasSecondaryDlc && (
                <Grid item md={4} xs={6}>
                  <DatePicker
                    label="Data deschidere"
                    onChange={value =>
                      formik.setFieldValue(
                        `traceabilityFrozenList[${index}].openingDate`,
                        formatPayloadDate(value)
                      )
                    }
                    variant="outlined"
                    required
                    helperText={formik.errors?.traceabilityFrozenList?.[index]?.openingDate as string}
                    error={!!formik.errors?.traceabilityFrozenList?.[index]?.openingDate}
                    value={
                      formik.values?.traceabilityFrozenList?.[index]?.openingDate
                        ? dayjs(formik.values?.traceabilityFrozenList?.[index]?.openingDate)
                        : undefined
                    }
                    maxDate={dayjs(formik.values.productionDate)}
                    style={{ display: 'flex' }}
                  />
                </Grid>
              )}
              </Grid>

              <Grid
                item
                xs={3}
                display={'flex'}
                alignSelf={'flex-start'}
                justifyContent={'flex-end'}
                sx={{ marginTop: '17px' }}
              >
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

            <Grid item xs={12}>
              <p style={{
                color: '#AA0D11',
                fontFamily: 'Ubuntu',
                fontWeight: '400',
                fontSize: '0.75rem',
                lineHeight: '1.66',
                margin: '4px 0 0 14px'
              }}>{formik.errors?.traceabilityFrozenList?.[index]?.expired}</p>
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
              disabled={!formik.values?.quantity || !formik.values?.productionDate}
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
