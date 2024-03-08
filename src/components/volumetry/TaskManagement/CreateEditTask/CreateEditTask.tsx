import { TaskManagementItem } from 'components/volumetry/interfaces'
import { useNotification } from 'hooks'
import { ChangeEvent, useMemo } from 'react'
import { getInitialValues, getValidationSchema } from './helpers'
import { useFormik } from 'formik'
import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Input, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useMutation } from 'react-query'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { toTaskPayload } from './serializers'
import {
  getCategoriesOptions,
  getCategoryDepartmentsOptions,
  getFrequencyOptions,
  getMeasurementUnitsOptions,
  getPrioritiesOptions,
  getTask,
  getWorkVolumesOptions
} from 'components/volumetry/api'
import { handleQueryError } from 'utils/helpers'

interface CreateEditTaskProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItemId?: string | number
}

const CreateEditTask: React.FC<CreateEditTaskProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItemId, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const { data: editItem } = getTask(editItemId, isModalOpen, showNotification)

  const initialValues = useMemo(() => getInitialValues(editItem), [editItemId, editItem])
  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItemId])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: TaskManagementItem, { resetForm }) => {
      mutate(toTaskPayload(values))
      resetForm()
    }
  })

  const categoryId = formik.values.volumetryLocationCategory?.value
  const shouldFetchDepartments = formik.values.volumetryLocationCategory !== null

  const { data: categoryOptions } = getCategoriesOptions(showNotification)
  const { data: priorityOptions } = getPrioritiesOptions(showNotification)
  const { data: departmentOptions } = getCategoryDepartmentsOptions(
    categoryId,
    shouldFetchDepartments,
    showNotification
  )

  const { data: frequencyOptions } = getFrequencyOptions(showNotification)
  const { data: measurementUnitsOptions } = getMeasurementUnitsOptions(showNotification)
  const { data: workVolumeSourceOptions } = getWorkVolumesOptions(showNotification)

  const submitTask = async values => {
    if (editItem) {
      await makeCorePutRequest(`/volumetry/task-templates/${editItemId}`, values)
    } else {
      await makeCorePostRequest('/volumetry/task-templates', values)
    }
  }

  const { isLoading, mutate } = useMutation(submitTask, {
    onSuccess: res => {
      setShouldRefreshData(true)
      closeModal()
      showNotification({
        message: 'Taskul a fost salvat cu succes',
        type: 'success'
      })
    },
    onError: error =>
      handleQueryError(error, 'A aparut o eroare la salvarea taskului.', showNotification)
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza task template' : 'Creeaza task template'}
      modalWidth="50%"
    >
      <Grid container spacing={4}>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        <Grid xs={12} item>
          <Input
            type="text"
            name="name"
            label="Nume task"
            fullWidth
            variant="outlined"
            value={formik.values.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('name', event.currentTarget.value)
            }
            error={!!formik.errors.name}
            helperText={formik.errors.name as string}
            required
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="volumetryLocationCategory"
            label="Categorie"
            value={formik.values.volumetryLocationCategory}
            options={categoryOptions}
            onChange={value => {
              formik.setFieldValue('volumetryLocationCategory', value)
              formik.setFieldValue('departmentAlias', null)
            }}
            error={!!formik.errors.volumetryLocationCategory}
            helperText={formik.errors.volumetryLocationCategory as string}
            required
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="departmentAlias"
            label="Raion/Departament"
            value={formik.values.departmentAlias}
            disabled={formik.values.volumetryLocationCategory === null}
            options={departmentOptions || []}
            onChange={value => {
              formik.setFieldValue('departmentAlias', value)
            }}
            error={!!formik.errors.departmentAlias}
            helperText={formik.errors.departmentAlias as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TimePicker
            label="Ora recomandata de inceput"
            value={formik.values.recommendedStartHour}
            onChange={newValue => formik.setFieldValue('recommendedStartHour', newValue)}
            error={!!formik.errors.recommendedStartHour}
            helperText={formik.errors.recommendedStartHour as string}
            required
            variant="outlined"
            style={{ width: '100%' }}
            forceDesktop
            ampm={false}
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <TimePicker
            label="Ora recomandata de sfarsit"
            value={formik.values.recommendedEndHour}
            onChange={newValue => formik.setFieldValue('recommendedEndHour', newValue)}
            error={!!formik.errors.recommendedEndHour}
            helperText={formik.errors.recommendedEndHour as string}
            required
            variant="outlined"
            style={{ width: '100%' }}
            forceDesktop
            ampm={false}
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="frequency"
            label="Frecventa"
            value={formik.values.frequency}
            options={frequencyOptions}
            onChange={value => formik.setFieldValue('frequency', value)}
            error={!!formik.errors.frequency}
            helperText={formik.errors.frequency as string}
            required
            multiple
          />
        </Grid>

        {/* <Grid xs={12} md={6} item>
          <Input
            type="number"
            name="defaultWorkload"
            label="Volum estimat"
            fullWidth
            required
            variant="outlined"
            value={formik.values.defaultWorkload}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue(
                'defaultWorkload',
                event.currentTarget.value.replace(/[.,]/g, '')
              )
            }
            error={!!formik.errors.defaultWorkload}
            helperText={formik.errors.defaultWorkload as string}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </Grid> */}

        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="workVolumeSource"
            label="Sursa volum de lucru"
            value={formik.values.workVolumeSource}
            options={workVolumeSourceOptions}
            onChange={value => formik.setFieldValue('workVolumeSource', value)}
            error={!!formik.errors.workVolumeSource}
            helperText={formik.errors.workVolumeSource as string}
            required
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <Input
            type="number"
            name="standardProductivityValue"
            label="Valoare productivitate standard"
            fullWidth
            required
            variant="outlined"
            value={formik.values.standardProductivityValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('standardProductivityValue', event.currentTarget.value)
            }
            error={!!formik.errors.standardProductivityValue}
            helperText={formik.errors.standardProductivityValue as string}
            inputProps={{
              step: '0.1'
            }}
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="measurementUnit"
            label="Unitate de masura"
            value={formik.values.measurementUnit}
            options={measurementUnitsOptions}
            onChange={value => formik.setFieldValue('measurementUnit', value)}
            error={!!formik.errors.measurementUnit}
            helperText={formik.errors.measurementUnit as string}
            required
          />
        </Grid>

        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="outlined"
            name="priority"
            label="Prioritate"
            value={formik.values.priority}
            options={priorityOptions}
            onChange={value => formik.setFieldValue('priority', value)}
            error={!!formik.errors.priority}
            helperText={formik.errors.priority as string}
            required
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

export default CreateEditTask
