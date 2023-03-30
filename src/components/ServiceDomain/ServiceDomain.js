import { useNavigate } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import { Icon } from 'components/core-ui/Icon'
import s from './ServiceDomain.scss'
import { Divider, IconButton, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { useMemo } from 'react'
import { ArrowBackOutlined } from '@mui/icons-material'

const ServiceDomain = ({ subdomainId, modules, applicationPages }) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate('/')
  }

  const { module, submodule } = useMemo(() => {
    var mod, sub
    modules.forEach(m =>
      m.submodules.forEach(s => {
        if (s.id == subdomainId) {
          mod = m
          sub = s
        }
      })
    )
    return { module: mod, submodule: sub }
  }, [subdomainId, modules])

  return (
    <Box>
      <Box className={s.moduleHeader}>
        <IconButton className={s.logo} onClick={goBack}>
          <ArrowBackOutlined />
        </IconButton>

        <Typography variant="medium">
          <span className={s.moduleSummary}>
            <Icon iconName={module?.icon || 'EmojiNature'} />
            {module?.name || ''}
          </span>
        </Typography>
      </Box>

      <Paper className={s.modulePaper}>
        <Box className={s.submoduleHeader}>
          <Typography variant="medium">
            <span className={s.moduleSummary}>
              <Icon iconName={submodule?.icon || 'EmojiNature'} />
              {submodule?.name || ''}
            </span>
          </Typography>
        </Box>
        <Divider component="hr" variant="middle" />
        <Box className={s.applicationsWrapper}>
          {applicationPages
            .filter(app => app.isFirstScreen)
            .map(app => (
              <div
                key={app.screenId}
                onClick={() => navigate(app.route.url)}
                className={s.applicationContainer}
              >
                <div className={s.iconContainer}>
                  <Icon iconName={app.icon} />
                </div>
                <span className={s.applicationName}>{app.name}</span>
              </div>
            ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default ServiceDomain
