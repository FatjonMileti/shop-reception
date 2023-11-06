import { TaskManagementItem } from 'components/volumetry/interfaces'
import { useNotification } from 'hooks'
import { useMemo } from 'react'
import { getInitialValues, getValidationSchema } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from 'utils/formatting'
import { Modal } from 'components/core-ui/Modal'
import { Grid } from '@mui/material'
import { Input, TimePicker } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'

interface NewTaskProps {
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: TaskManagementItem | number
}

const NewTask: React.FC<NewTaskProps> = props => {
  const { isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        // const payload = {
        //   teamMember: {
        //     id: isEdit ? (editItem as TeamDayOffManagementItem).teamMemberId : values.teamMember.value
        //   },
        //   dayOffType: values.dayOffType,
        //   startDate: formatPayloadDate(values.startDate),
        //   endDate: formatPayloadDate(values.endDate),
        //   ...(values.numberOfHours && { numberOfHours: values.numberOfHours })
        // }

        // if (isEdit) {
        //   await makeCorePutRequest(`/governance/teamTimeOff/${formik.values.id}`, payload)
        // } else {
        //   await makeCorePostRequest('/governance/teamTimeOff', payload)
        // }

        setShouldRefreshData(true)
        closeModal()
      } catch (error) {
        showNotification({
          message: `Error while saving time off data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
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
        <Grid xs={12} md={6} item>
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
        </Grid>
        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="standard"
            name="departmentName"
            label="Departamanet"
            value={formik.values.departmentName}
            options={[]}
            onChange={value => formik.setFieldValue('departmentName', value)}
            error={!!formik.errors.departmentName}
            helperText={formik.errors.departmentName as string}
            required
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <AsyncAutocomplete
            variant="standard"
            name="frequency"
            label="Frecventa"
            value={formik.values.frequency}
            options={[]}
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
            options={[]}
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
            options={[]}
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
          <Input
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
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default NewTask
