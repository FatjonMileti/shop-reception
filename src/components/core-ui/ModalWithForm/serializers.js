import setWith from 'lodash/setWith'

export const toEditItemPayload = item => {
  let payload = {}

  Object.keys(item).forEach(key => {
    setWith(payload, key, item[key])
  })

  return payload
}
