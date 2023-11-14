import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditFamilyItem } from '../../interfaces'
import { useMutation, useQuery } from 'react-query'
import { getInitialValues, famInBakeryScope, divisionTypes } from '../helpers'
import { ChangeEvent, useMemo } from 'react'

interface EditFamilyProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editFamilyId: string | number
}

const EditFamily: React.FC<EditFamilyProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData, editFamilyId } = props
    const { showNotification } = useNotification()

    const { data: editItem, isLoading: isLoadingEditItem } = useQuery(
        ['family', editFamilyId],
        async () => {
          if (editFamilyId) {
            const result = await makeCoreGetRequest(`/bakery/family/${editFamilyId}`)
            return result || null
          }
          return null
        },
        {
          onError: error => {
            showNotification({
              message: `A aparut o eroare la obtinerea detaliilor familiei. ${formatErrorMessage(
                error
              )}`,
              type: 'error'
            })
          }
        }
    )

    const initialValues = useMemo(() => getInitialValues(editItem), [editItem])
    // const validationSchema = useMemo(() => getValidationSchema(), [editItem])

    const submitTask = async (values: EditFamilyItem) => {
        await makeCorePutRequest(`/bakery/family/${editFamilyId}`, values)
    }

    const { isLoading, mutate } = useMutation(submitTask, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: `Family edited successfully'`,
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
        onSubmit: async (values: EditFamilyItem, { resetForm }) => {
            const payload = {
                ...values,
                enable: values.enable === 'Active'
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
              {/* <Grid xs={12} item>
                <Input
                    type="text"
                    name="responsible"
                    label="Responsabil"
                    fullWidth
                    variant="standard"
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
                  variant="standard"
                  value={formik.values.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('name', event.currentTarget.value)}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name as string}
                />
              </Grid>
    
              <Grid xs={12} item>
                <Input
                  type="select"
                  variant="standard"
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
                  variant="standard"
                  name="enable"
                  label="Status"
                  values={statuses}
                  width="100%"
                  value={formik.values.enable}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => formik.setFieldValue('enable', (event.target as HTMLInputElement).value)}
                />
              </Grid> */}
    
              <Grid xs={12} item className={s.modalButtons}>
                <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
                <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
              </Grid>
            </>)}
          </Grid>
        </Modal>
      )
}

export default EditFamily
