import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import { CircularProgress, Grid } from '@mui/material'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { AddZoneItem } from '../../interfaces'
import { useMutation } from 'react-query'

interface AddZoneProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
}

const divisionTypes = [
    { label: 'Super', value: 'SUPER' }, 
    { label: 'Hyper', value: 'HYPER' } 
]

const statuses = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" }
]

const AddZone: React.FC<AddZoneProps> = props => {
    const { isModalOpen, closeModal, setShouldRefreshData } = props
    const { showNotification } = useNotification()

    const addZone = async values => {
        await makeCorePutRequest(
          `/bakery/zone/create`, values
        )
    }

    const { isLoading, mutate } = useMutation(addZone, {
        onSuccess: res => {
          setShouldRefreshData(true)
          closeModal()
          showNotification({
            message: 'Item added successfully',
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
          id: '',
          name: '',
          responsible: '',
          enable: '',
          divisionType: '',
          stores: []
        },
        validationSchema: validationSchema,
        onSubmit: async (values: AddZoneItem) => {
            const payload = {
                ...values,
                enable: values.enable === 'Active' ? true : false
            }
            mutate(payload)
        }
    })

    return (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Adauga Zona'}>
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

export default AddZone
