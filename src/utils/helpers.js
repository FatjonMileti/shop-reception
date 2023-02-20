import dayjs from 'dayjs'

const getDefaultItemValue = value => {
  switch (value) {
    case 'CURRENT_DATE':
      return dayjs()
    default:
      return value
  }
}

export const getItemDefaults = formItems => {
  let result = {}

  formItems.forEach(item => {
    result[item.name] = item.defaultValue ? getDefaultItemValue(item.defaultValue) : ''
  })

  return result
}
