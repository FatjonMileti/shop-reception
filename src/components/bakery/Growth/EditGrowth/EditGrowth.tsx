import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditGrowthItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, getValidationSchema } from '../helpers'
import { ChangeEvent, useMemo } from 'react'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'

interface EditGrowthProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editGrowthId?: string | number
}

const EditGrowth: React.FC<EditGrowthProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editGrowthId } = props
    const { showNotification } = useNotification()

    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
        ['growth', editGrowthId],
        async () => {
          if (editGrowthId) {
            const result = await makeCoreGetRequest(`/bakery/user/growth/${editGrowthId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `A aparut o eroare la obtinerea detaliilor coeficientului de crestere. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
    const validationSchema = useMemo(() => getValidationSchema(), [editItem])

    const submitTask = async (values: EditGrowthItem) => {
        await makeCorePutRequest(`/bakery/user/growth/${editGrowthId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Growth edited successfully`,
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
        onSubmit: async (values: EditGrowthItem, { resetForm }) => {
            const payload = {
                ...values,
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
                    { label: 'Divizie:', name: (editItem as EditGrowthItem)?.type },
                  ]}
                />
              </Grid>
                
              <Grid xs={12} item>
                <Input
                    type="text"
                    name="growth"
                    label="Coeficient de crestere"
                    fullWidth
                    variant="outlined"
                    value={formik.values.growth}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('growth', event.currentTarget.value)}
                    error={!!formik.errors.growth}
                    helperText={formik.errors.growth as string}
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

export default EditGrowth
