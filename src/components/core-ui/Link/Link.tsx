import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// import { Link as GeneralLink } from "@fullscreendigital/carrefour-dex-fe"
import { Typography } from '@fullscreendigital/carrefour-dex-fe'

export interface LinkProps {
  href: string
  children: React.ReactNode
  style?:  React.CSSProperties | undefined
}

const Link = (props: LinkProps) => {
  return (
    <RouterLink to={props.href} style={props.style}>
      <Typography variant="regular" component="span">
        {props.children}
      </Typography>
    </RouterLink>
  )
}

export default Link
