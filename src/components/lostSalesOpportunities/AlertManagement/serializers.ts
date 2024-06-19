import { formatUIDateTime } from 'utils/helpers'
import { AlertManagementItem } from '../interfaces'

export const toTableRowItems = (items: AlertManagementItem[]) =>
  items.map(item => ({
    id: item.id,
    articleId: item.articleId ?? '',
    articleName: item.articleName ?? '',
    snoozeStart: formatUIDateTime(item.snoozeStart),
    snoozeEnd: formatUIDateTime(item.snoozeEnd)
  }))
