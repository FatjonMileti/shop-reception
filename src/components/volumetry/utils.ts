import dayjs from 'dayjs'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

export const handleQueryError = (error: any, message: string, showNotification: Function) => {
  showNotification({
    message: `${message} ${formatErrorMessage(error)}`,
    type: 'error'
  })
}

export const fromTaskPayload = result => ({
  ...result,
  recommendedStartHour: dayjs(result.recommendedStartHour, 'HH:mm'),
  recommendedEndHour: dayjs(result.recommendedEndHour, 'HH:mm')
})
