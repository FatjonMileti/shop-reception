import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Box, Paper, Toolbar } from '@mui/material'
import s from './MainLayout.modules.scss'
import { IconBox } from '../IconBox'
import { Icon } from '../../../../core-ui/Icon'
import React from 'react'

interface Link {
  icon: React.ReactNode
  title: string
  onClick: any
}

interface MainLayoutProps {
  title?: string
  links: Array<Link>
  toolbarButtons: Array<React.ReactNode>
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { title, links, toolbarButtons } = props

  return <Paper className={s.paper}>
    {title && <Typography component='h2' variant='regular'
                 style={{ textAlign: 'center', textTransform: 'uppercase' }}>
      {title}
    </Typography>}

    <Toolbar className={s.toolbar}>
      {toolbarButtons}
    </Toolbar>

    <Box className={s.container}>
      {links.map((link, index) => (
        <IconBox
          icon={link.icon ?? <Icon iconName='Admin' fill='white' />}
          onClick={link.onClick ?? null}
          title={link.title}
        />
      ))}
    </Box>
  </Paper>
}

export default MainLayout