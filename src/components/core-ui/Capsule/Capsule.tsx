import s from './Capsule.modules.scss'

interface CapsuleProps {
  label: string
  value: string
}

const Capsule: React.FC<CapsuleProps> = props => {
  const { label, value } = props
  return (
    <div className={s.capsuleContainer}>
      <span className={s.capsuleLabel}>{label}</span>
      <span className={s.capsuleValue}>{value}</span>
    </div>
  )
}

export default Capsule
