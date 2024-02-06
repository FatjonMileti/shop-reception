import s from './Capsule.modules.scss'

interface CapsuleProps {
  label: string
  value: string
  labelColor?: string
  valueColor?: string
}

const Capsule: React.FC<CapsuleProps> = props => {
  const { label, value, labelColor, valueColor } = props
  return (
    <div className={s.capsuleContainer} style={{ background: labelColor }}>
      <span className={s.capsuleLabel}>{label}</span>
      <span className={s.capsuleValue} style={{ background: valueColor }}>
        {value}
      </span>
    </div>
  )
}

export default Capsule
