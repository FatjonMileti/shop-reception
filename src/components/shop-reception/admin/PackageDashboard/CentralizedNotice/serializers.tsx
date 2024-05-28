import { NoticeDescription } from './NoticeDescription'
import { NoticeSummary } from './NoticeSummary'

export const toListTableRows = (items, tableColumns) => {
  return items.map(item => ({
    id: item.id,
    summary: <NoticeSummary item={item} />,
    details: <NoticeDescription item={item} tableColumns={tableColumns} />,
    borderLeftColor: '#0970E6',
    defaultExpanded: true
  }))
}
