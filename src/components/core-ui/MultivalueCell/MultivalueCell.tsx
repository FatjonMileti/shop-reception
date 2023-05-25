import { useEffect, useState } from 'react'
import { MultivalueCellProps } from './MultivalueCellDefinitions'

function MultivalueCell(props: MultivalueCellProps) {
  const { value } = props
  const [visible, setVisible] = useState(false)
  const [shortDisplayText, setShortDisplayText] = useState(null)
  const originalDisplayText = value.join(', ')

  useEffect(() => {
    if (value.length <= 2) {
      setShortDisplayText(value.join(', '))
    } else {
      var remainingCount = value.length - 2
      setShortDisplayText(value.slice(0, 2).join(', ') + '... +' + remainingCount)
    }
  }, [value])

  return (
    <div onClick={() => setVisible(!visible)}>
      {visible ? originalDisplayText : shortDisplayText}
    </div>
  )
}

export default MultivalueCell
