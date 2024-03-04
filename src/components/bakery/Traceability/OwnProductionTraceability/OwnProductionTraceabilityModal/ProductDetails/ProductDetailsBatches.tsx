import { Grid, Divider, CircularProgress } from '@mui/material'
import { Button, DatePicker, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { AddActionIcon, DeleteActionIcon } from 'icons'
import dayjs from 'dayjs'
import { quantityCalculation } from '../helpers'
import { Fragment } from 'react'

interface ProductDetailsBatchesProps {
  onSelectBatch: Function
  productMetiCode: any
  formik: any
  onDeleteBatch: Function
  receip: any
  setComponentMetiCode: Function
}

export const ProductDetailsBatches = (props: ProductDetailsBatchesProps) => {
  const { formik, productMetiCode, onSelectBatch, onDeleteBatch, receip, setComponentMetiCode } = props

  const metiCode = productMetiCode || formik.values.metiCode

  if (typeof metiCode === 'undefined') {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <Grid container item spacing={2}>
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
          <Grid item xs={3}>
            <Input
              type="number"
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
                  onSelectBatch()
                  setComponentMetiCode(batch.componentCode)
                }}
                style={{ height: '40px', fontSize: '10px' }}
                disabled={!formik.values?.quantity}
              />
            )}
          </Grid>

          <Grid item xs={3}></Grid>

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
                  <Grid item xs={3}>
                    <Input
                      type="number"
                      variant="outlined"
                      label={`Cantitatea lot 1`}
                      onChange={(e: any) =>
                        formik.setFieldValue(
                          `traceabilityProductionList[${idx}].componentQuantity`,
                          e.target.value
                        )
                      }
                      value={item.componentQuantity}
                      name="componentQuantity"
                      infoIcon={'kg'}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    display={'flex'}
                    alignSelf={'flex-end'}
                    justifyContent={'flex-end'}
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
        <>
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
            <Grid item xs={3}>
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
                  setComponentMetiCode(item.componentCode)
                  onSelectBatch(3)
                }}
                style={{ height: '40px', fontSize: '10px' }}
                disabled={!formik.values?.quantity}
              />
            </Grid>

            <Grid item xs={3}></Grid>
          </>

          {formik.values.traceabilityProductionList.map((charge, idx) => {
            if (charge.componentCode === item.componentCode && charge.childTraceabilityId) {
              return (
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
                          `traceabilityProductionList[${idx}].componentQuantity`,
                          e.target.value
                        )
                      }}
                      value={charge.componentQuantity}
                      name="componentQuantity"
                      infoIcon={'kg'}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
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
              )
            }
          })}
        </>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}></Grid>
        </Fragment>
      ))}

      {formik.values.traceabilityProductionList.length > 0 && (
        <Grid item xs={12}>
          <Divider />
        </Grid>
      )}
    </Grid>
  )
}
