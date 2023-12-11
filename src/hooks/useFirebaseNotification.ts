import { useDispatch } from 'react-redux'
import {
  FirebaseNotificationActions,
  FirebaseNotificationState
} from 'reducers/firebaseNotificationSlice'

const useFirebaseNotification = () => {
  const dispatch = useDispatch()

  const showFirebaseNotification = (notification: FirebaseNotificationState) => {
    dispatch(FirebaseNotificationActions.addNotification(notification))
  }

  const clearFirebaseNotification = () => {
    dispatch(FirebaseNotificationActions.clearNotification())
  }

  return { showFirebaseNotification, clearFirebaseNotification } as const
}

export default useFirebaseNotification
