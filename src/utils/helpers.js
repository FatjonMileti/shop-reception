import dayjs from 'dayjs'

const getDefaultEditItemValue = value => {
  switch (value) {
    case 'CURRENT_DATE':
      return dayjs()
    default:
      return value
  }
}

export const getEditFormItemDefaults = formItems => {
  let result = {}

  formItems.forEach(item => {
    result[item.name] = item.defaultValue ? getDefaultEditItemValue(item.defaultValue) : ''
  })

  return result
}
