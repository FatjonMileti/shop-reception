export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopName: item.shopName ?? '',
    shopCode: item.shopCode ?? '',
    supportCode: item.supportCode ?? '',
    supportName: item.supportName ?? '',
    supportNumber: item.supportNumber ?? '',
    noticeNumber: item.noticeNumber ?? '',
    expeditionDate: item.expeditionDate ?? '',
    noticeConform: item.noticeConform === true ? 'Da' : item.noticeConform === false ? 'Nu' : '',
    conformNoticeNumber: item.conformNoticeNumber ?? '',
    confirmedSupportNumber: item.confirmedSupportNumber ?? '',
    receptionDate: item.receptionDate ?? '',
    receptionOperator: item.receptionOperator ?? ''
  }))
