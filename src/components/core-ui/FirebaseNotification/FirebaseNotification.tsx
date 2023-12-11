import { useSelector } from 'react-redux'
import { useFirebaseNotification } from 'hooks'
import { RootState } from 'configureStore'
import { Snackbar } from '@fullscreendigital/carrefour-dex-fe'
import { SnackbarCloseReason } from '@mui/material'

const FirebaseNotification = () => {
  const notification = useSelector((state: RootState) => state.firebaseNotification)

  const { clearFirebaseNotification } = useFirebaseNotification()

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== 'clickaway' && clearFirebaseNotification()

  debugger
  return (
    <Snackbar
      open={notification.open}
      onClose={handleClose}
      alert={{
        severity: notification.type,
        children: notification.message,
        variant: 'standard'
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    />
  )
}

export default FirebaseNotification
