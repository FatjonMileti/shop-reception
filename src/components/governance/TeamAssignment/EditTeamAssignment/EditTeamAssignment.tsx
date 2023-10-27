import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { validationSchema } from './helpers'
import { makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { TeamAssignmentItem } from 'components/interfaces'
import { FormInfoItems } from 'components/governance/TeamDayOffManagement/FormInfoItems'

interface EditTeamAssignmentProps {
  isModalOpen: boolean
  closeModal: Function
  editItem: TeamAssignmentItem | number
}

const EditTeamAssignment: React.FC<EditTeamAssignmentProps> = props => {
  const { isModalOpen, closeModal, editItem } = props
  const { showNotification } = useNotification()

  const editTeamAssignment = async values => {
    await makeCorePutRequest(
      `/governance/teamAssignments/${(editItem as TeamAssignmentItem)?.id}`,
      values
    )
  }

  const { isLoading, mutate } = useMutation(editTeamAssignment, {
    onSuccess: res => {
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
      id: (editItem as TeamAssignmentItem)?.id || 0,
      assignedProject: (editItem as TeamAssignmentItem)?.assignedProject || '',
      assignmentEndDate: (editItem as TeamAssignmentItem)?.assignmentEndDate,
      assignmentStartDate: (editItem as TeamAssignmentItem)?.assignmentStartDate,
      iibKey: (editItem as TeamAssignmentItem)?.iibKey || '',
      ipbKey: (editItem as TeamAssignmentItem)?.ipbKey || '',
      role: (editItem as TeamAssignmentItem)?.role || '',
      teamMemberName: (editItem as TeamAssignmentItem)?.teamMemberName || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const assignmentStartDate = dayjs(new Date(values.assignmentStartDate)).format('YYYY-MM-DD')
      const assignmentEndDate = dayjs(
        new Date(values.assignmentEndDate['$d'] || values.assignmentEndDate)
      ).format('YYYY-MM-DD')

      const valuesToSubmit = { assignmentStartDate, assignmentEndDate }
      mutate(valuesToSubmit)
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'}>
      <Grid container spacing={2}>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}

        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Person:', name: (editItem as TeamAssignmentItem)?.teamMemberName },
              {
                label: 'Role:',
                name: (editItem as TeamAssignmentItem)?.role
              },
              {
                label: 'Project:',
                name: (editItem as TeamAssignmentItem)?.assignedProject
              }
            ]}
          />
        </Grid>

        <Grid xs={12} item>
          <DatePicker
            value={formik.values.assignmentStartDate}
            onChange={value => formik.setFieldValue('assignmentStartDate', value)}
            label="Start date"
            variant="standard"
            style={{ width: '100%' }}
            error={!!formik.errors.assignmentStartDate}
            helperText={formik.errors.assignmentStartDate as string}
          ></DatePicker>
        </Grid>

        <Grid xs={12} item>
          <DatePicker
            value={formik.values.assignmentEndDate}
            onChange={value => formik.setFieldValue('assignmentEndDate', value)}
            label="End date"
            variant="standard"
            style={{ width: '100%' }}
            error={!!formik.errors.assignmentEndDate}
            helperText={formik.errors.assignmentEndDate as string}
          ></DatePicker>
        </Grid>

        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button variant="contained" label="Save" onClick={() => formik.handleSubmit()} />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default EditTeamAssignment
