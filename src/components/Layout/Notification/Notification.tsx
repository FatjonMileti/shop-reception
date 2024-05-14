import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNotification } from 'hooks'
import { RootState } from 'configureStore'
import { Snackbar } from '@fullscreendigital/carrefour-dex-fe'
import { SnackbarCloseReason } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification)

  const { clearNotification } = useNotification()

  const autoHideDuration = useMemo(
    () => (notification.timeout || notification.type === 'error' ? 15000 : 10000),
    [notification.timeout, notification.type]
  )

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== 'clickaway' && clearNotification()

  return (
    <Snackbar
      open={notification.open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      alert={{
        severity: notification.type,
        children: notification.message,
        variant: 'standard'
      }}
    />
  )
}

export default Notification
