import { useMemo } from 'react'
import { Button, DatePicker, Input } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { Form, Formik } from 'formik'
import { FormInfoItems } from '../FormInfoItems'
import { Item, TeamMember, TimeOffValues } from '../interfaces'
import { areSameDayDates } from 'utils/helpers'
import { dayOfTypes, getInitialValues, getValidationSchema } from './helpers'
import { makeCorePostRequest, makeCorePutRequest } from 'utils/api'
import { toTimeOffPayload } from './serializers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

interface NewTimeOffProps {
  teamMembers?: TeamMember[]
  isModalOpen: boolean
  closeModal: Function
  setShouldRefreshData: Function
  isEdit?: boolean
  editItem?: Item
}

const NewTimeOff: React.FC<NewTimeOffProps> = props => {
  const { teamMembers, isModalOpen, closeModal, isEdit, editItem, setShouldRefreshData } = props

  const { showNotification } = useNotification()

  const formSubmit = async (values: TimeOffValues) => {
    try {
      const payload = toTimeOffPayload(values, editItem)

      if (isEdit) {
        makeCorePutRequest(`/governance/teamTimeOff/${editItem.id}`, payload)
      } else {
        makeCorePostRequest('/governance/teamTimeOff', payload)
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

  const initialValues = useMemo(() => getInitialValues(editItem), [editItem])

  const validationSchema = useMemo(() => getValidationSchema(editItem), [editItem])

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      modalTitle={isEdit ? 'Edit Time Off' : 'New Time Off'}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={formSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, setFieldValue, errors }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid xs={12} item>
                {isEdit ? (
                  <FormInfoItems
                    items={[{ label: 'Person name:', name: (editItem as Item)?.teamMemberName }]}
                  />
                ) : (
                  <AsyncAutocomplete
                    variant="standard"
                    name="teamMember"
                    label="Team member"
                    options={teamMembers}
                    onChange={value => setFieldValue('teamMember', value)}
                    value={values.teamMember}
                    error={!!errors.teamMember}
                    helperText={errors.teamMember as string}
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
                  value={values.dayOffType}
                  onChange={event => {
                    const inputValue = (event.target as HTMLInputElement).value
                    setFieldValue('dayOffType', inputValue)
                  }}
                  error={!!errors.dayOffType}
                  helperText={errors.dayOffType as string}
                  required
                />
              </Grid>

              <Grid xs={12} item>
                <DatePicker
                  value={values.startDate}
                  onChange={value => setFieldValue('startDate', value)}
                  label="Start date"
                  variant="standard"
                  style={{ width: '100%' }}
                  error={!!errors.startDate}
                  helperText={errors.startDate as string}
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <DatePicker
                  value={values.endDate}
                  onChange={value => setFieldValue('endDate', value)}
                  label="End date"
                  variant="standard"
                  style={{ width: '100%' }}
                  error={!!errors.endDate}
                  helperText={errors.endDate as string}
                  required
                />
              </Grid>
              {areSameDayDates(values.startDate, values.endDate) && (
                <Grid item xs={12}>
                  <Input
                    type="number"
                    name="numberOfHours"
                    label="Number of hours"
                    fullWidth
                    variant="standard"
                    value={values.numberOfHours}
                    onChange={event => setFieldValue('numberOfHours', event.currentTarget.value)}
                    error={!!errors.numberOfHours}
                    helperText={errors.numberOfHours as string}
                  />
                </Grid>
              )}
              <Grid xs={12} item className={s.modalButtons}>
                <Button variant="outlined" label="Cancel" onClick={() => closeModal()} />
                <Button variant="contained" type="submit" label="Submit" />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default NewTimeOff
