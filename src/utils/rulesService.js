import Engine from 'json-rules-engine'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'

const getItemRules = (conditions, UIAttributes, index) => ({
  conditions: {
    all: Array.isArray(conditions)
      ? conditions
      : [
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

  const rule = getItemRules(conditions, UIAttributes, index)

  engine.addRule(rule)
}

const setFact = (engine, fact) => {
  engine.addFact(fact, (params, almanac) => {
    const keys = params.split('|')
    switch (keys.length) {
      case 1:
        return almanac.factValue(keys[0]).then(item => {
          return item
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

const setItemFact = (index, engine) => {
  setFact(engine, `fact${index}`)
}

const setItemFacts = (engine, conditions) => {
  conditions.forEach(condition => {
    setFact(engine, condition.fact)
  })
}

const setEngineEvents = (result, engine) => {
  engine
    .on('success', event => {
      const { index, UIAttributes } = event.params
      result[index] = { ...result[index], ...UIAttributes.onSuccess }
    })
    .on('failure', event => {
      const { index, UIAttributes } = event.params
      result[index] = { ...result[index], ...UIAttributes.onFailure }
    })
}

const setEngineCustomOperators = engine => {
  engine.addOperator('isEmptyArray', factValue => {
    return !factValue.length
  })
}

export const start = async (formItems, editItem) => {
  const engine = new Engine()

  let result = cloneDeep(formItems)

  formItems.forEach((item, index) => {
    const { dependencies } = item

    if (dependencies && !dependencies.script && !dependencies.action) {
      setItemRule(dependencies, index, engine)

      if (dependencies.conditions?.params) {
        setItemFact(index, engine)
      }

      if (Array.isArray(dependencies.conditions)) {
        setItemFacts(engine, dependencies.conditions)
      }
    }
  })

  setEngineEvents(result, engine)
  setEngineCustomOperators(engine)

  await engine.run(editItem)

  return result
}
