import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { ProductItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { editStoreValidationSchema, getInitialValues } from './helpers'
import { ChangeEvent, useEffect, useMemo } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditProductProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editProductId?: string | number
}

export const EditProduct: React.FC<EditProductProps> = props => {
  const { isModalOpen, closeModal, setShouldRefreshData, editProductId } = props
  const { showNotification } = useNotification()

  useEffect(() => {
    if(isModalOpen) productQuery.refetch()
  }, [isModalOpen])

  const productQuery = useQuery(
    ['product-store', editProductId],
    async () => {
      if (editProductId) {
        const result = await makeCoreGetRequest(`/bakery/product/${editProductId}`)
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

  const initialValues = useMemo(() => getInitialValues(productQuery.data), [productQuery.data])

  const editProductMutation = useMutation(
    async (values: any) => {
      await makeCorePutRequest(`/bakery/product/${editProductId}`, values)
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

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: editStoreValidationSchema,
    onSubmit: async (values: any, { resetForm }) => {
      const payload = {
        ...values,
        scheduleProduct: values.scheduleProduct === 'Da'
    }
      editProductMutation.mutate(payload)
      resetForm()
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Editeaza'} modalWidth="50%">
      <Grid container rowSpacing={3.5}>
        {editProductMutation.isLoading || productQuery.isFetching ? (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        ) : (
          <>
            <Grid xs={12} item>
              <FormInfoItems
                items={[
                  {
                    label: 'Produs:',
                    name: (productQuery.data as ProductItem)?.name
                  },
                  {
                    label: 'Cluster:',
                    name: (productQuery.data as ProductItem)?.clusterName
                  },
                  {
                    label: 'Cod METI:',
                    name: (productQuery.data as ProductItem)?.metiCode as string
                  }
                ]}
              />
            </Grid>

            <Grid container rowSpacing={3} item>
              <Grid xs={12} item>
                <Input
                  type="select"
                  variant="outlined"
                  name="scheduleProduct"
                  label="Produs cadentier"
                  width="100%"
                  value={formik.values.scheduleProduct}
                  values={[
                    { value: 'Da', label: 'Da' },
                    { value: 'Nu', label: 'Nu' }
                  ]}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue(
                      'scheduleProduct',
                      (event.target as HTMLInputElement).value
                    )
                  }}
                  error={!!formik.errors.scheduleProduct}
                  helperText={formik.errors.scheduleProduct as string}
                />
              </Grid>

              <Grid xs={12} item>
                <Input
                  type="text"
                  variant="outlined"
                  name="minStock"
                  label="Stoc minim de prezentare"
                  width="100%"
                  value={formik.values.minStock}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    formik.setFieldValue('minStock', event.currentTarget.value)
                  }
                  error={!!formik.errors.minStock}
                  helperText={formik.errors.minStock as string}
                />
              </Grid>
            </Grid>

            <Grid xs={12} item className={s.modalButtons}>
              <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
              <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
            </Grid>
          </>
        )}
      </Grid>
    </Modal>
  )
}
