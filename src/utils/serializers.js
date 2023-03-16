import set from 'lodash/set'

export const toItemPayload = item => {
  let payload = {}

  Object.keys(item).forEach(key => {
    set(payload, key, item[key])
  })

  return payload
}

export const toArrayItemPayload = item => {
  let payload = {}

  item.map(i => {
    set(payload, i.name, i.value)
  })

  return payload
}
