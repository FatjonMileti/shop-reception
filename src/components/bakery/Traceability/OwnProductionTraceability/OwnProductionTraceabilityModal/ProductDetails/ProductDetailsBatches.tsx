import { Grid, Divider, CircularProgress } from '@mui/material'
import { Button, DatePicker, IconButton, Input } from '@fullscreendigital/carrefour-dex-fe'
import { AddActionIcon, DeleteActionIcon } from 'icons'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { formatErrorMessage } from 'utils/formatting'
import { useNotification } from 'hooks'

interface ProductDetailsBatchesProps {
  onSelectBatch: Function
  productMetiCode: any
  formik: any
  onDeleteBatch: Function
}

export const ProductDetailsBatches = (props: ProductDetailsBatchesProps) => {
  const { showNotification } = useNotification()
  const { formik, productMetiCode, onSelectBatch, onDeleteBatch } = props
  const metiCode = productMetiCode || formik.values.metiCode;
  if (typeof metiCode === 'undefined' ) {
    return <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
  }

  const { data: receip, isLoading: isReceipLoading } = useQuery(
    ['receip'],
    async () => {
      const result = await makeCoreGetRequest(
        `/bakery/recipe/${productMetiCode || formik.values.metiCode}`
      )
      let charges = []
      let batches = []

      if (result) {
        result[0].componentList.forEach(item => {
          if (item.withBatch) batches.push(item)
          if (item.withRecipe) charges.push(item)
        })
      }

      return { charges, batches }
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
                value={batch.componentQuantity}
                name="batchId"
                disabled
              />
            </Grid>

            <Grid item xs={3} display={'flex'} alignSelf={'flex-end'} justifyContent={'flex-end'}>
              <IconButton
                startIcon={<AddActionIcon />}
                size="large"
                variant="outlined"
                label="Adauga lot"
                onClick={() => onSelectBatch()}
                style={{ height: '40px', fontSize: '10px' }}
              />
            </Grid>

            <Grid item xs={3}></Grid>
          </>
          <>
            {formik.values.traceabilityProductionList.map((item, idx) => {
              if (item.componentCode === batch.componentCode && item.batchId) {
                return (
                  <>
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
                        type="text"
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
                    <Grid item xs={3}>
                      <DatePicker
                        label="Data deschidere"
                        onChange={(date: any) =>
                          formik.setFieldValue(
                            `traceabilityProductionList[${idx}].openingDate`,
                            date
                          )
                        }
                        value={dayjs(item.openingDate)}
                        variant="outlined"
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
                  </>
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
                onClick={() => onSelectBatch(3)}
                style={{ height: '40px', fontSize: '10px' }}
              />
            </Grid>

            <Grid item xs={3}></Grid>
          </>

          {formik.values.traceabilityProductionList.map((charge, idx) => {
            if (charge.componentCode === item.componentCode && charge.childTraceabilityId) {
              return (
                <>
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
                      type="text"
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
                  <Grid item xs={3}>
                    <DatePicker
                      label="Data deschidere"
                      onChange={(date: any) =>
                        formik.setFieldValue(`traceabilityProductionList[${idx}].openingDate`, date)
                      }
                      value={dayjs(charge.openingDate)}
                      variant="outlined"
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
                </>
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
