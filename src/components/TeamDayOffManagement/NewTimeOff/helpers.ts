import dayjs from 'dayjs'
import { formatUIDate } from 'utils/helpers'
import * as Yup from 'yup'

export const dayOfTypes = [
  {
    value: 'Public Holiday',
    label: 'Public Holiday'
  },
  {
    value: 'Day-Off',
    label: 'Day-Off'
  },
  {
    value: 'Team Event',
    label: 'Team Event'
  }
]

export const getValidationSchema = editItem =>
  Yup.object().shape({
    editTeamMember: Yup.boolean(),
    teamMember: editItem
      ? Yup.string()
      : Yup.object().shape({
          label: Yup.string().required('Team member is required'),
          value: Yup.string().required('Team member is required')
        }),
    dayOffType: Yup.string().required('Day-off type is required'),
    startDate: Yup.date()
      .required('Start date is required')
      .typeError('Invalid date format')
      .test(
        'startBeforeEnd',
        'Start date must be before or same to end date',
        function (startDate) {
          const endDate = this.resolve(Yup.ref('endDate'))
          if (!startDate || !endDate) {
            return true // Allow empty values, validation handled by 'required'
          }
          return startDate <= endDate
        }
      ),
    endDate: Yup.date()
      .required('End date is required')
      .typeError('Invalid date format')
      .when('startDate', (endDate, schema) =>
        !isNaN(Date.parse(endDate[0]))
          ? schema.min(endDate, 'End date must be after or same to Start date')
          : schema
      )
    // numberOfHours: Yup.string().when({
    //   is: (exists: string) => !!exists,
    //   then: rule =>
    //     rule.test(
    //       'validate_hours',
    //       'hours is invalid',
    //       numberOfHours => parseInt(numberOfHours) >= 1
    //     )
    // })
    // numberOfHours: Yup.number().min(1).max(8)
  })

export const getInitialValues = editItem =>
  editItem
    ? {
        teamMember: editItem.teamMemberName,
        dayOffType: editItem.dayOffType,
        startDate: formatUIDate(editItem.startDate),
        endDate: formatUIDate(editItem.endDate),
        numberOfHours: editItem.numberOfHours
      }
    : {
        teamMember: null, // {value: '', label: ''}
        dayOffType: '',
        startDate: dayjs(),
        endDate: dayjs(),
        numberOfHours: null
      }
