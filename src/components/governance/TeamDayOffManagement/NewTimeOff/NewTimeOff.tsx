import { useMemo } from 'react'
import { Button, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { useFormik } from 'formik'
import { FormInfoItems } from 'components/core-ui/FormInfoItems'
import { areSameDayDates, formatPayloadDate } from 'utils/helpers'
import { dayOfTypes, getInitialValues, getValidationSchema } from './helpers'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { TeamDayOffManagementItem, TeamMember } from '../../interfaces'

interface NewTimeOffProps {
  teamMembers?: TeamMember[]
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: TeamDayOffManagementItem | number
}

const NewTimeOff: React.FC<NewTimeOffProps> = props => {
  const { teamMembers, isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

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
        const payload = {
          teamMember: {
            id: isEdit ? (editItem as TeamDayOffManagementItem).teamMemberId : values.teamMember.value
          },
          dayOffType: values.dayOffType,
          startDate: formatPayloadDate(values.startDate),
          endDate: formatPayloadDate(values.endDate),
          ...(values.numberOfHours && { numberOfHours: values.numberOfHours })
        }

        if (isEdit) {
          await makeCorePutRequest(`/governance/teamTimeOff/${formik.values.id}`, payload)
        } else {
          await makeCorePostRequest('/governance/teamTimeOff', payload)
        }

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
      modalTitle={isEdit ? 'Edit Time Off' : 'New Time Off'}
    >
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {isEdit ? (
            <FormInfoItems
              items={[
                {
                  label: 'Person name:',
                  name: (editItem as TeamDayOffManagementItem)?.teamMemberName
                }
              ]}
            />
          ) : (
            <AsyncAutocomplete
              variant="standard"
              name="teamMember"
              label="Team member"
              options={teamMembers}
              onChange={value => formik.setFieldValue('teamMember', value)}
              value={formik.values.teamMember}
              error={!!formik.errors.teamMember}
              helperText={formik.errors.teamMember as string}
              required
            />
          )}
        </Grid>
        <Grid xs={12} item>
          <Input
            label="Type of day-off"
            type="select"
            values={dayOfTypes}
            variant="standard"
            width="100%"
            value={formik.values.dayOffType}
            onChange={event => {
              const inputValue = (event.target as HTMLInputElement).value
              formik.setFieldValue('dayOffType', inputValue)
            }}
            error={!!formik.errors.dayOffType}
            helperText={formik.errors.dayOffType as string}
            required
          />
        </Grid>

        <Grid xs={12} item>
          <DatePicker
            value={formik.values.startDate}
            onChange={value => formik.setFieldValue('startDate', value)}
            label="Start date"
            variant="standard"
            style={{ width: '100%' }}
            error={!!formik.errors.startDate}
            helperText={formik.errors.startDate as string}
            required
          />
        </Grid>
        <Grid xs={12} item>
          <DatePicker
            value={formik.values.endDate}
            onChange={value => formik.setFieldValue('endDate', value)}
            label="End date"
            variant="standard"
            style={{ width: '100%' }}
            error={!!formik.errors.endDate}
            helperText={formik.errors.endDate as string}
            required
          />
        </Grid>
        {areSameDayDates(formik.values.startDate, formik.values.endDate) && (
          <Grid item xs={12}>
            <Input
              type="number"
              name="numberOfHours"
              label="Number of hours"
              fullWidth
              variant="standard"
              value={formik.values.numberOfHours}
              onChange={event => formik.setFieldValue('numberOfHours', event.currentTarget.value)}
              error={!!formik.errors.numberOfHours}
              helperText={formik.errors.numberOfHours as string}
            />
          </Grid>
        )}
        <Grid xs={12} item className={s.modalButtons}>
          <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
          <Button
            variant="contained"
            type="submit"
            label="Submit"
            onClick={() => formik.handleSubmit()}
          />
        </Grid>
      </Grid>
    </Modal>
  )
}

export default NewTimeOff
