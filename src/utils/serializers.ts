import { set } from 'lodash'

export const toItemPayload = (item: { [key: string]: string }) => {
  let payload = {}

  Object.keys(item).forEach(key => {
    set(payload, key, item[key])
  })

  return payload
}

export const toArrayItemPayload = (item: { name: string; value: string }[]) => {
  let payload = {}

  item.map(i => {
    set(payload, i.name, i.value)
  })

  return payload
}
