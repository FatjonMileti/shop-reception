export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopCode: item.shopName ?? '',
    depositName: item.depositName ?? '',
    hubName: item.hubName ?? '',
    parentSociety: item.parentSociety ?? '',
    supportTypeCode: item.supportTypeCode ?? '',
    externalCode: item.supportTypeExternalCode ?? '',
    supportNumber: item.supportNumber ?? '',
    confirmedSupportNumber: item.confirmedSupportNumber ?? '',
    noticeCode: item.shopNotice ?? '',
    sealNumbers: item.seals ?? '',
    approvedDate: item.shopExpedition ?? '',
    hubNoticeNumber: item.hubNotice ?? '',
    truckType: item.truckType ?? '',
    truckNumber: item.truckNumber ?? '',
    packageReturn: item.packageReturn === true ? 'Da' : item.packageReturn === false ? 'Nu' : '',
    loadingDone: item.verificationDate ?? '',
    loadingOperator: item.receptionOperator ?? '',
    truckStatus: item.status ?? ''
  }))
