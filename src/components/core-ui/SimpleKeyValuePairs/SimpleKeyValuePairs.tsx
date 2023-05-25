import * as React from 'react'
import { useMemo } from 'react'
import { get } from 'lodash'
import s from './SimpleKeyValuePairs.modules.scss'

const SimpleKeyValuePairs = ({ pairs, data }) => {
  const computedPairs = useMemo(
    () => pairs.map(pair => ({ ...pair, value: get(data, pair.field) })),
    [pairs, data]
  )

  console.log(computedPairs)

  return (
    <div className={s.container}>
      {computedPairs.map((pair) => (
        <span className={s.pairContainer} key={pair.field}>
          <span className={s.lightText}>{pair.label}</span> <strong>{pair.value}</strong>
        </span>
      ))}
    </div>
  )
}

export default SimpleKeyValuePairs
