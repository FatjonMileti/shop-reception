import { formatUIDateTime } from 'utils/helpers'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopName: item.shopName ?? '',
    receptionHubName: item.hubName ?? '',
    depositName: item.depositName ?? '',
    parentSociety: item.parentSociety ?? '',
    truckType: item.truckType.value ?? '',
    truckTypeKey: item.truckType.key ?? '',
    truckNumber: item.truckNumber ?? '',
    driverName: item.driverName ?? '',
    globalPackageReturn: item.globalPackageReturn ?? '',
    sealNumbers: item.sealNumbers ?? '',
    noticeNumbers: item.noticeNumbers ?? '',
    hubNoticeNumber: item.hubNoticeNumber ?? '',
    created: item.created ? formatUIDateTime(item.created) : '',
    loadingDone: item.loadingDone ? formatUIDateTime(item.loadingDone) : '',
    truckStatus: item.truckStatus.value ?? ''
  }))
