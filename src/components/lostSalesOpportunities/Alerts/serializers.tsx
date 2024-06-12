import { AlertItem } from '../interfaces'
import { AlertDetails } from './AlertDetails'
import { AlertSummary } from './AlertSummary'

export const toListTableRows = (items: AlertItem[], setShouldRefreshData: Function) => {
  return items.map(item => ({
    id: item.id,
    summary: <AlertSummary item={item} />,
    details: <AlertDetails item={item} setShouldRefreshData={setShouldRefreshData} />,
    borderLeftColor: '#0970E6'
  }))
}
