import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button as GeneralButton, IconButton } from '@fullscreendigital/carrefour-dex-fe'
import { ButtonProps } from './ButtonDefinitions'
import { Icon } from '../Icon'

const Button = (props: ButtonProps) => {
  const { onClick, href, startIcon, endIcon, variable, ...rest } = props

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (href) {
      navigate(variable ? `${href}?${variable}=${searchParams.get(variable)}` : href)
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
