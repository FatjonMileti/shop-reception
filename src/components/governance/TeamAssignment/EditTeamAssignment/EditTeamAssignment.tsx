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
import { TeamAssignmentItem } from '../../interfaces'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { toTeamAssignmentPayload } from './serializers'
dayjs.extend(customParseFormat)

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
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: {
      id: (editItem as TeamAssignmentItem)?.id || 0,
      assignedProject: (editItem as TeamAssignmentItem)?.assignedProject || '',
      assignmentEndDate: dayjs((editItem as TeamAssignmentItem)?.assignmentEndDate, 'DD/MM/YYYY'),
      assignmentStartDate: dayjs(
        (editItem as TeamAssignmentItem)?.assignmentStartDate,
        'DD/MM/YYYY'
      ),
      iibKey: (editItem as TeamAssignmentItem)?.iibKey || '',
      ipbKey: (editItem as TeamAssignmentItem)?.ipbKey || '',
      role: (editItem as TeamAssignmentItem)?.role || '',
      teamMemberName: (editItem as TeamAssignmentItem)?.teamMemberName || ''
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
