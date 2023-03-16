import dayjs from 'dayjs'

export const getDefaultItemValue = value => {
  switch (value) {
    case 'CURRENT_DATE':
      return dayjs().format('MM-DD-YYYY')
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

export const getItemDefaultsAsArray = formItems => {
  let result = []

  formItems.forEach(item => {
    result.push({
      name: item.name,
      value: item.defaultValue ? getDefaultItemValue(item.defaultValue) : ''
    })
  })

  return result
}
