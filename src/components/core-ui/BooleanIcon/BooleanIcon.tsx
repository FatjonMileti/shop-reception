import { Icon } from '../Icon'
import { BooleanIconProps } from './BooleanIconDefinitions'

const BooleanIcon = (props: BooleanIconProps) => {
  const { icon, value, onSuccess, onFailure } = props

  return <Icon iconName={icon} tiny fill={value ? onSuccess : onFailure} />
}

export default BooleanIcon
