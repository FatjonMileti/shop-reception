export const toTableRowItems = (items: NoticeSeriesNumber[]) =>
  items.map((item: NoticeSeriesNumber) => ({
    id: item.id,
    canEdit: item.canEdit || false,
    noticeCurrentNumber: item.noticeCurrentNumber || '',
    noticeMaxNumber: item.noticeMaxNumber || '',
    noticeMinNumber: item.noticeMinNumber || '',
    noticeSeries: item.noticeSeries || '',
    parentSociety: item.parentSociety || '',
    year: item.year || ''
  }))
