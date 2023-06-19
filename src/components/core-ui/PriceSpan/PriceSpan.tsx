import { PriceSpanProps } from './PriceSpanDefinitions'

const PriceSpan = (props: PriceSpanProps) => {
  return (
    <span style={{ color: props.color }}>
      <strong>{props.value} {props.currency}</strong>
    </span>
  )
}

export default PriceSpan
