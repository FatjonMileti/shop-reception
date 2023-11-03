import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { makeCoreGetRequest, makeCorePutRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { EmployeeManagementItem, ValueLabelInterface } from 'components/volumetry/interfaces'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

interface EditMerchandiserProps {
  isModalOpen: boolean
  closeModal: Function
  editItem: EmployeeManagementItem | number
  setShouldRefreshData: Function
}

const EditMerchandiser: React.FC<EditMerchandiserProps> = props => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const editTeamAssignment = async values => {
    await makeCorePutRequest(
      `/volumetry/merchendiser/${(editItem as EmployeeManagementItem)?.id}`,
      values
    )
  }

  const { isLoading, mutate } = useMutation(editTeamAssignment, {
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

  const { data: volumetryDepartmentOptions, isLoading: isVolumetryDepartmentLoading } = useQuery(
    ['volumetry-department'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/department')
      const resultOptions = result.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: volumetryPositionOptions, isLoading: isVolumetryPositionLoading } = useQuery(
    ['volumetry-position'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/position')
      const resultOptions = result.list.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      id: (editItem as EmployeeManagementItem)?.id || 0,
      name: (editItem as EmployeeManagementItem)?.name || '',
      departmentName: (editItem as EmployeeManagementItem).departmentName || '',
      position: (editItem as EmployeeManagementItem).position || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: EmployeeManagementItem) => {
      mutate(values)
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'}>
      <Grid container spacing={2}>
        {(isLoading || isVolumetryDepartmentLoading || isVolumetryPositionLoading) && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        <Grid xs={12} item>
          <Input
            type="text"
            name="name"
            label="Nume merchendiser"
            fullWidth
            variant="standard"
            value={formik.values.name}
            onChange={event => formik.setFieldValue('name', event.currentTarget.value)}
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
          />
        </Grid>

        <Grid xs={12} item>
          <AsyncAutocomplete
            variant="standard"
            name="department.name"
            label="Selecteaza magazin"
            disableClearable
            value={{ value: formik.values.departmentName, label: formik.values.departmentName }}
            options={volumetryDepartmentOptions}
            onChange={event => formik.setFieldValue('departmentName', event.value)}
          />
        </Grid>

        <Grid xs={12} item>
          <AsyncAutocomplete
            variant="standard"
            name="position.name"
            label="Selecteaza functia"
            disableClearable
            value={{ value: formik.values.position, label: formik.values.position }}
            options={volumetryPositionOptions}
            onChange={event => formik.setFieldValue('position', event.value)}
          />
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Anuleaza" onClick={() => closeModal()} />
          <Button variant="contained" label="Salveaza" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditMerchandiser
