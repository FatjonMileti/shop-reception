import { Button, DatePicker } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { Modal } from 'components/core-ui/Modal'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  teamMember: { value: '', label: '' },
  dayOffType: '',
  startDate: new Date(),
  endDate: new Date(),
  numberOfHours: ''
}

const validationSchema = Yup.object().shape({
  teamMember: Yup.object().shape({
    label: Yup.string().required('Team member is required'),
    value: Yup.string().required('Team member is required')
  }),
  // dayOffType: Yup.object().shape({
  //   label: Yup.string().required('Day-off type is required'),
  //   value: Yup.string().required('Day-off type is required')
  // }),
  startDate: Yup.date().required('Start date is required').typeError('Invalid date format'),
  endDate: Yup.date()
    .required('End date is required')
    .typeError('Invalid date format')
    .when('startDate', (startDate, schema) =>
      !isNaN(Date.parse(startDate[0]))
        ? schema.min(startDate, 'End date must be after start date')
        : schema
    )
  // numberOfHours: Yup.number()
})

const NewTimeOff = props => {
  const { teamMembers, isModalOpen, closeModal, isEdit, editItem } = props

  const formSubmit = async values => {
    const startDate = dayjs(new Date(values.startDate)).format('YYYY-MM-DD')
    // On yup validation the value stored on schema is malformed when an invalid end date was selected
    const endDate = dayjs(new Date(values.endDate['$d'] || values.endDate)).format('YYYY-MM-DD')
    // console.log(values.endDate)
    console.log({ ...values, startDate, endDate })
  }

  const mapStringDate = (dateAsString: string): Date => {
    const components = dateAsString.split('/')
    const date = new Date()
    date.setDate(Number(components[0]))
    date.setMonth(Number(components[1]) - 1)
    date.setFullYear(Number(components[2]))
    return date
  }

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
        {({ handleChange, errors, values, setFieldValue }) => (
          <Form>
            <Grid container spacing={4}>
              {isEdit ? (
                <div>{editItem.teamMemberName}</div>
              ) : (
                <>
                  <Grid xs={12} item>
                    <AsyncAutocomplete
                      variant="standard"
                      name="teamMember"
                      label="Team member"
                      options={teamMembers}
                      onChange={value =>
                        setFieldValue('teamMember', value ?? { value: '', label: '' })
                      }
                      // onBlur={handleBlur}
                      value={values.teamMember}
                      // disabled={isSubmitting}
                    />
                  </Grid>
                </>
              )}
              <Grid xs={12} item>
                <DatePicker
                  value={editItem?.startDate ? mapStringDate(editItem.startDate) : values.startDate}
                  onChange={value => setFieldValue('startDate', value)}
                  label="Start date"
                  error={!!errors.startDate}
                  helperText={errors.startDate as string}
                ></DatePicker>
              </Grid>
              <Grid xs={12} item>
                <DatePicker
                  value={editItem?.endDate ? mapStringDate(editItem.endDate) : values.endDate}
                  onChange={value => setFieldValue('endDate', value)}
                  label="End date"
                  error={!!errors.endDate}
                  helperText={errors.endDate as string}
                ></DatePicker>
              </Grid>

              <Grid xs={12} item className={s.modalButtons}>
                <Button variant="outlined" label="Cancel" onClick={closeModal} />
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
