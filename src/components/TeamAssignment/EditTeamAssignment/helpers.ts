import * as yup from 'yup'

export const validationSchema =
  yup.object({
    id: yup.string().nonNullable(),
    teamMemberName: yup.string().nonNullable(),
    role: yup.string().nonNullable(),
    iibKey: yup.string().nonNullable(),
    ipbKey: yup.string().nonNullable(),
    assignedProject: yup.string().nonNullable(),
    assignmentStartDate: yup
      .date()
      .required('Start date is required')
      .typeError('Invalid date format')
      .test(
        'startBeforeEnd',
        'Start date must be before or same to end date',
        function (startDate) {
          const endDate = this.resolve(yup.ref('assignmentEndDate'))
          if (!startDate || !endDate) {
            return true // Allow empty values, validation handled by 'required'
          }
          return startDate <= endDate
        }
      ),
    assignmentEndDate: yup
      .date()
      .required('End date is required')
      .typeError('Invalid date format')
      .when('assignmentStartDate', (endDate, schema) =>
        !isNaN(Date.parse(endDate[0]))
          ? schema.min(endDate, 'End date must be after or same to Start date')
          : schema
      )
  })
