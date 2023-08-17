export const getNumberValue = value => parseInt(value)

export const getPercentValue = value => {
  let newValue = parseInt(value)
  if (isNaN(newValue)) return ''
  if (newValue > 100) return 100
  if (newValue < 0) return 0

  return newValue
}
