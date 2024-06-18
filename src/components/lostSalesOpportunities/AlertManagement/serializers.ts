export const toTableRowItems = (items: any[]) =>
  items.map(item => ({
    id: item.id,
    articleId: item.articleId ?? '',
    articleName: item.articleName ?? '',
    snoozeStart: item.snoozeStart ?? '',
    snoozeEnd: item.snoozeEnd ?? ''
  }))
