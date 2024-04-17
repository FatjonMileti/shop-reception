import * as yup from 'yup'

export const getFormInitialValues = (editItem, hideWorkload, isStop) => ({
  ...(!hideWorkload && {
    allocatedWorkload: editItem?.allocatedWorkload || ''
  }),
  ...(isStop && {
    performedWorkload: editItem?.performedWorkload || editItem?.allocatedWorkload || ''
  }),
  comment: editItem?.comment || ''
})

export const validationSchema = (hideWorkload, minDivision, isStop) =>
  yup.object({
    allocatedWorkload: hideWorkload
      ? yup.string().nullable()
      : yup
          .number()
          .required('Acest camp este obligatoriu.')
          .test(
            'isCustomStep',
            `Valoarea trebuie să fie multiplu de ${minDivision}`,
            allocatedWorkload =>
              !Number.isNaN(allocatedWorkload) &&
              parseFloat(`${allocatedWorkload}`) % minDivision === 0
          ),
    performedWorkload: isStop
      ? yup
          .number()
          .required('Acest camp este obligatoriu.')
          .test(
            'isCustomStep',
            `Valoarea trebuie să fie multiplu de ${minDivision}`,
            allocatedWorkload =>
              !Number.isNaN(allocatedWorkload) &&
              parseFloat(`${allocatedWorkload}`) % minDivision === 0
          )
      : yup.string().nullable(),
    comment: yup.string()
  })
