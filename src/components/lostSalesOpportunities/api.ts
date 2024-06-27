import { useQuery } from 'react-query'
import { makeCoreGetRequest } from 'utils/api'
import { toFeedbackReasonsOptions, toSnoozeOptions } from './serializers'
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

export const getFeedbackReasonsOptions = (showNotification: Function) => {
  return useQuery(
    ['feedbackReasonsOptions'],
    async () => {
      const result = await makeCoreGetRequest('/lso/feedback-reasons')
      const resultOptions = toFeedbackReasonsOptions(result)

      return resultOptions || []
    },
    {
      onError: error =>
        handleQueryError(
          error,
          'A aparut o eroare la preluarea datelor de optiuni pentru motivele de feedback.',
          showNotification
        )
    }
  )
}
