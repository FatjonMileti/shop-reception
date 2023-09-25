import s from './DescriptionText.modules.scss'
import { DescriptionTextProps } from './DescriptionTextDefinitions'

const DescriptionText = (props: DescriptionTextProps) => {
  const { value, maxWidth } = props

  return (
    <span className={s.descriptionText} style={{ maxWidth: maxWidth ?? '200px' }} title={value}>
      {value}
    </span>
  )
}

export default DescriptionText
