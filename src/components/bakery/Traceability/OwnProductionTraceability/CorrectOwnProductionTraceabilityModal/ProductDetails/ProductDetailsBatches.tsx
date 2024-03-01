import { Grid, Divider, CircularProgress } from '@mui/material'
import { Button, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { AddActionIcon, DeleteActionIcon } from 'icons'
import { quantityCalculation } from '../helpers'

interface ProductDetailsBatchesProps {
  onSelectBatch: Function
  productMetiCode: any
  formik: any
  onDeleteBatch: Function
  receip: any
  setComponentMetiCode: Function
}

export const ProductDetailsBatches = ({
  formik,
  productMetiCode,
  onSelectBatch,
  onDeleteBatch,
  receip,
  setComponentMetiCode
}: ProductDetailsBatchesProps) => {
  const metiCode = productMetiCode || formik.values.metiCode

  if (typeof metiCode === 'undefined') {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  return (
    <>
      {receip?.batches.map((batch, index) => (
        <>
          <>
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
                    setComponentMetiCode(batch.componentCode)
                    onSelectBatch()
                  }}
                  style={{ height: '40px', fontSize: '10px' }}
                />
              )}
            </Grid>
            <Grid item xs={3}></Grid>
          </>
          <>
            {formik.values.traceabilityProductionList.map((item, idx) => {
              if (item.componentCode === batch.componentCode && item.batchId) {
                return (
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
                )
              }
            })}
          </>
        </>
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
                type="text"
                variant="outlined"
                label={`Cantitatea`}
                value={item.componentQuantity}
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
                  onSelectBatch(2)
                }}
                style={{ height: '40px', fontSize: '10px' }}
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
      {formik.values.traceabilityProductionList.length > 0 && (
        <Grid item xs={12}>
          <Divider />
        </Grid>
      )}
    </>
  )
}
