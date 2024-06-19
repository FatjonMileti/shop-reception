import { ValueLabelInterface } from 'components/governance/interfaces'
import { FormikErrors, FormikValues } from 'formik'

export interface AlertItem {
  id: 1
  articleId: string
  articleName: string
  hasFeedback: boolean
  lsoQuantity: number
  realTimeStock: number
  validHour: string
}

export interface AlertDateInfoProps {
  validHour: string
}

export interface AlertFormProps {
  feedbackReasonsOptions: ValueLabelInterface[]
}

export interface PhotoButtonsProps {
  setShowPhotoCapture: Function
  setPhoto: Function
}

export interface PhotoItemProps {
  photo: File
  setPhotoValue: Function
  setIsPictureChanged: Function
  errors: FormikErrors<FormikValues>
  setShowPhotoCapture: Function
}

export interface SnoozeAlarmProps {
  alertId: number
  setShouldRefreshData: Function
}

export interface AlertDetailsProps {
  item: AlertItem
  setShouldRefreshData: Function
}

export interface AlertSummaryProps {
  item: AlertItem
}

export interface AlertManagementItem {
  id: number
  articleId: string
  articleName: string
  snoozeStart: string
  snoozeEnd: string
}

export interface AlertFormValues {
  feedbackReason: ValueLabelInterface
  comment: string
  photo: File
}
