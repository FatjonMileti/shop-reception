import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'
import s from './InfoBox.modules.scss'

interface InfoBoxProps {
  title: string
  content: ReactNode
}

const InfoBox: FC<InfoBoxProps> = props => {
  const { title, content } = props

  return (
    <Box className={s.container}>
      <Box className={s.title}>{title}</Box>
      <Box className={s.content}>{content}</Box>
    </Box>
  )
}

export default InfoBox
