import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button as GeneralButton, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { ButtonProps } from './ButtonDefinitions'
import { Icon } from '../Icon'
import { makeCorePostRequest } from 'utils/api'
import { useNotification } from 'hooks'
import { formatErrorMessage } from 'utils/formatting'

const Button = (props: ButtonProps) => {
  const { onClick, href, action, startIcon, endIcon, variable, idSearchParam, ...rest } = props

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const { showNotification } = useNotification()

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    if (action) {
      const { url, type } = action
      try {
        if (type === 'POST') {
          await makeCorePostRequest(url)
        }
      } catch (error) {
        showNotification({
          message: `${action.errorMessage ?? ''} ${formatErrorMessage(error)}`,
          type: 'error'
        })
      }
    }

    if (href) {
      const href2 = idSearchParam ? `${href}/${searchParams.get(idSearchParam)}` : href
      navigate(variable ? `${href2}?${variable}=${searchParams.get(variable)}` : href2)
    }

    props.onClick && props.onClick(event)
  }

  if (startIcon) {
    return (
      <IconButton
        {...rest}
        onClick={handleClick}
        startIcon={<Icon iconName={startIcon} tiny={true} fill="white" />}
      />
    )
  }

  if (endIcon) {
    return (
      <IconButton
        {...rest}
        onClick={handleClick}
        endIcon={<Icon iconName={endIcon} tiny={true} fill="white" />}
      />
    )
  }

  return <GeneralButton {...rest} onClick={handleClick} />
}

export default Button
