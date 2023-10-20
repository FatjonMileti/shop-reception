import { PriceSpanProps } from './PriceSpanDefinitions'
import s from './PriceSpan.modules.scss'

const PriceSpan = (props: PriceSpanProps) => {
  return (
    <span style={{ color: props.color }}>
      <strong>{props.value} {props.currency}</strong>
      {props.initialValue && (<span className={s.intialPrice}>{props.initialValue} {props.currency}</span>)}
    </span>
  )
}

export default PriceSpan
