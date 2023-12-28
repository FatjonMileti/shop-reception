import { Modal } from 'components/core-ui/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { Button, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useNotification } from 'hooks'
import { useFormik } from 'formik'
import { validationSchema } from './helpers'
import { makeCorePutRequest } from 'utils/api'
import { useMutation } from 'react-query'
import { formatErrorMessage } from 'utils/formatting'
import { TeamAssignmentItem } from '../../interfaces'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { toTeamAssignmentPayload } from './serializers'
import { getDatePickerDate } from 'utils/helpers'

interface EditTeamAssignmentProps {
  isModalOpen: boolean
  closeModal: Function
  editItem: TeamAssignmentItem | number
  setShouldRefreshData: Function
}

const EditTeamAssignment: React.FC<EditTeamAssignmentProps> = props => {
  const { isModalOpen, closeModal, editItem, setShouldRefreshData } = props
  const { showNotification } = useNotification()

  const editTeamAssignment = async values => {
    await makeCorePutRequest(
      `/governance/teamAssignments/${(editItem as TeamAssignmentItem)?.id}`,
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

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      id: (editItem as TeamAssignmentItem)?.id || 0,
      assignmentEndDate: getDatePickerDate((editItem as TeamAssignmentItem)?.assignmentEndDate),
      assignmentStartDate: getDatePickerDate(
        (editItem as TeamAssignmentItem)?.assignmentStartDate
      )
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      mutate(toTeamAssignmentPayload(values, editItem))
    }
  })

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} modalTitle={'Edit'}>
      <Grid container spacing={4}>
        {isLoading && (
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        )}

        <Grid xs={12} item>
          <FormInfoItems
            items={[
              { label: 'Person:', name: editItem['teamMember.name']},
              {
                label: 'Role:',
                name: (editItem as TeamAssignmentItem)?.role
              },
              {
                label: 'Project:',
                name: editItem['project.name']
              }
            ]}
          />
        </Grid>

        <Grid xs={12} item>
          <DatePicker
            value={formik.values.assignmentStartDate}
            onChange={value => formik.setFieldValue('assignmentStartDate', value)}
            label="Start date"
            variant="outlined"
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
            variant="outlined"
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
