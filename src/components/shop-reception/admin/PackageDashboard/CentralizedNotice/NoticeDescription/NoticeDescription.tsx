import { useMemo } from 'react'
import { getColumns, getRows } from './helpers'
import { Table } from '@fullscreendigital/carrefour-dex-fe'

const NoticeDescription = ({ item, tableColumns }) => {
  const { noticesList, totalsForNoticesList, totalConfirmedSupportNumber, totalDifference } = item

  const rows = useMemo(
    () => getRows(noticesList, totalsForNoticesList, totalConfirmedSupportNumber, totalDifference),
    [noticesList, totalsForNoticesList, totalConfirmedSupportNumber, totalDifference]
  )

  const columns = useMemo(() => getColumns(tableColumns), [])

  return (
    <Table
      hideCheckbox
      stickyRatio={0.3}
      columns={columns}
      rows={rows}
      isLoading={false}
      disablePagination
    />
  )
}

export default NoticeDescription
