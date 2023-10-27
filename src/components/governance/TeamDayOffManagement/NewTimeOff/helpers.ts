import dayjs from 'dayjs'
import { areSameDayDates, formatUIDate } from 'utils/helpers'
import customParseFormat from 'dayjs/plugin/customParseFormat'
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
      ),
    numberOfHours: Yup.mixed()
      .nullable()
      .when(['startDate', 'endDate'], (data, schema) => {
        if (areSameDayDates(data[0], data[1])) {
          return Yup.number()
            .required('Number of hours is required when start date and end date are same')
            .min(1)
            .max(8)
        }
        return schema
      })
  })

export const getInitialValues = editItem => {
  dayjs.extend(customParseFormat)

  return editItem
    ? {
        id: editItem.id,
        teamMember: editItem.teamMemberName,
        dayOffType: editItem.dayOffType,
        startDate: dayjs(editItem.startDate, 'DD/MM/YYYY'),
        endDate: dayjs(editItem.endDate, 'DD/MM/YYYY'),
        numberOfHours: editItem.numberOfHours
      }
    : {
        teamMember: null, // {value: '', label: ''}
        dayOffType: '',
        startDate: dayjs(),
        endDate: dayjs(),
        numberOfHours: null
      }
}
