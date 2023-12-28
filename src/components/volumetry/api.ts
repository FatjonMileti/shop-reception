import { makeCoreGetRequest } from 'utils/api'
import { ValueLabelInterface } from './interfaces'
import { useQuery } from 'react-query'
import { handleQueryError } from './utils'

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

export const getDepartmentsOptions = () => {
  return useQuery(
    ['departments'],
    async () => {
      const result = await makeCoreGetRequest('/volumetry/locations/departments')

      const resultOptions = result.map(
        (item): ValueLabelInterface => ({ label: item.name, value: item.name })
      )
      return resultOptions || []
    },
    {
      onError: error => handleQueryError(error, 'Error while fetching departments ')
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
