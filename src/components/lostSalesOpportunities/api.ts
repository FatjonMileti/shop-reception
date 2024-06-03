import { ValueLabelInterface } from 'components/governance/interfaces'
import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { toSnoozeOptions } from './serializers'
import { handleQueryError } from 'utils/helpers'

export const getSnoozeOptions = (showNotification: Function) => {
  return useQuery(
    ['snoozeOptions'],
    async () => {
      const result = await makeCoreGetRequest('/lso/snooze-options')
      const resultOptions = toSnoozeOptions(result)

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la preluarea datelor de optiuni pentru optinuile de amanare alarma.',
          showNotification
        )
    }
  )
}

export const getAlertDetails = (id: string, showNotification: Function) => {
  return useQuery(
    ['alertDetails'],
    async () => {
      const response = await makeCoreGetRequest(`/lso/alerts/${id}`)
      debugger
      return response
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la preluarea detaliilor alertei.',
          showNotification
        )
    }
  )
}
