import { ValueLabelInterface } from 'components/governance/interfaces'

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
