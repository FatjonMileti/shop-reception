import { useDispatch } from 'react-redux'
import { NotificationActions, NotificationState } from 'components/Notification/notificationSlice'

const useNotification = () => {
  const dispatch = useDispatch()

  const showNotification = (notification: NotificationState) => {
    dispatch(NotificationActions.addNotification(notification))
  }

  const clearNotification = () => {
    dispatch(NotificationActions.clearNotification())
  }

  return { showNotification, clearNotification } as const
}

export default useNotification
