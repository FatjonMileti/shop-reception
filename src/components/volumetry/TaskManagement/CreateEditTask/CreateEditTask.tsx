import { TaskManagementItem } from 'components/volumetry/interfaces'
import { useNotification } from 'hooks'
import { ChangeEvent, useMemo } from 'react'
import { getInitialValues, getValidationSchema } from './helpers'
import { useFormik } from 'formik'
import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Checkbox, Input, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
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
  getRaionsOptions,
  getTask,
  getWorkVolumesOptions
} from 'components/volumetry/api'
import { handleQueryError } from 'components/volumetry/utils'

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

  const { data: editItem } = getTask(editItemId, showNotification)

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
  const departmentId = formik.values.rayonsOrDepartment?.value
  const shouldFetchRaions = formik.values.rayonsOrDepartment !== null

  const { data: categoryOptions } = getCategoriesOptions(showNotification)
  const { data: priorityOptions } = getPrioritiesOptions(showNotification)
  const { data: departmentOptions, isLoading: isDepartmentsOptionsLoading } =
    getCategoryDepartmentsOptions(categoryId, shouldFetchDepartments, showNotification)

  const { data: raionOptions, isLoading: isRaionOptionsLoading } = getRaionsOptions(
    departmentId,
    shouldFetchRaions,
    value => formik.setFieldValue('raion', value),
    showNotification
  )

  const { data: frequencyOptions } = getFrequencyOptions(showNotification)
  const { data: measurementUnitsOptions } = getMeasurementUnitsOptions(showNotification)
  const { data: workVolumeSourceOptions } = getWorkVolumesOptions(showNotification)

  const submitTask = async values => {
    const payload = {
      ...values,
      volumetryLocationCategory: values.volumetryLocationCategory.value,
      rayonsOrDepartment: values.rayonsOrDepartment.value,
      raion: values.raion.value,
      frequency: values.frequency.value,
      measurementUnit: values.measurementUnit.value,
      workVolumeSource: values.workVolumeSource.value,
      priority: values.priority.value
    }
    if (editItem) {
      await makeCorePutRequest(`/volumetry/task-templates/${editItemId}`, payload)
    } else {
      await makeCorePostRequest('/volumetry/task-templates/', payload)
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
              formik.setFieldValue('rayonsOrDepartment', null)
            }}
            error={!!formik.errors.volumetryLocationCategory}
            helperText={formik.errors.volumetryLocationCategory as string}
            required
          />
        </Grid>

        {!isDepartmentsOptionsLoading && (
          <Grid xs={12} md={6} item>
            <AsyncAutocomplete
              variant="outlined"
              name="rayonsOrDepartment"
              label="Raion/Departament"
              value={formik.values.rayonsOrDepartment}
              disabled={formik.values.volumetryLocationCategory === null}
              options={departmentOptions || []}
              onChange={value => {
                formik.setFieldValue('rayonsOrDepartment', value)
              }}
              error={!!formik.errors.rayonsOrDepartment}
              helperText={formik.errors.rayonsOrDepartment as string}
              required
            />
          </Grid>
        )}

        {formik.values.rayonsOrDepartment !== null && !isRaionOptionsLoading && (
          <Grid xs={12} md={12} item>
            <AsyncAutocomplete
              variant="outlined"
              name="raion"
              label="Raion"
              value={formik.values.raion || []}
              options={raionOptions}
              onChange={value => {
                formik.setFieldValue('raion', value)
              }}
              error={!!formik.errors.raion}
              helperText={formik.errors.raion as string}
              required
              multiple
            />
          </Grid>
        )}

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
            label="UM standard productivitate"
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

        <Grid xs={12} md={6} item sx={{ display: 'flex' }}>
          <Checkbox
            checked={formik.values.isActive}
            label="Activ"
            onChange={event => formik.setFieldValue('isActive', event.target.checked)}
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
