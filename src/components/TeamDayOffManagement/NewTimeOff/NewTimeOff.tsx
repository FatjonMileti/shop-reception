import { useEffect, useState } from 'react'
import { Modal } from 'components/core-ui/Modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Grid } from '@mui/material'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete2'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from 'components/core-ui/AsyncAutocomplete2/serializers'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

const NewTimeOff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState(null)

  const { showNotification } = useNotification()

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeCoreGetRequest(`/governance/teamMembers?`)

        const resultOptions = toAsyncSelectOptions(result, 'id', 'name') || []
        setTeamMembers(resultOptions)
      } catch (error) {
        showNotification({
          message: `Error while fetching dropdown data. ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    })()
  }, [])

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  const formSubmit = async values => {
    debugger
  }

  return (
    <Modal open={isModalOpen} onClose={closeModal} modalTitle="New Time Off">
      <Formik
        // props={{}}
        initialValues={{
          teamMemberName: { value: '', label: '' },
          dayOffType: '',
          startDate: '',
          endDate: '',
          numberOfHours: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          formSubmit(values).then(() => setTimeout(() => setSubmitting(false), 2000))
        }}
        validationSchema={Yup.object().shape({
          teamMemberName: Yup.object().shape({
            label: Yup.string().required('Team member is required'),
            value: Yup.string().required('Team member is required')
          }),
          dayOffType: Yup.object().shape({
            label: Yup.string().required('Day-off type is required'),
            value: Yup.string().required('Day-off type is required')
          }),
          startDate: Yup.date().required('Start date is required'),
          endDate: Yup.date().required('End date is required'),
          numberOfHours: Yup.number()
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          } = props
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid xs={12} md={3} item>
                  <AsyncAutocomplete
                    variant="standard"
                    name="teamMemberName"
                    label="Team member"
                    options={[]}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    value={values.teamMemberName}
                    // disabled={isSubmitting}
                  />
                </Grid>
              </Grid>
            </form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default NewTimeOff
