import s from './Capsule.modules.scss'

interface CapsuleProps {
  label: string
  value?: string
  labelColor?: string
  valueColor?: string
  children?: React.ReactNode
}

const Capsule: React.FC<CapsuleProps> = props => {
  const { label, value, labelColor, valueColor, children } = props

  return (
    <div className={s.capsuleContainer} style={{ background: labelColor }}>
      <span className={s.capsuleLabel}>{label}</span>
      <span className={s.capsuleValue} style={{ background: valueColor }}>
        {value && value}
        {children && children}
      </span>
    </div>
  )
}

export default Capsule
