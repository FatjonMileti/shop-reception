import { PriceSpanProps } from './PriceSpanDefinitions'
import s from './PriceSpan.modules.scss'

const PriceSpan = (props: PriceSpanProps) => {
  return (
    <span style={{ color: props.color }}>
      {props.discountLabel ? (
        <>
          <strong>
            {props.totalPrice} {props.currency}
          </strong>
          <span className={s.intialPrice}>
            {props.value} {props.currency}
          </span>
        </>
      ) : (
        <strong>
          {props.totalPrice} {props.currency}
        </strong>
      )}
    </span>
  )
}

export default PriceSpan
