import { TaskManagementItem } from 'components/volumetry/interfaces'
import { useNotification } from 'hooks'
import { useEffect, useMemo, useState } from 'react'
import { getInitialValues, getValidationSchema } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from 'utils/formatting'
import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, Checkbox, Input, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { useMutation, useQuery } from 'react-query'
import { makeCoreGetRequest, makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete/serializers'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { toTaskPayload } from './serializers'

interface NewTaskProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItemId?: string | number
}

const NewTask: React.FC<NewTaskProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItemId, setShouldRefreshData } = props

  const { data: editItem } = useQuery(
    ['task', editItemId],
    async () => {
      if (editItemId) {
        const result = await makeCoreGetRequest(`/volumetry/task/${editItemId}`)

        return result || null
      }
      return null
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea detaliilor taskului. ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const { data: departmentFilterOptions } = useQuery(
    ['departments'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/department')
      const resultOptions = toAsyncSelectOptions(result.list, 'id', 'name') || []

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea departamentelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: frequencyFilterOptions } = useQuery(
    ['frequencies'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/frequency')
      const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea frecventelor. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }
  )

  const { data: prodStandardUMFilterOptions } = useQuery(
    ['prodStandardUM'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/productivityStandardUM')
      const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea Unitatilor de masura a activitatii standard ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const { data: workVolumeSourceFilterOptions } = useQuery(
    ['workVolumeSource'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/workVolumeSource')
      const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []

      return resultOptions || []
    },
    {
      onError: error => {
        showNotification({
          message: `A aparut o eroare la obtinerea Unitatilor de masura a activitatii standard ${formatErrorMessage(
            error
          )}`,
          type: 'error'
        })
      }
    }
  )

  const submitTask = async values => {
    if (editItem) {
      await makeCorePutRequest(`/volumetry/task/${(editItem as TaskManagementItem)?.id}`, values)
    } else {
      await makeCorePostRequest('/volumetry/task/', values)
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
    onError: res => {
      showNotification({
        message: `A aparut o eroare la salvarea taskului. ${formatErrorMessage(res)}`,
        type: 'error'
      })
    }
  })

  console.log(initialValues)

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(toTaskPayload(values))
    }
  })

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Editeaza Task' : 'Creaza Task'}
      modalWidth="50%"
    >
      <Grid container spacing={4}>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}
        <Grid xs={12} item>
          <Input
            type="text"
            name="taskName"
            label="Nume task"
            fullWidth
            variant="standard"
            value={formik.values.taskName}
            onChange={event => formik.setFieldValue('taskName', event.currentTarget.value)}
            error={!!formik.errors.taskName}
            helperText={formik.errors.taskName as string}
            required
          />
        </Grid>
        {/* <Grid xs={12} md={6} item>
          <TimePicker
            label="Ora estimata de inceput"
            value={formik.values.estimateStartTime}
            onChange={newValue => formik.setFieldValue('estimateStartTime', newValue)}
            error={!!formik.errors.taskName}
            helperText={formik.errors.taskName as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TimePicker
            label="Ora estimata de sfarsit"
            value={formik.values.estimateEndTime}
            onChange={newValue => formik.setFieldValue('estimateEndTime', newValue)}
            error={!!formik.errors.taskName}
            helperText={formik.errors.taskName as string}
            required
          />
        </Grid> */}
        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="standard"
            name="departments"
            label="Departament"
            value={formik.values.departments || []}
            options={departmentFilterOptions}
            onChange={value => formik.setFieldValue('departments', value)}
            error={!!formik.errors.departments}
            helperText={formik.errors.departments as string}
            required
            multiple
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="standard"
            name="frequency"
            label="Frecventa"
            value={formik.values.frequency}
            options={frequencyFilterOptions}
            onChange={value => formik.setFieldValue('frequency', value)}
            error={!!formik.errors.frequency}
            helperText={formik.errors.frequency as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="number"
            name="prodStandardValue"
            label="Valoare standard productivitate"
            fullWidth
            variant="standard"
            value={formik.values.prodStandardValue}
            onChange={event => formik.setFieldValue('prodStandardValue', event.currentTarget.value)}
            error={!!formik.errors.prodStandardValue}
            helperText={formik.errors.prodStandardValue as string}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="standard"
            name="prodStandardUM"
            label="UM standard productivitate"
            value={formik.values.prodStandardUM}
            options={prodStandardUMFilterOptions}
            onChange={value => formik.setFieldValue('prodStandardUM', value)}
            error={!!formik.errors.prodStandardUM}
            helperText={formik.errors.prodStandardUM as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="standard"
            name="workVolumeSource"
            label="Sursa volum de lucru"
            value={formik.values.workVolumeSource}
            options={workVolumeSourceFilterOptions}
            onChange={value => formik.setFieldValue('workVolumeSource', value)}
            error={!!formik.errors.workVolumeSource}
            helperText={formik.errors.workVolumeSource as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Input
            type="number"
            name="priority"
            label="Prioritate"
            fullWidth
            variant="standard"
            value={formik.values.priority}
            onChange={event => formik.setFieldValue('priority', event.currentTarget.value)}
            error={!!formik.errors.priority}
            helperText={formik.errors.priority as string}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <Checkbox
            checked={formik.values.status}
            label="Activ"
            onChange={event => formik.setFieldValue('status', event.target.checked)}
            // error={!!formik.errors.status}
            // helperText={formik.errors.status as string}
          />
          {/* <Input
            label="Status"
            type="select"
            values={[]}
            variant="standard"
            width="100%"
            value={formik.values.status}
            onChange={event => {
              const inputValue = (event.target as HTMLInputElement).value
              formik.setFieldValue('status', inputValue)
            }}
            error={!!formik.errors.status}
            helperText={formik.errors.status as string}
            required
          /> */}
        </Grid>
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default NewTask
