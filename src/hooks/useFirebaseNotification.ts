import { useDispatch } from 'react-redux'
import {
  FirebaseNotificationActions,
  FirebaseNotificationState
} from 'reducers/firebaseNotificationSlice'
import { onMessageListener } from 'utils/firebase'

const useFirebaseNotification = () => {
  const dispatch = useDispatch()

  onMessageListener()
    .then((payload: any) => {
      if (payload) {
        showFirebaseNotification({
          title: payload.notification?.title,
          message: payload.notification?.body,
          link: payload.fcmOptions?.link
        })
      }
    })
    .catch(err => console.log('failed: ', err))

  const showFirebaseNotification = (notification: FirebaseNotificationState) => {
    dispatch(FirebaseNotificationActions.addNotification(notification))
  }

  const clearFirebaseNotification = () => {
    dispatch(FirebaseNotificationActions.clearNotification())
  }

  return { showFirebaseNotification, clearFirebaseNotification } as const
}

export default useFirebaseNotification
