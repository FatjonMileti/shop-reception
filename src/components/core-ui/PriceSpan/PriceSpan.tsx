import { PriceSpanProps } from './PriceSpanDefinitions'
import s from './PriceSpan.modules.scss'

const PriceSpan = (props: PriceSpanProps) => {
  return (
    <span style={{ color: props.color }}>
      {props.discountValue ? (
        <>
          <strong>
            {props.discountValue} {props.currency}
          </strong>
          <span className={s.intialPrice}>
            {props.value} {props.currency}
          </span>
        </>
      ) : (
        <strong>
          {props.value} {props.currency}
        </strong>
      )}
    </span>
  )
}

export default PriceSpan
