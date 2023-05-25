import { useState } from 'react'

interface MultivalueCellProps {
  value: []
}

function MultivalueCell(props: MultivalueCellProps) {
  const { value } = props
  const [visible, setVisible] = useState(false)
  const originalDisplayText = value.join(', ')
  let shortDisplayText

  if (value.length <= 2) {
    shortDisplayText = value.join(', ')
  } else {
    var remainingCount = value.length - 2
    shortDisplayText = value.slice(0, 2).join(', ') + '... +' + remainingCount
  }

  return (
    <div onClick={() => setVisible(!visible)}>
      {visible ? originalDisplayText : shortDisplayText}
    </div>
  )
}

export default MultivalueCell
