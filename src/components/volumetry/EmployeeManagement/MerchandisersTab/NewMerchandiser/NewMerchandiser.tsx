import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Input } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useMutation, useQuery } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { NewMerchandiserItem, ValueLabelInterface } from 'components/volumetry/interfaces'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

interface NewMerchandiserProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
}

const NewMerchandiser: React.FC<NewMerchandiserProps> = props => {
  const { isModalOpen, closeModal, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const addMerchandiser = async values => {
    await makeCorePostRequest(
      `/volumetry/merchendiser`,
      values
    )
  }

  const { isLoading, mutate } = useMutation(addMerchandiser, {
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
      name: '',
      departmentName:  '',
      position: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: NewMerchandiserItem) => {
      mutate(values)
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'New merchandiser'}>
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

export default NewMerchandiser
