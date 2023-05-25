import * as React from 'react'
import cn from 'classnames'
import s from './TitleText.modules.scss'
import { TitleTextProps } from './TitleTextDefinitions'

const TitleText = (props: TitleTextProps) => {
  return (
    <span className={cn(s.title, props.className)} style={props.style}>
      {props.text}
    </span>
  )
}

export default TitleText
