import { useState, useEffect } from 'react'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'

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
  const [value, setValue] = useState({ value: '', label: '' })

  const { action, ...rest } = props

  useEffect(() => {
    ;(async () => {
      try {
        const results = await makeCoreGetRequest(action.url)
        setValues(results)
      } catch (error) {
        console.log(error)
        setValues(mockedData)
      }
    })()
  }, [action.url])

  useEffect(() => {
    if (props.value || values.length) {
      const newValue = props.value ?? values[0]
      setValue(newValue)
      props.setComboValue(newValue)
    }
  }, [props.value, values])

  const handleChange = event => {
    const newValue = values.find(value => value.value === event.target.value)
    setValue(newValue)
    props.setComboValue(newValue)
  }

  return (
    <Input {...rest} type="select" values={values} value={value?.value} onChange={handleChange} />
  )
}

export default AsyncSelectInput
