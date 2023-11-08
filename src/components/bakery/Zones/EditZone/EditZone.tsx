import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { EditZoneItem } from '../../interfaces'
import { useMutation } from 'react-query'

interface EditZoneProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  editItem: EditZoneItem
}

const divisionTypes = [
    { label: 'Super', value: 'SUPER' }, 
    { label: 'Hyper', value: 'HYPER' } 
]

const statuses = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
]

const EditZone: React.FC<EditZoneProps> = props => {
    const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
    const { showNotification } = useNotification()

    const editZone = async values => {
        await makeCorePutRequest(
          `/bakery/zone/${(editItem as EditZoneItem)?.id}`,
          values
        )
    }

    const { isLoading, mutate } = useMutation(editZone, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: 'Item edited successfully',
            type: 'success'
          })
        },
        onError: res => {
          showNotification({
            message: `Error while fetching dropdown data. ${formatErrorMessage(res)}`,
            type: 'error'
          })
        }
    })

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        initialValues: {
          id: (editItem as EditZoneItem)?.id || '',
          name: (editItem as EditZoneItem)?.name || '',
          responsible: (editItem as EditZoneItem)?.responsible || '',
          enable: (editItem as EditZoneItem)?.enable ? 'Active' : 'Inactive' || '',
          divisionType: (editItem as EditZoneItem)?.divisionType || '',
          stores: (editItem as EditZoneItem)?.stores || []
        },
        validationSchema: validationSchema,
        onSubmit: async (values: EditZoneItem) => {
            const payload = {
                ...values,
                enable: values.enable === 'Active' ? true : false
            }
            mutate(payload)
        }
    })

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'}>
          <Grid container spacing={2}>
            {(isLoading) && (
              <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
            )}
            <Grid xs={12} item>
              <Input
                type="text"
                name="name"
                label="Nume zona"
                fullWidth
                variant="standard"
                value={formik.values.name}
                onChange={event => formik.setFieldValue('name', event.currentTarget.value)}
                error={!!formik.errors.name}
                helperText={formik.errors.name as string}
              />
            </Grid>

            <Grid xs={12} item>
              <Input
                type="text"
                name="responsible"
                label="Responsabil"
                fullWidth
                variant="standard"
                value={formik.values.responsible}
                onChange={event => formik.setFieldValue('responsible', event.currentTarget.value)}
                error={!!formik.errors.responsible}
                helperText={formik.errors.responsible as string}
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
                onChange={event => formik.setFieldValue('divisionType', (event.target as HTMLInputElement).value)}
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
                onChange={event => formik.setFieldValue('enable', (event.target as HTMLInputElement).value)}
              />
            </Grid>
    
            <Grid xs={12} item className={s.modalButtons}>
              <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
              <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
            </Grid>
          </Grid>
        </Modal>
      )
}

export default EditZone
