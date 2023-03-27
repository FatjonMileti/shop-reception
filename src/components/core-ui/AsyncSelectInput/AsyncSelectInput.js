import { useState, useEffect } from 'react'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'
import { toAsyncSelectOptions } from './serializers'

// const mockedData = [
//   { value: '1', label: 'Andrei Ionescu' },
//   { value: '2', label: 'Mihai Popescu' },
//   { value: '3', label: 'Paula Dan' }
// ]

const mockedData = [
  { value: '1', label: 'Domain 1' },
  { value: '2', label: 'Domain 2' },
  { value: '3', label: 'Domain 3' }
]

const AsyncSelectInput = props => {
  const [values, setValues] = useState([])

  const { action, ...rest } = props

  useEffect(() => {
    ;(async () => {
      try {
        const result = await makeCoreGetRequest(action.url)
        const { valueKey, labelKey } = action
        setValues(toAsyncSelectOptions(result.list, valueKey, labelKey))
      } catch (error) {
        console.log(error)
        setValues(mockedData)
      }
    })()
  }, [action.url])

  return (
    <Input
      {...rest}
      type="select"
      values={values}
      value={props.value ?? ''}
      onChange={props.onChange}
    />
  )
}

export default AsyncSelectInput
