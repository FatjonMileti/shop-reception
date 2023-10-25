import { Modal } from 'components/core-ui/Modal'
import { Form, Formik } from 'formik'
import { Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { Button } from '@fullscreendigital/carrefour-dex-fe'
import s from 'components/core-ui/Modal/Modal.modules.scss'
import { FormInfoItems } from '../FormInfoItems'

const initialValues = {
  teamMember: { value: '', label: '' },
  dayOffType: '',
  startDate: '',
  endDate: '',
  numberOfHours: ''
}

const NewTimeOff = props => {
  const { teamMembers, isModalOpen, closeModal, isEdit, editItem } = props

  const formSubmit = async values => {
    console.log(values)
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
        // validationSchema={Yup.object().shape({
        //   teamMember: Yup.object().shape({
        //     label: Yup.string().required('Team member is required'),
        //     value: Yup.string().required('Team member is required')
        //   }),
        //   dayOffType: Yup.object().shape({
        //     label: Yup.string().required('Day-off type is required'),
        //     value: Yup.string().required('Day-off type is required')
        //   }),
        //   startDate: Yup.date().required('Start date is required'),
        //   endDate: Yup.date().required('End date is required'),
        //   numberOfHours: Yup.number()
        // })}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid xs={12} item>
                {isEdit ? (
                  <FormInfoItems
                    items={[{ label: 'Person name:', name: editItem.teamMemberName }]}
                  />
                ) : (
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
                )}
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
