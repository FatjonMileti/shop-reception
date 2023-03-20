import { useState, useEffect } from 'react'
import { Input } from '@fullscreendigital/carrefour-dex-fe'
import { makeCoreGetRequest } from 'utils/api'

const mockedPersons = [
  { value: '1', label: 'Andrei Ionescu' },
  { value: '2', label: 'Mihai Popescu' },
  { value: '3', label: 'Paula Dan' }
]

const AsyncSelectInput = props => {
  const [values, setValues] = useState([])

  const { action, ...rest } = props

  useEffect(() => {
    ;(async () => {
      // TODO: get the select data; this is a GET to api
      try {
        const results = await makeCoreGetRequest(action.url)
        setValues(results)
      } catch (error) {
        console.log(error)
        setValues(mockedPersons)
      }
    })()
  }, [])

  return <Input {...rest} type="select" values={values} />
}

export default AsyncSelectInput
