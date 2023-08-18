import * as React from 'react'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { PlusMinusNumberInputProps } from './PlusMinusNumberInputDefinitions'
import s from './PlusMinusNumberInput.modules.scss'
import { Add, Remove } from '@mui/icons-material'
import { OutlinedInput } from '@mui/material'
import { makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

const PlusMinusNumberInput = (props: PlusMinusNumberInputProps) => {
  const [count, setCount] = React.useState(0)

  const { showNotification } = useNotification()

  React.useEffect(() => {
    setCount(props.count)
  }, [props.count])

  const updateRemoteCount = async value => {
    try {
      await makeCorePutRequest(`${props.action.url}`, { ...props.payload, [props.field]: value })
      props.additionalAction && props.additionalAction()
    } catch (error) {
      showNotification({
        message: `A aparut o eroare. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const changeCount = event => {
    const { value } = event.target
    setCount(value)
    updateRemoteCount(value)
  }

  const increaseValue = () => {
    const value = count + 1
    setCount(value)
    updateRemoteCount(value)
  }

  const decreaseValue = () => {
    const value = count - 1
    setCount(value)
    updateRemoteCount(value)
  }

  return (
    <div className={s.inputGroup}>
      <IconButton onClick={decreaseValue}><Remove /></IconButton>
      <OutlinedInput type="text" inputMode="numeric" value={count} onChange={changeCount} />
      <IconButton onClick={increaseValue}><Add /></IconButton>
    </div>
  )
}

export default PlusMinusNumberInput
