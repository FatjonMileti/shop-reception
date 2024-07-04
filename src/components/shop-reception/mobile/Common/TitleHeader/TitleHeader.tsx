import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { getTitle } from '../../helpers'
import React from 'react'
import { Grid } from '@mui/material'

interface TitleHeaderProps {
  title: string
}

const TitleHeader: React.FC<TitleHeaderProps> = (props: TitleHeaderProps) => {
  return (
    <div>
      <Typography
        component="h3"
        variant="regular"
        style={{ textAlign: 'center', textTransform: 'uppercase' }}
      >
        Carrefour Operațional
      </Typography>
      <Typography
        component="h2"
        variant="medium"
        style={{ textAlign: 'center', textTransform: 'uppercase' }}
      >
        {getTitle()}
      </Typography>
      <Typography
        component="h4"
        variant="medium"
        style={{ textAlign: 'center', textTransform: 'uppercase', color: 'black' }}
      >
        {props.title}
      </Typography>
    </div>
  )
}

export default TitleHeader
