import dayjs from 'dayjs'

export const fromTaskPayload = result => ({
  ...result,
  recommendedStartHour: dayjs(result.recommendedStartHour, 'HH:mm'),
  recommendedEndHour: dayjs(result.recommendedEndHour, 'HH:mm')
})
