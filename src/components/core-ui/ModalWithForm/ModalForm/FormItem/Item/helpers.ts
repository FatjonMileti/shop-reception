export const getNumberValue = value => parseInt(value)

export const getPercentValue = value => {
  const newValue = parseInt(value.replace(/\D/, ''))
  if (isNaN(newValue)) return ''
  if (newValue > 100) return 100
  if (newValue < 0) return 0

  return newValue
}
