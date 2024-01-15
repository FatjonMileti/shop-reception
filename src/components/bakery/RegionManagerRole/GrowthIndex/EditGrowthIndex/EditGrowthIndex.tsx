import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditGrowthIndexItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues } from '../helpers'
import { ChangeEvent, useMemo } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditGrowthIndexProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editGrowthIndexId?: string | number
}

const EditGrowthIndex: React.FC<EditGrowthIndexProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editGrowthIndexId } = props
    const { showNotification } = useNotification()

    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
        ['growth-index', editGrowthIndexId],
        async () => {
          if (editGrowthIndexId) {
            const result = await makeCoreGetRequest(`/bakery/region/growth/${editGrowthIndexId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `Error while fetching growth index data. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

    const submitTask = async (values: EditGrowthIndexItem) => {
        await makeCorePutRequest(`/bakery/region/growth`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Item saved successfully`,
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
        onSubmit: async (values: EditGrowthIndexItem, { resetForm }) => {
            mutate(values)
            resetForm()
        }
    })

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Editeaza'} modalWidth="50%">
          <Grid container spacing={2}>
            {(isLoading || isLoadingEditItem) ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : ( 
            <>
              <Grid xs={12} item>
                <FormInfoItems
                  items={[
                    { label: 'Magazin:', name: (editItem as EditGrowthIndexItem)?.name }
                  ]}
                />
              </Grid>
                
              <Grid xs={12} item>
                <Input
                    type="text"
                    variant="outlined"
                    name="growth"
                    label="Coeficient"
                    value={formik.values.growth}
                    width="100%"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('growth', (event.target as HTMLInputElement).value)}
                    error={!!formik.errors.growth}
                    helperText={formik.errors.growth as string}
                />
              </Grid>
        
              <Grid xs={12} item className={s.modalButtons}>
                <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
                <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
              </Grid>
            </>)}
          </Grid>
        </Modal>
      )
}

export default EditGrowthIndex
