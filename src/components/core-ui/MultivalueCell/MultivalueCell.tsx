import { useEffect, useState, useMemo } from 'react'
import { MultivalueCellProps } from './MultivalueCellDefinitions'
import { getOriginalDisplayText, getShortDisplayText } from './helpers'
import s from './MultivalueCell.modules.scss'

function MultivalueCell(props: MultivalueCellProps) {
  const { value, field, size } = props

  const formattedValue = useMemo(() => (!value || !Array.isArray(value) ? [] : value), [value])
  const fieldValues = useMemo(() => formattedValue.map(val => val[field]), [value])

  const result = useMemo(() => {
    return getShortDisplayText(fieldValues, size)
  }, [fieldValues, size])

  const [visible, setVisible] = useState(false)
  const [shortDisplayText, setShortDisplayText] = useState(result[0])
  const [originalDisplayText, setOriginalDisplayText] = useState(null)
  const [remainingCount, setRemainingCount] = useState(result[1])

  useEffect(() => {
    if (field) {
      const [text, remainingCount] = result
      setShortDisplayText(text)
      setRemainingCount(remainingCount)
      setOriginalDisplayText(getOriginalDisplayText(fieldValues))
    } else {
      const [text, remainingCount] = getShortDisplayText(formattedValue, size)
      setShortDisplayText(text)
      setRemainingCount(remainingCount)
      setOriginalDisplayText(getOriginalDisplayText(formattedValue))
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
              {!!remainingCount && <span className={s.moreEllipses}>... + {remainingCount}</span>}
            </span>
          )}
        </span>
      )}
    </div>
  )
}

export default MultivalueCell
