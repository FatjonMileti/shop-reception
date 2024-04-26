import { Box } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { CloseMenu } from 'icons'
import { onMessageListener } from 'utils/firebase'
import { FirebaseNotificationState } from 'reducers/firebaseNotificationSlice'

const FirebaseNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [newNotification, setNewNotification] = useState<any>()

  const showFirebaseNotification = (notification: FirebaseNotificationState) => {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]')

    notifications.push(notification)
    localStorage.setItem('notifications', JSON.stringify(notifications))

    setNewNotification(notification)
  }

  onMessageListener()
    .then((payload: any) => {
      if (payload) {
        showFirebaseNotification({
          title: payload.data?.title,
          message: payload.data?.body,
          link: payload.data?.route,
          open: true,
          type: 'info'
        })
      }
    })
    .catch(err => console.log('failed: ', err))

  const removeNotification = (notifications, title: string, snackbarId: any) => {
    const index = notifications.findIndex(
      (notification: FirebaseNotificationState) => notification.title === title
    )

    if (index !== -1) {
      notifications.splice(index, 1)
      localStorage.setItem('notifications', JSON.stringify(notifications))
    }

    closeSnackbar(snackbarId)
  }

  const onClickNotification = (title: string, snackbarId: any) => {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]')

    const notification = notifications.find(
      (item: FirebaseNotificationState) => item.title === title
    )

    const link = notification.link
    removeNotification(notifications, title, snackbarId)

    if (link) {
      window.location = notification.link
    }
  }

  const onCloseNotification = (e: any, snackbarId: string, title: string) => {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    e.stopPropagation()

    removeNotification(notifications, title, snackbarId)
  }

  const action = (snackbarId: any, title: string) => (
    <div
      onClick={() => onClickNotification(title, snackbarId)}
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
        onClick={e => onCloseNotification(e, snackbarId, title)}
        style={{
          right: 0,
          position: 'absolute'
        }}
      >
        <CloseMenu />
      </IconButton>
    </div>
  )

  const notificationContent = (title: string, message: string) => {
    return (
      <Box style={{ cursor: 'pointer' }}>
        <Box>{title}</Box>
        <Box>{message}</Box>
      </Box>
    )
  }

  useEffect(() => {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]')

    notifications.forEach((notification: FirebaseNotificationState) => {
      enqueueSnackbar(notificationContent(notification.title, notification.message), {
        variant: 'info',
        action: key => action(key, notification.title)
      })
    })
  }, [])

  useEffect(() => {
    if (newNotification?.open) {
      enqueueSnackbar(notificationContent(newNotification.title, newNotification.message), {
        variant: newNotification.type,
        action: key => action(key, newNotification.title)
      })
    }
  }, [newNotification, enqueueSnackbar])

  return <></>
}

export default FirebaseNotification
