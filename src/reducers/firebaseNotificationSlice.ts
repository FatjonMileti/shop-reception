import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FirebaseNotificationState {
  open?: boolean
  type?: AlertColor
  title?: string
  message?: string
  timeout?: number | null
}

export const notificationInitialState: FirebaseNotificationState = {
  open: false,
  type: 'info',
  title: '',
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
