import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditProductGrowthIndexItem, ProductGrowthIndexListItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, getValidationSchema } from '../helpers'
import { ChangeEvent, useMemo } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditProductGrowthIndexProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editProductGrowthIndexId?: string | number
}

const EditProductGrowthIndex: React.FC<EditProductGrowthIndexProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editProductGrowthIndexId } = props
    const { showNotification } = useNotification()

    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
        ['product-growth-index', editProductGrowthIndexId],
        async () => {
          if (editProductGrowthIndexId) {
            const result = await makeCoreGetRequest(`/bakery/product/growth/${editProductGrowthIndexId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `Error while fetching product growth index data. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
    const validationSchema = useMemo(() => getValidationSchema(), [editItem])

    const submitTask = async (values: EditProductGrowthIndexItem) => {
        await makeCorePutRequest(`/bakery/product/growth/${editProductGrowthIndexId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Product growth index edited successfully`,
            type: 'success'
          })
        },
        onError: res => {
          showNotification({
            message: `Error while trying to update field, ${formatErrorMessage(res)}`,
            type: 'error'
          })
        }
    })

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values: EditProductGrowthIndexItem, { resetForm }) => {
            mutate(values)
            resetForm()
        }
    })

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'} modalWidth="50%">
          <Grid container spacing={2}>
            {(isLoading || isLoadingEditItem) ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : ( 
            <>
              <Grid xs={12} item>
                <FormInfoItems
                  items={[
                    { label: 'Produs:', name: (editItem as EditProductGrowthIndexItem)?.productName },
                    {
                      label: 'Cod METI:',
                      name: (editItem as EditProductGrowthIndexItem)?.metiCode
                    },
                  ]}
                />
              </Grid>
                
              <Grid xs={12} container spacing={3} margin="0">
                <Grid item xs={4}>
                    <Input
                        type="text"
                        variant="outlined"
                        name="generalGrowth"
                        label="Coeficient general"
                        width="100%"
                        value={formik.values.generalGrowth}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('generalGrowth', (event.target as HTMLInputElement).value)}
                        error={!!formik.errors?.generalGrowth}
                        helperText={formik.errors?.generalGrowth as string}
                    />
                </Grid>
                {Object.keys(formik.values.map).map((mapKey: string) => 
                    <Grid item xs={4}>
                        <Input
                            type="text"
                            variant="outlined"
                            name={`map.${mapKey}.growth`}
                            label={`${formik.values.map?.[mapKey].start.slice(0,5)} - ${formik.values.map?.[mapKey].end.slice(0,5)}`}
                            width="100%"
                            value={formik.values?.map?.[mapKey]?.growth}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue(`map.${mapKey}.growth`, (event.target as HTMLInputElement).value)}
                            error={!!formik.errors?.map?.[mapKey]?.growth}
                            helperText={formik.errors?.map?.[mapKey]?.growth as string}
                        />
                    </Grid>
                )}
              </Grid>
        
              <Grid xs={12} item className={s.modalButtons}>
                <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
                <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
              </Grid>
            </>)}
          </Grid>
        </Modal>
      )
}

export default EditProductGrowthIndex
