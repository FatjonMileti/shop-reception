import { AlertItem } from '../interfaces'
import { AlertDetails } from './AlertDetails'
import { AlertSummary } from './AlertSummary'

export const toListTableRows = (items: AlertItem[]) => {
  return items.map(item => ({
    id: item.id,
    summary: <AlertSummary item={item} />,
    details: <AlertDetails item={item} />,
    borderLeftColor: '#0970E6'
  }))
}
