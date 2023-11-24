import { Divider, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Box, CircularProgress, Paper } from '@mui/material'
import BackButton from 'components/core-ui/BackButtonTitle/BackButton/BackButton'
import { Icon } from 'components/core-ui/Icon'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ServiceDomain.scss'

const ServiceDomain = ({
  subdomainId,
  modules,
  applicationPages,
  hasLoadedActivities,
  isLoadingActivities
}) => {
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
    ((!applicationPages.length || hasLoadedActivities != subdomainId || isLoadingActivities) && (
      <div style={{ display: 'flex' }}>
        <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
      </div>
    )) || (
      <Box>
        <Box className={s.moduleHeader}>
          <div className={s.backHolder}>
            <BackButton text={submodule?.name} onNavBack={goBack}></BackButton>
          </div>
        </Box>

        <Paper className={s.modulePaper}>
          <Box className={s.submoduleHeader}>
            <Typography variant="medium">
              <span className={s.moduleSummary}>
                <Icon iconName={submodule?.icon || 'EmojiNature'} tiny={true} />
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
                    <Icon iconName={app.icon} fill="white" />
                  </div>
                  <span className={s.applicationName}>{app.name}</span>
                </div>
              ))}
          </Box>
        </Paper>
      </Box>
    )
  )
}

export default ServiceDomain
