import { makeCoreGetRequest } from 'utils/api'
import { ValueLabelInterface } from './interfaces'
import { useQuery } from 'react-query'
import { fromTaskPayload, handleQueryError } from './utils'
import { toEmployeeFilterItems } from './TaskAllocation/serializers'

export const getEmployeeNamesOptions = () => {
  return useQuery(
    ['employees-name'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/workers/employees')

      const resultOptions = result.list.map(
        (item): ValueLabelInterface => ({ label: item.fullName, value: item.fullName })
      )

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'Error while fetching employees ')
    }
  )
}

export const getDepartmentsOptions = (
  setDefaultOptionCallback?: (defaultValue: ValueLabelInterface) => void
) => {
  return useQuery(
    ['departments'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/locations/departments')

      const resultOptions = result.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )

      if (resultOptions?.length && !!setDefaultOptionCallback) {
        setDefaultOptionCallback(resultOptions[0])
      }

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la preluarea datelor de optiuni pentru departamente.'
        )
    }
  )
}

export const getJobTitlesOptions = () => {
  return useQuery(
    ['job-titles'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/workers/jobTitles')
      const resultOptions = result.list.map(
        (item: { id: number; jobTitle: string }): ValueLabelInterface => ({
          label: item.jobTitle,
          value: item.jobTitle
        })
      )

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'Error while fetching job titles')
    }
  )
}

export const getContractorsNamesOptions = () => {
  return useQuery(
    ['contractors-names'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/workers/contractors')

      const resultOptions = result.list.map(
        (item): ValueLabelInterface => ({ label: item.fullName, value: item.fullName })
      )

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'Error while fetching employees ')
    }
  )
}

export const getTask = (itemId: string | number) => {
  return useQuery(
    ['task', itemId],
    async () => {
      if (itemId) {
        const result = await makeCoreGetRequest(`/volumetry/task-templates/${itemId}`)

        return fromTaskPayload(result) || null
      }
      return null
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea detaliilor taskului.')
    }
  )
}

export const getCategoriesOptions = () => {
  return useQuery(
    ['categories'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/locations/categories')

      const resultOptions = result.map(category => ({
        value: category.id,
        label: category.category
      }))

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'A aparut o eroare la obtinerea categoriilor.')
    }
  )
}

export const getPrioritiesOptions = () => {
  return useQuery(
    ['priority'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/task-templatess/priorities')

      const resultOptions = result.map(priority => ({
        value: priority.value,
        label: priority.value
      }))

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'A aparut o eroare la obtinerea prioritatilor.')
    }
  )
}

export const getFrequencyOptions = () => {
  return useQuery(
    ['frequency'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/task-templatess/frequencies')

      const resultOptions = result.map(frequency => ({
        value: frequency,
        label: frequency
      }))

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'A aparut o eroare la obtinerea frecventelor.')
    }
  )
}

export const getMeasurementUnitsOptions = () => {
  return useQuery(
    ['measurement-units'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/task-templatess/measurement-units')

      const resultOptions = result.map(unit => ({
        value: unit.name,
        label: unit.name
      }))

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea unitatilor de masura.')
    }
  )
}

export const getWorkVolumesOptions = () => {
  return useQuery(
    ['work-volumes'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/reports/work-volumes')

      const resultOptions = result.list.map(workVolume => ({
        value: workVolume.measurementUnit,
        label: workVolume.measurementUnit
      }))

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea rapoartelor de volum de lucru.')
    }
  )
}

export const getCategoryDepartmentsOptions = (
  categoryId: number,
  shouldFetchDepartments: boolean
) => {
  return useQuery(
    ['category-departments', categoryId],
    async () => {
      const result = await makeCoreGetRequest(`/volumetry/locations/departments/${categoryId}`)

      const resultOptions = result.map(department => ({
        value: department.id,
        label: department.name
      }))

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'A aparut o eroare la obtinerea departamentelor.'),
      enabled: shouldFetchDepartments
    }
  )
}

export const getRaionsOptions = (
  departmentId: number,
  shouldFetchRaions: boolean,
  callback: Function
) => {
  return useQuery(
    ['raions', departmentId],
    async () => {
      const result = await makeCoreGetRequest(`/volumetry/locations/raions/${departmentId}`)

      const resultOptions = result.map(raion => ({
        value: raion.id,
        label: raion.name
      }))

      callback(resultOptions)
      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'A aparut o eroare la obtinerea raioanelor.'),
      enabled: shouldFetchRaions
    }
  )
}

export const getEmployeesOptions = () => {
  return useQuery(
    ['employees-options'],
    async () => {
      const employees = await makeCoreGetRequest('/volumetry/workers/employees')
      const shifts = await makeCoreGetRequest('/volumetry/workers/employees/shifts')

      const employeesWithShifts = employees.list.map(employee => {
        const matchingShift = shifts.find(shift => shift.fullName === employee.fullName)

        if (matchingShift) {
          return {
            ...employee,
            shiftCategory: matchingShift.shiftCategory
          }
        }

        return employee
      })

      return toEmployeeFilterItems(employeesWithShifts) || []
    },
    {
      onError: error => handleQueryError(error, 'A aparut o eroare la obtinerea angajatilor.')
    }
  )
}
