import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditBatchItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { batchValues, getInitialValues } from '../helpers'
import { ChangeEvent, useMemo } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditBatchProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editProductId?: string | number
}

const EditBatch: React.FC<EditBatchProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editProductId } = props
    const { showNotification } = useNotification()
    
    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
        ['product', editProductId],
        async () => {
          if (editProductId) {
            const result = await makeCoreGetRequest(`/bakery/product/ingredients/${editProductId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `Error while fetching product data. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

    const submitTask = async (values: any) => {
      await makeCorePutRequest(`/bakery/product/ingredients/${editProductId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
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
    })

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        initialValues: initialValues,
        onSubmit: async (values: any, { resetForm }) => {
            const payload = {
                batch: values.batch === 'Da'
            }
            mutate(payload)
            resetForm()
        }
    })
    
    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Modifica'} modalWidth="50%">
          <Grid container spacing={2}>
            {(isLoading || isLoadingEditItem) ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : ( 
            <>
              <Grid xs={12} item>
                <FormInfoItems
                  items={[
                    { label: 'Produs:', name: (editItem as EditBatchItem)?.name },
                    { label: 'Cod METI:', name: (editItem as EditBatchItem)?.metiCode as string },
                  ]}
                />
              </Grid>
                
              <Grid xs={12} item>
                <Input
                  type="select"
                  variant="outlined"
                  name="batch"
                  label="Lot"
                  values={batchValues}
                  width="100%"
                  value={formik.values.batch}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('batch', (event.target as HTMLInputElement).value)}
                />
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

export default EditBatch