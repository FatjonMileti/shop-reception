import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditClusterItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, gamaProdus } from '../helpers'
import { ChangeEvent, useMemo } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditClusterProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editClusterId?: string | number
}

const EditCluster: React.FC<EditClusterProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editClusterId } = props
    const { showNotification } = useNotification()

    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
        ['cluster', editClusterId],
        async () => {
          if (editClusterId) {
            const result = await makeCoreGetRequest(`/bakery/cluster/${editClusterId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `Error while fetching cluster data. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

    const submitTask = async (values: EditClusterItem) => {
        await makeCorePutRequest(`/bakery/cluster/${editClusterId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Cluster edited successfully`,
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
        onSubmit: async (values: EditClusterItem, { resetForm }) => {
            const payload = {
                ...values,
                enable: values.enable === 'Active',
                mandatory: values.mandatory === 'Obligatoriu'
            }
            mutate(payload)
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
                    { label: 'Denumire:', name: (editItem as EditClusterItem)?.name }
                  ]}
                />
              </Grid>
                
              <Grid xs={12} item>
                <Input
                    type="select"
                    variant="outlined"
                    name="mandatory"
                    label="Gama produs"
                    values={gamaProdus}
                    width="100%"
                    value={formik.values.mandatory}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('mandatory', (event.target as HTMLInputElement).value)}
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

export default EditCluster
