import { makeCoreGetRequest } from 'utils/api'

export const getModalWidth = formItemsPerRow => {
  switch (formItemsPerRow) {
    case 1:
      return '30%'
    case 2:
      return '50%'
    default:
      return '30%'
  }
}

export const getGridSize = formItemsPerRow => 12 / formItemsPerRow

export const getItemRemoteDependencies = async item => {
  let res
  const { type, url, conditions } = item.dependencies.action
  if (type === 'GET') {
    res = await makeCoreGetRequest(url)
  }
  if (
    conditions.operator === 'equal' &&
    res[conditions.param] &&
    res[conditions.param] !== conditions.value
  ) {
    return { ...item, hidden: true, disabled: true }
  }

  return item
}

export const getRemoteDependencies = async result =>
  Promise.all(
    result.map(async item => {
      if (item.dependencies?.action) {
        item = await getItemRemoteDependencies(item)
      }
      return item
    })
  )
