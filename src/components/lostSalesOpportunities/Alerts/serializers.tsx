import { AlertDetails } from './AlertDetails'
import { AlertSummary } from './AlertSummary'

export const toListTableRows = items => {
  return items.map(item => ({
    id: item.id,
    summary: <AlertSummary item={item} />,
    details: <AlertDetails item={item} />,
    borderLeftColor: '#0970E6',
    defaultExpanded: true
  }))
}
