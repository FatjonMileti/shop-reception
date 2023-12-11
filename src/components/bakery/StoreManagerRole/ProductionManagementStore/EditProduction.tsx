import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditProductionForm, TableItem } from './interfaces'
import { useMutation, useQuery } from 'react-query'
import { editStoreValidationSchema, getInitialValues } from './helpers'
import { ChangeEvent, useMemo } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditProductionProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editProductionId?: string | number
}

export const EditProduction: React.FC<EditProductionProps> = props => {
  const { isModalOpen, closeModal, setShouldRefreshData, editProductionId } = props
  const { showNotification } = useNotification()

  const productionQuery = useQuery(
    ['production-store', editProductionId],
    async () => {
      if (editProductionId) {
        const result = await makeCoreGetRequest(`/bakery/store/cadentier/${editProductionId}`)
        return result || null
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `An error occurred while getting the product details. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const initialValues = useMemo(() => getInitialValues(productionQuery.data), [productionQuery.data])

  const productionMutation = useMutation(
    async (values: any) => {
      await makeCorePutRequest(`/bakery/store/cadentier/update`, values)
    },
    {
      onSuccess: () => {
        setShouldRefreshData(true)
        closeModal()
        showNotification({
          message: `Product edited successfully`,
          type: 'success'
        })
      },
      onError: res => {
        showNotification({
          message: `Error while trying to update field, ${formatErrorMessage(res)}`,
          type: 'error'
        })
      }
    }
  )

  const formik = useFormik<EditProductionForm>({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: editStoreValidationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      productionMutation.mutate(values)
      resetForm()
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'} modalWidth="50%">
      <Grid container rowSpacing={3.5}>
        {productionMutation.isLoading || productionQuery.isFetching ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid xs={12} item>
              <FormInfoItems
                items={
                  [
                    {
                      label: "Produs",
                      name: (productionQuery.data as TableItem)?.productName
                    },
                    {
                      label: "Medie vanzari",
                      name: (productionQuery.data as TableItem)?.average.toString()
                    },
                    {
                      label: "Cant. propusa",
                      name: (productionQuery.data as TableItem)?.quantityToProduce.toString()
                    },
                    {
                      "label": "Gama produs",
                      name: (productionQuery.data as TableItem)?.clusterMandatory ? "O" : "F",
                    },
                    {
                      label: "Promotie",
                      name: (productionQuery.data as TableItem)?.inPromotion ? "Y" : "N"
                      // "render": {
                      //   "UIComponent": "BooleanIcon",
                      //   "icon": "Flag",
                      //   "onSuccess": "#33691E",
                      //   "onFailure": "#E5E5E5"
                      // }
                    }
                  ]


                }
              />
            </Grid>

            <Grid container spacing={3}  item>

              <Grid xs={12} md={4} item>
                <Input
                  type="number"
                  variant="standard"
                  name="map.interval1.quantityToProduce"
                  label="06:00 - 10:00"
                  width="100%"
                  value={formik.values?.map?.interval1?.quantityToProduce?.toString()}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue('map.interval1.quantityToProduce', event.currentTarget.value)
                  }
                  error={!!formik.errors?.map?.interval1?.quantityToProduce}
                  helperText={formik.errors?.map?.interval1?.quantityToProduce as string}
                />
              </Grid>

              <Grid xs={12} md={4} item>
                <Input
                  type="number"
                  variant="standard"
                  name="map.interval2.quantityToProduce"
                  label="10:00 - 14:00"
                  width="100%"
                  value={formik.values?.map?.interval2?.quantityToProduce?.toString()}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue('map.interval2.quantityToProduce', event.currentTarget.value)
                  }
                  error={!!formik.errors?.map?.interval2?.quantityToProduce}
                  helperText={formik.errors?.map?.interval2?.quantityToProduce as string}
                />
              </Grid>

              <Grid xs={12} md={4} item>
                <Input
                  type="number"
                  variant="standard"
                  name="map.interval3.quantityToProduce"
                  label="14:00 - 18:00"
                  width="100%"
                  value={formik.values?.map?.interval3?.quantityToProduce?.toString()}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue('map.interval3.quantityToProduce', event.currentTarget.value)
                  }
                  error={!!formik.errors?.map?.interval3?.quantityToProduce}
                  helperText={formik.errors?.map?.interval3?.quantityToProduce as string}
                />
              </Grid>

              <Grid xs={12} md={4} item>
                <Input
                  type="number"
                  variant="standard"
                  name="map.interval4.quantityToProduce"
                  label="18:00 - 22:00"
                  width="100%"
                  value={formik.values?.map?.interval4?.quantityToProduce?.toString()}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue('map.interval4.quantityToProduce', event.currentTarget.value)
                  }
                  error={!!formik.errors?.map?.interval4?.quantityToProduce}
                  helperText={formik.errors?.map?.interval4?.quantityToProduce as string}
                />
              </Grid>

              <Grid xs={12} md={4} item>
                <Input
                  type="number"
                  variant="standard"
                  name="map.interval4.quantityToProduce"
                  label="22:00 - 06:00"
                  width="100%"
                  value={formik.values?.map?.interval5?.quantityToProduce?.toString()}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue('map.interval5.quantityToProduce', event.currentTarget.value)
                  }
                  error={!!formik.errors?.map?.interval5?.quantityToProduce}
                  helperText={formik.errors?.map?.interval5?.quantityToProduce as string}
                />
              </Grid>

            </Grid>

            <Grid xs={12} item className={s.modalButtons}>
              <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
              <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
            </Grid>
          </>
        )}
      </Grid>
    </Modal>
  )
}
