import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { Box } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { CloseMenu } from 'icons'
import { onMessageListener } from 'utils/firebase'
import {
  FirebaseNotificationActions,
  FirebaseNotificationState
} from 'reducers/firebaseNotificationSlice'

const FirebaseNotification = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  onMessageListener()
    .then((payload: any) => {
      if (payload) {
        showFirebaseNotification({
          title: 'payload.data?.title',
          message: 'payload.data?.body',
          link: 'payload.data?.route'
        })
      }
    })
    .catch(err => console.log('failed: ', err))

  const showFirebaseNotification = (notification: FirebaseNotificationState) => {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    notifications.push(notification)
    localStorage.setItem('notifications', JSON.stringify(notifications))

    dispatch(FirebaseNotificationActions.addNotification(notification))
  }

  const notification = useSelector((state: RootState) => state.firebaseNotification)

  const clickNotification = () => {
    if (notification.link) {
      window.location.replace(notification.link)
    }
  }

  const handleClose = (e, snackbarId, title) => {
    e.stopPropagation()
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    const index = notifications.findIndex(notification => notification.title === title)

    if (index !== -1) {
      notifications.splice(index, 1)
      localStorage.setItem('notifications', JSON.stringify(notifications))
    }

    closeSnackbar(snackbarId)
  }

  const action = (snackbarId, title) => (
    <div
      onClick={clickNotification}
      style={{
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <IconButton
        onClick={e => handleClose(e, snackbarId, title)}
        style={{
          right: 0,
          position: 'absolute'
        }}
      >
        <CloseMenu />
      </IconButton>
    </div>
  )

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')

    storedNotifications.forEach(notification => {
      enqueueSnackbar(
        <Box style={{ cursor: 'pointer' }}>
          <Box>{notification.title}</Box>
          <Box>{notification.message}</Box>
        </Box>,
        { variant: 'info', action: key => action(key, notification.title) }
      )
    })
  }, [])

  useEffect(() => {
    if (notification.open) {
      enqueueSnackbar(
        <Box style={{ cursor: 'pointer' }}>
          <Box>{notification.title}</Box>
          <Box>{notification.message}</Box>
        </Box>,
        { variant: notification.type, action: key => action(key, notification.title) }
      )
    }
  }, [notification, enqueueSnackbar])

  return <></>
}

export default FirebaseNotification
