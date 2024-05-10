import { formatUIDate } from "utils/helpers";

export const toTableRowItems = items => items.map(item => ({
  id: item.id,
  depositName: item.depositName,
  shopType: item.shopType,
  shopName: item.shopName,
  hubName: item.hubName,
  parentSociety: item.parentSociety,
  created: formatUIDate(item.createdDate),
  shopFinaliseTime: formatUIDate(item.shopFinaliseTime),
  sentNotifications: item.sentNotifications,
  noticeCode: item.noticeNumber,
  noticeCreated: formatUIDate(item.noticeDate),
  status: item.taskStatus
}))