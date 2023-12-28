import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

export const handleQueryError = (error: any, message: string) => {
  const { showNotification } = useNotification()

  showNotification({
    message: `${message} ${formatErrorMessage(error)}`,
    type: 'error'
  })
}
