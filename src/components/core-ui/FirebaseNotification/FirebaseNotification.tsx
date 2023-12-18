import { useSelector } from 'react-redux'
import { useFirebaseNotification } from 'hooks'
import { RootState } from 'configureStore'
import { Snackbar } from '@fullscreendigital/carrefour-dex-fe'
import { Box, SnackbarCloseReason } from '@mui/material'

const FirebaseNotification = () => {
  const notification = useSelector((state: RootState) => state.firebaseNotification)

  const { clearFirebaseNotification } = useFirebaseNotification()

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== 'clickaway' && clearFirebaseNotification()

  const clickNotification = () => {
    if (notification.link) {
      window.location.replace(notification.link)
    }
  }

  return (
    <Snackbar
      open={notification.open}
      onClose={handleClose}
      alert={{
        severity: notification.type,
        children: (
          <Box onClick={clickNotification} style={{ cursor: 'pointer' }}>
            <Box>{notification.title}</Box>
            <Box>{notification.message}</Box>
          </Box>
        ),
        variant: 'standard'
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    />
  )
}

export default FirebaseNotification
