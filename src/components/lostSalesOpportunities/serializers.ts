export const toSnoozeOptions = snoozeOptions =>
  snoozeOptions.map(snoozeOption => ({ label: snoozeOption.numberOfHours, value: snoozeOption.id }))
