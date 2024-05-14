import { makeCoreGetRequest } from 'utils/api'
import { ValueLabelInterface } from './interfaces'
import { useQuery } from 'react-query'
import { toEmployeeFilterItems, toEmployeesAttendance } from './TaskAllocations/serializers'
import { fromTaskPayload } from './utils'
import { toDepartmentAliasesOptions, toDepartmentsOptions, toRegionsOptions } from './serializers'
import { handleQueryError } from 'utils/helpers'

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

export const getDepartmentAliasesOptions = (
  showNotification: Function,
  setDefaultOptionCallback?: (defaultValue: ValueLabelInterface) => void,
  filter?: { filterBy: string; filterValue: string | boolean | number }
) => {
  return useQuery(
    ['departments'],
    async () => {
      let url = '/volumetry/locations/department-aliases'

      if (filter) {
        url = `${url}?filterBy=${filter.filterBy}&filterValue=${filter.filterValue}`
      }

      const result = await makeCoreGetRequest(url)
      const resultOptions = toDepartmentAliasesOptions(result)

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

export const getCollaboratorsTypesOptions = (showNotification: Function) => {
  return useQuery(
    ['contractors-types'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/workers/contractors/types')
      const resultOptions = result.map(
        (item: { id: number; description: string }): ValueLabelInterface => ({
          label: item.description,
          value: item.id
        })
      )

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(error, 'Error while fetching contractors types', showNotification)
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
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea listei magazinelor.',
          showNotification
        )
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

export const getTask = (
  itemId: string | number,
  isModalOpen: boolean,
  showNotification: Function
) => {
  return useQuery(
    ['task', itemId],
    async () => {
      if (itemId && isModalOpen) {
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

export const getCategoriesOptions = (
  showNotification: Function,
  locationFilterId?: number | string
) => {
  return useQuery(
    ['categories', locationFilterId],
    async () => {
      let url = '/volumetry/locations/categories/summary'
      if (locationFilterId) {
        url = `${url}?filterBy=locationId&filterValue=${locationFilterId}`
      }
      const result = await makeCoreGetRequest(url)

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
        value: priority.id,
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
        value: frequency.key,
        label: frequency.value
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
        value: unit.id,
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
      const result = await makeCoreGetRequest('/volumetry/task-templates/work-volume-sources')

      const resultOptions = result.map(workVolume => ({
        value: workVolume.id,
        label: workVolume.shortDescription
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
      const result = await makeCoreGetRequest(
        `/volumetry/locations/department-aliases?filterBy=categoryId&filterValue=${categoryId}`
      )

      const resultOptions = result.map(department => ({
        value: department.id,
        label: department.alias
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

export const getEmployeesOptions = (showNotification: Function, validateQuery: boolean = true) => {
  return useQuery(
    ['employees-options'],
    async () => {
      const employees = await makeCoreGetRequest('/volumetry/workers-schedule')
      return toEmployeeFilterItems(employees) || []
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea angajatilor.', showNotification),

      enabled: validateQuery
    }
  )
}

export const getEmployeesAttendance = (
  departmentId: number | string,
  showNotification: Function,
  validateQuery: boolean = true,
  setEmployees: Function
) =>
  useQuery(
    ['employees-attendance', departmentId],
    async () => {
      const employees = await makeCoreGetRequest(
        `/volumetry/workers-schedule?filterBy=departmentAliasId&filterValue=${departmentId}`
      )
      const employeesAttendance = toEmployeesAttendance(employees) || []
      setEmployees(employeesAttendance)
    },
    {
      onError: error =>
        handleQueryError(error, 'A aparut o eroare la obtinerea angajatilor.', showNotification),

      enabled: validateQuery
    }
  )

export const getLocationDetails = (
  locationId: number | string,
  showNotification: Function,
  validateQuery: boolean = true
) => {
  return useQuery(
    ['location-details', locationId],
    async () => {
      const response = await makeCoreGetRequest(`/volumetry/locations`)
      const location = response.list.filter(location => location.id === locationId)

      const locationDetails = {
        id: 1,
        name: location[0]?.locationName || '',
        categoryId: location[0]?.id || '',
        categoryName: location[0]?.locationCategory || '',
        regionId: 0,
        regionName: '0'
      }

      return locationDetails
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea detaliilor locatiei.',
          showNotification
        ),

      enabled: validateQuery
    }
  )
}

export const getRegionsOptions = (
  showNotification: Function,
  locationFilterId?: number | string
) => {
  return useQuery(
    ['regions', locationFilterId],
    async () => {
      let url = '/volumetry/regions'
      if (locationFilterId) {
        url = `${url}?filterBy=locationId&filterValue=${locationFilterId}`
      }
      // const result = await makeCoreGetRequest(url)
      const result = [
        { id: 1, name: 'Bucuresti' },
        { id: 2, name: 'Cluj' }
      ]
      const resultOptions = toRegionsOptions(result)
      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la preluarea datelor de optiuni pentru regiuni.',
          showNotification
        )
    }
  )
}

export const getCollaborator = (
  itemId: string | number,
  showNotification: Function,
  isModalOpen: boolean,
) => {
  return useQuery(
    ['collaborator', itemId],
    async () => {
      if (itemId && isModalOpen) {
        const result = await makeCoreGetRequest(`/volumetry/workers/contractors/${itemId}`)

        return result
      }
      return null
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la obtinerea detaliilor colaboratorului.',
          showNotification
        )
    }
  )
}
