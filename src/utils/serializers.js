import set from 'lodash/set'

export const toItemPayload = item => {
  let payload = {}

  Object.keys(item).forEach(key => {
    set(payload, key, item[key])
  })

  return payload
}
