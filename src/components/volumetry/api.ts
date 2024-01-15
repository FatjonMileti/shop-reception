import { makeCoreGetRequest } from 'utils/api'
import { ValueLabelInterface } from './interfaces'
import { useQuery } from 'react-query'
import { fromTaskPayload, handleQueryError } from './utils'
import { toEmployeeFilterItems } from './TaskAllocation/serializers'
import { toDepartmentsOptions } from './serializers'

export const getDepartmentsOptions = (
  showNotification: Function,
  setDefaultOptionCallback?: (defaultValue: ValueLabelInterface) => void
) => {
  return useQuery(
    ['departments'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/locations/generic-departments')
      const resultOptions = toDepartmentsOptions(result)

      if (resultOptions?.length && !!setDefaultOptionCallback) {
        setDefaultOptionCallback(resultOptions[0])
      }

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la preluarea datelor de optiuni pentru departamente.',
          showNotification
        )
    }
  )
}

export const getJobTitlesOptions = (showNotification: Function) => {
  return useQuery(
    ['job-titles'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/workers/job-titles')
      const resultOptions = result.map(
        (item: { id: number; title: string }): ValueLabelInterface => ({
          label: item.title,
          value: item.id
        })
      )

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'Error while fetching job titles', showNotification)
    }
  )
}

export const getLocationsOptions = (
  showNotification: Function,
  setLocationsFilterValue: Function,
  canUseCustomFilter: boolean
) => {
  return useQuery(
    ['locations'],
    async () => {
      if (canUseCustomFilter) {
        const result = await makeCoreGetRequest('/volumetry/locations/summary')
        const resultOptions = result.map(
          (item: { id: number; name: string }): ValueLabelInterface => ({
            label: item.name,
            value: item.id
          })
        )
        if (resultOptions) {
          setLocationsFilterValue(resultOptions[0])
        }

        return resultOptions || []
      }

      return []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea listei magazinelor.', showNotification)
    }
  )
}

export const getContractorsNamesOptions = (showNotification: Function) => {
  return useQuery(
    ['contractors-names'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/workers/contractors')

      const resultOptions = result.list.map(
        (item): ValueLabelInterface => ({ label: item.fullName, value: item.id })
      )

      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'Error while fetching employees ', showNotification)
    }
  )
}

export const getTask = (itemId: string | number, showNotification: Function) => {
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
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea detaliilor taskului.',
          showNotification
        )
    }
  )
}

export const getCategoriesOptions = (showNotification: Function) => {
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
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea categoriilor.', showNotification)
    }
  )
}

export const getPrioritiesOptions = (showNotification: Function) => {
  return useQuery(
    ['priority'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/task-templates/priorities')

      const resultOptions = result.map(priority => ({
        value: priority.value,
        label: priority.value
      }))

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea prioritatilor.', showNotification)
    }
  )
}

export const getFrequencyOptions = (showNotification: Function) => {
  return useQuery(
    ['frequency'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/task-templates/frequencies')

      const resultOptions = result.map(frequency => ({
        value: frequency,
        label: frequency
      }))

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea frecventelor.', showNotification)
    }
  )
}

export const getMeasurementUnitsOptions = (showNotification: Function) => {
  return useQuery(
    ['measurement-units'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/task-templates/measurement-units')

      const resultOptions = result.map(unit => ({
        value: unit.name,
        label: unit.name
      }))

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea unitatilor de masura.',
          showNotification
        )
    }
  )
}

export const getWorkVolumesOptions = (showNotification: Function) => {
  return useQuery(
    ['work-volumes'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/work-volumes')

      const resultOptions = result.list.map(workVolume => ({
        value: workVolume.measurementUnit,
        label: workVolume.measurementUnit
      }))

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea rapoartelor de volum de lucru.',
          showNotification
        )
    }
  )
}

export const getCategoryDepartmentsOptions = (
  categoryId: number,
  shouldFetchDepartments: boolean,
  showNotification: Function
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
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea departamentelor.',
          showNotification
        ),
      enabled: shouldFetchDepartments
    }
  )
}

export const getRaionsOptions = (
  departmentId: number,
  shouldFetchRaions: boolean,
  callback: Function,
  showNotification: Function
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
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea raioanelor.', showNotification),
      enabled: shouldFetchRaions
    }
  )
}

export const getEmployeesOptions = (showNotification: Function, validateQuery: boolean = true) => {
  return useQuery(
    ['employees-options'],
    async () => {
      const employees = await makeCoreGetRequest('/volumetry/workers/employees/shifts')
      return toEmployeeFilterItems(employees) || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea angajatilor.', showNotification),

      enabled: validateQuery
    }
  )
}
