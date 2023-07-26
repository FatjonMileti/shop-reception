import { useEffect, useState } from 'react'
import { MultivalueCellProps } from './MultivalueCellDefinitions'
import { getOriginalDisplayText, getShortDisplayText } from './helpers'
import s from './MultivalueCell.modules.scss'

function MultivalueCell(props: MultivalueCellProps) {
  const { value, field, size } = props
  const [visible, setVisible] = useState(false)
  const [shortDisplayText, setShortDisplayText] = useState(null)
  const [originalDisplayText, setOriginalDisplayText] = useState(null)
  const [remainingCount, setRemainingCount] = useState(0)

  useEffect(() => {
    if (field) {
      const fieldValues = props.value.map(val => val[field])
      const [text, remainingCount] = getShortDisplayText(fieldValues, size)
      setShortDisplayText(text)
      setRemainingCount(remainingCount)
      setOriginalDisplayText(getOriginalDisplayText(fieldValues))
    } else {
      const [text, remainingCount] = getShortDisplayText(value, size)
      setShortDisplayText(text)
      setRemainingCount(remainingCount)
      setOriginalDisplayText(getOriginalDisplayText(value))
    }
  }, [value])

  return (
    <div className={s.textContainer} onClick={() => setVisible(!visible)}>
      {visible ? (
        originalDisplayText
      ) : (
        <span>
          {shortDisplayText && (
            <span>
              {shortDisplayText}
              {!!remainingCount && <span>... + {remainingCount}</span>}
            </span>
          )}
        </span>
      )}
    </div>
  )
}

export default MultivalueCell
