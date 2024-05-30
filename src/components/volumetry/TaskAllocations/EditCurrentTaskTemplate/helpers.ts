import * as yup from 'yup'

export const getValidationSchema = minDivision =>
  yup.object({
    id: yup.string().nonNullable(),
    workload: yup
      .number()
      .required('Acest camp este obligatoriu.')
      .test(
        'isCustomStep',
        `Valoarea trebuie să fie multiplu de ${minDivision}`,
        allocatedWorkload =>
          !Number.isNaN(allocatedWorkload) && parseFloat(`${allocatedWorkload}`) % minDivision === 0
      ),
    allocatedWorkersNumber: yup.number()
  })
