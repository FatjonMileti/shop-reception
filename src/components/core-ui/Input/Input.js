import { createElement } from 'react'
import { Input as GeneralInput } from '@fullscreendigital/carrefour-dex-fe'
import { Components } from 'utils/dynamicRenderingConstants'

const Input = props => {
  const { infoIcon, ...rest } = props

  return <GeneralInput {...rest} infoIcon={infoIcon ? createElement(Components[infoIcon]) : null} />
}

export default Input
