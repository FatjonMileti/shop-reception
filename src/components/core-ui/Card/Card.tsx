import { Card as GeneralCard, CardHeader, CardContent } from '@mui/material'
import { CardProps } from './CardDefinitions'
import { Icon } from '../Icon'
import { renderComponent } from 'utils/dynamicRenderingService'
import s from './Card.modules.scss'

const Card = (props: CardProps) => {
  const { title, icon, content, ...rest } = props

  return (
    <GeneralCard>
      <CardHeader avatar={<Icon iconName={icon} tiny />} title={title} className={s.cardTitle} />
      <CardContent>{renderComponent(content)}</CardContent>
    </GeneralCard>
  )
}

export default Card
