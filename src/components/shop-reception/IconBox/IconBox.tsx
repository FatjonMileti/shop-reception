import { Box } from '@mui/material'
import s from './IconBox.modules.scss'
import React from 'react'

interface IconBoxProps {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
}

const IconBox: React.FC<IconBoxProps> = (props) => {
  return (
    <Box className={s.applicationsWrapper}>
      <div
        onClick={props.onClick}
        className={s.applicationContainer}
      >
        <div className={s.iconContainer}>
          {props.icon}
        </div>
        <span className={s.applicationName}>{props.title}</span>
      </div>
    </Box>
  )
}

export default IconBox