import { formatUIDateTime } from 'utils/helpers'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopName: item.shopName ?? '',
    depositName: item.depositName ?? '',
    receptionHubName: item.hubName ?? '',
    parentSociety: item.parentSociety ?? '',
    supportTypeExpected: item.supportTypeExpected ?? '',
    supportTypeConfirmed: item.supportType ?? '',
    type: item.type ?? '',
    truckNumber: item.truckNumber ?? '',
    supportCode: item.supportCode ?? '',
    deliveryTicketExternalId: item.ticketNumber ?? '',
    noticeNumber: item.noticeNumber ?? '',
    intactNumber: item.intactNumber ?? '',
    brokenNumber: item.brokenNumber ?? '',
    difference: item.difference ?? '',
    created: formatUIDateTime(item.created),
    pictureId: item.pictureId
  }))
