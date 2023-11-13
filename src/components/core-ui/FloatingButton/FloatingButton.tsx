import { useNavigate } from 'react-router-dom'
import { FloatingActionButton } from '@fullscreendigital/carrefour-dex-fe'
import { FloatingButtonProps } from './FloatingButtonDefinitions'
import { getStylePosition } from './helpers'
import { useMemo } from 'react'

const FloatingButton = (props: FloatingButtonProps) => {
  const { href, backgroundColor, position, type } = props

  const navigate = useNavigate()

  const handleClick = () => {
    if (href) {
      navigate(href)
    }
  }

  const stylePosition = useMemo(() => getStylePosition(position), [position])

  return (
    <FloatingActionButton
      type={type}
      onClick={handleClick}
      sx={{
        backgroundColor,
        position: 'absolute',
        ...stylePosition,
        '&:hover': { backgroundColor }
      }}
    />
  )
}

export default FloatingButton
