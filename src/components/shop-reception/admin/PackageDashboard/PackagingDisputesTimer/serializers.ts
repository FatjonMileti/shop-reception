export const toTableRowItems = (items: PackagingDisputeTimer[]) => items.map((item: PackagingDisputeTimer) => ({
  id: item.id,
  timerType: item.timerType,
  timerTypeValue: item.timerTypeValue,
  timerValue: item.timerValue,
  timerDescription: item.timerDescription
}))