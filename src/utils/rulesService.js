import Engine from 'json-rules-engine'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'

const getItemRule = (conditions, UIAttributes, index) => ({
  conditions: {
    all: [
      {
        fact: `fact${index}`,
        ...conditions
      }
    ]
  },
  event: {
    type: `event${index}`,
    params: {
      index,
      UIAttributes
    }
  }
})

const setItemRule = (dependencies, index, engine) => {
  const { conditions, UIAttributes } = dependencies

  const rule = getItemRule(conditions, UIAttributes, index)

  engine.addRule(rule)
}

const setItemFact = (index, engine) => {
  engine.addFact(`fact${index}`, (params, almanac) => {
    const keys = params.split('|')
    switch (keys.length) {
      case 1:
        return almanac.factValue(keys[0]).then(item => {
          return !!item
        })
      case 2:
        return almanac.factValue(keys[0]).then(item1 => {
          return almanac.factValue(keys[1]).then(item2 => {
            // TODO add compare function
            return dayjs(item1).format('DD-MM-YYYY') === dayjs(item2).format('DD-MM-YYYY')
          })
        })
      default:
        return null
    }
  })
}

const setEngineEvents = (result, engine) => {
  engine
    .on('success', event => {
      const { index, UIAttributes } = event.params
      debugger
      result[index] = { ...result[index], ...UIAttributes.onSuccess }
    })
    .on('failure', event => {
      const { index, UIAttributes } = event.params
      debugger
      result[index] = { ...result[index], ...UIAttributes.onFailure }
    })
}

export const start = async (formItems, editItem) => {
  const engine = new Engine()

  let result = cloneDeep(formItems)

  formItems.forEach((item, index) => {
    const { dependencies } = item

    if (dependencies && !dependencies.script) {
      setItemRule(dependencies, index, engine)

      if (dependencies.conditions?.params) {
        setItemFact(index, engine)
      }
    }
  })

  setEngineEvents(result, engine)

  await engine.run(editItem)

  return result
}
