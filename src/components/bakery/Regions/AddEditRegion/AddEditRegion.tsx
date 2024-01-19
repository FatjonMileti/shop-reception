import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { AddEditRegionItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { divisionTypes, getInitialValues, getValidationSchema, statuses } from '../helpers'
import { ChangeEvent, useEffect, useMemo } from 'react'

interface AddEditRegionProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editRegionId?: string | number
}

const AddEditRegion: React.FC<AddEditRegionProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, isEdit, editRegionId } = props
    const { showNotification } = useNotification()

    useEffect(() => {
      if(isModalOpen && isEdit) {
        refetchEditItem() 
        setShouldRefreshData(true)
      }
    }, [isModalOpen])
    
    const { data: editItem, isLoading: isLoadingEditItem, refetch: refetchEditItem } = useQuery(
        ['region', editRegionId],
        async () => {
          if (editRegionId) {
            const result = await makeCoreGetRequest(`/bakery/region/${editRegionId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `Error while fetching region data. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem, isEdit), [editItem, isModalOpen])
    const validationSchema = useMemo(() => getValidationSchema(), [editItem, isModalOpen])

    const submitTask = async (values: AddEditRegionItem) => {
        if (isEdit) {
          await makeCorePutRequest(`/bakery/region/${editRegionId}`, values)
        } else {
          await makeCorePostRequest('/bakery/region/create', values)
        }
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Region ${isEdit ? 'edited' : 'added'} successfully'`,
            type: 'success'
          })
        },
        onError: res => {
          showNotification({
            message: `Error while trying to ${isEdit ? 'update' : 'add'} field, ${formatErrorMessage(res)}`,
            type: 'error'
          })
        }
    })

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values: AddEditRegionItem, { resetForm }) => {
            const payload = {
                ...values,
                enable: values.enable === 'Activ'
            }
            mutate(payload)
            resetForm()
        }
    })

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={isEdit ? 'Editeaza' : 'Adauga'} modalWidth="50%">
          <Grid container spacing={2}>
            {(isLoading || isLoadingEditItem) ? (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            ) : ( 
            <>
              <Grid xs={12} item>
                <Input
                    type="text"
                    name="responsible"
                    label="Responsabil"
                    fullWidth
                    variant="outlined"
                    value={formik.values.responsible}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('responsible', event.currentTarget.value)}
                    error={!!formik.errors.responsible}
                    helperText={formik.errors.responsible as string}
                />
              </Grid>
              <Grid xs={12} item>
                <Input
                  type="text"
                  name="name"
                  label="Denumire regiune"
                  fullWidth
                  variant="outlined"
                  value={formik.values.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('name', event.currentTarget.value)}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name as string}
                />
              </Grid>
    
              <Grid xs={12} item>
                <Input
                  type="select"
                  variant="outlined"
                  name="divisionType"
                  label="Divizie"
                  values={divisionTypes}
                  width="100%"
                  value={formik.values.divisionType}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('divisionType', (event.target as HTMLInputElement).value)}
                  error={!!formik.errors.divisionType}
                  helperText={formik.errors.divisionType as string}
                  required
                />
              </Grid>
            
              <Grid xs={12} item>
                <Input
                  type="select"
                  variant="outlined"
                  name="enable"
                  label="Status"
                  values={statuses}
                  width="100%"
                  value={formik.values.enable}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('enable', (event.target as HTMLInputElement).value)}
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

export default AddEditRegion
