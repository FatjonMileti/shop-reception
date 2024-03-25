import { Grid, Divider, CircularProgress } from '@mui/material'
import { Button, DatePicker, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { AddActionIcon, DeleteActionIcon } from 'icons'
import { quantityCalculation } from '../helpers'
import { Fragment } from 'react'
import { formatPayloadDate } from '../../../../../../utils/helpers'
import dayjs from 'dayjs'

interface ProductDetailsBatchesProps {
  formik: any
  onDeleteBatch: Function
  receip: any
  onAddCharge: (componentMetiCode: string | number) => void
  onAddBatch: (componentMetiCode: string | number) => void
}

export const ProductDetailsBatches = ({
  formik,
  onDeleteBatch,
  receip,
  onAddCharge,
  onAddBatch
}: ProductDetailsBatchesProps) => {
  if (typeof formik.values.metiCode === 'undefined') {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <>
      {receip?.batches.map((batch, index) => (
        <Fragment key={index}>
          <Grid item xs={3}>
            <Input
              type="text"
              variant="outlined"
              label={`Articol compozant ${index + 1}`}
              value={batch.componentName}
              name="componentName"
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              type="text"
              variant="outlined"
              label={`Cantitatea`}
              value={`${quantityCalculation(
                formik.values.quantity,
                batch.componentQuantity,
                receip.details.recipeQuantity
              )}`}
              name="batchId"
              disabled
            />
          </Grid>

          <Grid item xs={3} display={'flex'} alignSelf={'flex-end'} justifyContent={'flex-end'}>
            {batch.withBatch && (
              <IconButton
                startIcon={<AddActionIcon />}
                size="large"
                variant="outlined"
                label="Adauga lot"
                onClick={() => {
                  onAddBatch(batch.componentCode)
                }}
                style={{ height: '40px', fontSize: '10px' }}
              />
            )}
          </Grid>

          {formik.values.traceabilityProductionList.map((item, idx) => (
            <Fragment key={idx}>
              {item.componentCode === batch.componentCode && item.batchId ? (
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Input
                      type="text"
                      variant="outlined"
                      label={`Lot ${idx + 1}`}
                      value={item.componentName}
                      name="componentName"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="number"
                      variant="outlined"
                      label={`Cantitatea lot 1`}
                      onChange={(e: any) =>
                        formik.setFieldValue(
                          `traceabilityProductionList[${idx}].quantity`,
                          e.target.value
                        )
                      }
                      value={item.quantity || ''}
                      name="quantity"
                      infoIcon={formik.values?.product?.metricUnit}
                    />
                  </Grid>

                  {item.hasSecondaryDlc && (
                    <Grid item xs={3}>
                      <DatePicker
                        label="Data deschidere"
                        onChange={value =>
                          formik.setFieldValue(
                            `traceabilityProductionList[${idx}].openingDate`,
                            formatPayloadDate(value)
                          )
                        }
                        variant="outlined"
                        required
                        helperText={
                          formik.errors?.traceabilityProductionList?.[idx]?.openingDate as string
                        }
                        error={!!formik.errors?.traceabilityProductionList?.[idx]?.openingDate}
                        value={
                          formik.values?.traceabilityProductionList?.[idx]?.openingDate
                            ? dayjs(formik.values?.traceabilityProductionList?.[idx]?.openingDate)
                            : undefined
                        }
                        style={{ display: 'flex' }}
                      />
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={2}
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
              ) : null}
            </Fragment>
          ))}
        </Fragment>
      ))}

      <Grid item xs={12}>
        <Divider />
      </Grid>

      {receip?.charges.map((item, index) => (
        <Fragment key={index}>
          <>
            <Grid item xs={3}>
              <Input
                type="text"
                variant="outlined"
                label={`Articol compozant ${index + 1}`}
                value={item.componentName}
                name="componentName"
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                type="number"
                variant="outlined"
                label={`Cantitatea`}
                value={`${quantityCalculation(
                  formik.values.quantity,
                  item.componentQuantity,
                  receip.details.recipeQuantity
                )}`}
                name="componentQuantity"
                disabled
              />
            </Grid>

            <Grid item xs={3} display={'flex'} alignSelf={'flex-end'} justifyContent={'flex-end'}>
              <IconButton
                startIcon={<AddActionIcon />}
                size="large"
                variant="outlined"
                label="Adauga sarja"
                onClick={() => {
                  onAddCharge(item.componentCode)
                }}
                style={{ height: '40px', fontSize: '10px' }}
              />
            </Grid>
          </>

          {formik.values.traceabilityProductionList.map((charge, idx) => (
            <Fragment key={idx}>
              {charge.componentCode === item.componentCode && charge.childTraceabilityId ? (
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Input
                      type="text"
                      variant="outlined"
                      label={`Sarja ${idx + 1}`}
                      value={charge.componentName}
                      name="componentName"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Input
                      type="number"
                      variant="outlined"
                      label={`Cantitatea`}
                      onChange={(e: any) => {
                        formik.setFieldValue(
                          `traceabilityProductionList[${idx}].quantity`,
                          e.target.value
                        )
                      }}
                      value={charge.quantity}
                      name="quantity"
                      infoIcon={formik.values?.product?.metricUnit}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    display={'flex'}
                    alignSelf={'flex-end'}
                    justifyContent={'flex-end'}
                  >
                    <Button
                      onClick={() => onDeleteBatch(charge.childTraceabilityId)}
                      variant="outlined"
                      size="large"
                      style={{ width: '40px', height: '40px' }}
                      label=""
                    >
                      <DeleteActionIcon />{' '}
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
            </Fragment>
          ))}
        </Fragment>
      ))}

      <Grid item xs={12}>
        <Divider />
      </Grid>

      {receip?.others.map((other, index) => (
        <Fragment key={index}>
          <Grid item xs={3}>
            <Input
              type="text"
              variant="outlined"
              label={`Articol compozant ${index + 1}`}
              value={other.componentName}
              name="componentName"
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              type="text"
              variant="outlined"
              label={`Cantitatea`}
              value={`${quantityCalculation(
                formik.values.quantity,
                other.componentQuantity,
                receip.details.recipeQuantity
              )}`}
              name="batchId"
              disabled
            />
          </Grid>

          {formik.values.traceabilityProductionList.map((item, idx) => (
            <Fragment key={idx}>
              {other.componentCode === item.componentCode && (
                <Grid item xs={4}>
                  <Input
                    type="number"
                    variant="outlined"
                    label={`Cantitatea`}
                    onChange={(e: any) => {
                      formik.setFieldValue(
                        `traceabilityProductionList[${idx}].quantity`,
                        e.target.value
                      )
                    }}
                    value={item.quantity}
                    name="quantity"
                    infoIcon={formik.values?.product?.metricUnit}
                  />
                </Grid>
              ) || null}
            </Fragment>
          ))}

        </Fragment>
      ))}

      {formik.values.traceabilityProductionList.length > 0 && (
        <Grid item xs={12}>
          <Divider />
        </Grid>
      )}
    </>
  )
}
