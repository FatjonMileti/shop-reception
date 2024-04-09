import * as yup from 'yup'

export const getCapsuleColor = (isTaskStarted, isTaskEnded, isOverdue) => {
  if (isOverdue) {
    return { label: 'rgba(211, 13, 31, 0.15)', value: '#D30D1F', progress: 'error' }
  }

  if (!isTaskStarted && !isTaskEnded) {
    return { label: 'rgba(69, 69, 69, 0.15)', value: '#454545' }
  }

  if (isTaskStarted && !isTaskEnded) {
    return { label: 'rgba(51, 105, 30, 0.15)', value: '#33691E', progress: 'success' }
  }

  return { label: '', value: '' }
}

export const getEmployeeGroupName = groupBy => {
  switch (groupBy) {
    case 'ON_SHIFT':
      return 'Angajati pe tura'
    case 'OFF_SHIFT':
      return 'Angajati care nu sunt pe tura'
    case 'COLLABORATOR':
      return 'Colaboratori'
    default:
      return ''
  }
}

export const PriorityColors = [
  {
    value: '#D30D1F',
    label: '#f8dbdd'
  },
  {
    value: '#ff9900',
    label: '#fff4d9'
  },
  {
    value: '#33691e',
    label: '#e0e9dd'
  }
]

export const getValidationSchema = minDivision =>
  yup.object({
    workerId: yup.number().required('Acest camp este obligatoriu.'),
    taskTemplateId: yup.number().required('Acest camp este obligatoriu.'),
    allocatedWorkload: yup
      .number()
      .required('Acest camp este obligatoriu.')
      .test(
        'isCustomStep',
        `Valoarea trebuie să fie multiplu de ${minDivision}`,
        allocatedWorkload =>
          !Number.isNaN(allocatedWorkload) && parseFloat(`${allocatedWorkload}`) % minDivision === 0
      )
  })
