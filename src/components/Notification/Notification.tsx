import * as React from 'react'
import { useSelector } from 'react-redux'
import { useNotification } from 'hooks'
import { RootState } from 'configureStore'
import { Snackbar } from '@fullscreendigital/carrefour-dex-fe'
import { SnackbarCloseReason } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification)

  const { clearNotification } = useNotification()

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== 'clickaway' && clearNotification()

  return (
    <Snackbar
      open={notification.open}
      onClose={handleClose}
      autoHideDuration={notification.timeout || notification.type !== 'error' ? 3000 : undefined}
      alert={{
        severity: notification.type,
        children: notification.message,
        variant: 'standard'
      }}
    />
  )
}

export default Notification
