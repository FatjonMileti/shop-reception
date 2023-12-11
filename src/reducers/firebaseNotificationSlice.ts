import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FirebaseNotificationState {
  open?: boolean
  type?: AlertColor
  message?: string
  timeout?: number | null
}

export const notificationInitialState: FirebaseNotificationState = {
  open: false,
  type: 'info',
  message: '',
  timeout: null
}

export const NotificationSlice = createSlice({
  name: 'firebaseNotification',
  initialState: notificationInitialState,
  reducers: {
    addNotification: (_state, action: PayloadAction<FirebaseNotificationState>) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true
    }),
    clearNotification: state => ({ ...state, open: false })
  }
})

export const FirebaseNotificationActions = NotificationSlice.actions
export const FirebaseNotificationReducer = NotificationSlice.reducer
