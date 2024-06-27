export const toSnoozeOptions = snoozeOptions =>
  snoozeOptions.map(snoozeOption => ({ label: snoozeOption.numberOfHours, value: snoozeOption.id }))

export const toFeedbackReasonsOptions = feedbackReasons =>
  feedbackReasons.map(feedbackReason => ({
    label: feedbackReason.reason,
    value: feedbackReason.id
  }))
