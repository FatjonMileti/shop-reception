import * as React from 'react'
import { IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { PlusMinusNumberInputProps } from './PlusMinusNumberInputDefinitions'
import s from './PlusMinusNumberInput.modules.scss'
import { Add, Remove } from '@mui/icons-material'
import { OutlinedInput } from '@mui/material'
import { makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'

const PlusMinusNumberInput = (props: PlusMinusNumberInputProps) => {
  const [count, setCount] = React.useState(0)

  const { showNotification } = useNotification()

  React.useEffect(() => {
    setCount(props.count)
  }, [props.count])

  const updateRemoteCount = async () => {
    try {
      await makeCorePutRequest(`${props.action.url}`, { [props.field]: count })
    } catch (error) {
      showNotification({
        message: `A aparut o eroare. ${error?.message}`,
        type: 'error'
      })
    }
  }

  const changeCount = event => {
    const { value } = event.target
    setCount(value)
    updateRemoteCount()
  }

  const increaseValue = () => {
    setCount(count + 1)
    updateRemoteCount()
  }

  const decreaseValue = () => {
    setCount(count - 1)
    updateRemoteCount()
  }

  return (
    <div className={s.inputGroup}>
      <IconButton onClick={decreaseValue} startIcon={<Remove />} variant="text" />
      <OutlinedInput type="number" value={count} onChange={changeCount} />
      <IconButton onClick={increaseValue} startIcon={<Add />} variant="text" />
      {/* <input type="button" value="-" class="button-minus" data-field="quantity" />
  <input type="number" step="1" max="" value="1" name="quantity" class="quantity-field" />
  <input type="button" value="+" class="button-plus" data-field="quantity" /> */}
    </div>
  )
}

export default PlusMinusNumberInput
