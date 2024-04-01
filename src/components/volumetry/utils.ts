import dayjs from 'dayjs'

export const fromTaskPayload = result => ({
  ...result,
  recommendedStartHour: dayjs(result.recommendedStartHour, 'HH:mm'),
  recommendedEndHour: dayjs(result.recommendedEndHour, 'HH:mm')
})

export const customValidation = value => {
  if (!Number.isNaN(value) && parseFloat(value) % 0.25 === 0) {
    return true
  }
  return false
}