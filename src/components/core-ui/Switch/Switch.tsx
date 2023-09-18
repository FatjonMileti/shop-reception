import { useState, ChangeEvent } from 'react'
import { Switch as GeneralSwitch } from '@mui/material'
import { makeCorePutRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'
import { SwitchProps } from './SwitchDefinitions'
import s from './Switch.modules.scss'

const Switch = (props: SwitchProps) => {
  const { action, payloadKey, successMessage, value, pathId } = props

  const [checked, setChecked] = useState(value || false)

  const { showNotification } = useNotification()

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target

    try {
      if (action.type === 'PUT') {
        let url = action.url
        if (pathId) {
          url = `${url}/${pathId}`
        }

        await makeCorePutRequest(url, { [payloadKey]: checked })

        setChecked(checked)

        showNotification({
          message: successMessage || 'Scuccess',
          type: 'success'
        })
      }
    } catch (error) {
      showNotification({
        message: `A aparut o eroare la schimbarea statusului comenzii. ${formatErrorMessage(
          error
        )}`,
        type: 'error'
      })
    }
  }

  return (
    <GeneralSwitch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      className={s.switch}
    />
  )
}

export default Switch
