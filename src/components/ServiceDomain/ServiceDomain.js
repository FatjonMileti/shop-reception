import { CircularProgress, Grid } from '@mui/material'
import BackButton from 'components/core-ui/BackButtonTitle/BackButton/BackButton'
import { Icon_v2 } from 'components/core-ui/Icon_v2'
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

  const { submodule } = useMemo(() => {
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
      <div className={s.modulePaper}>
        <Grid container direction="column">
          <Grid item>
            <div className={s.backHolder}>
              <BackButton text={submodule?.name} onNavBack={goBack}></BackButton>
            </div>
          </Grid>
          <Grid item style={{ marginTop: '16px' }}>
            <Grid container direction="row" spacing={4}>
              {applicationPages
                .filter(app => app.isFirstScreen)
                .map(app => (
                  <Grid item key={app.screenId}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      onClick={() => navigate(app.route.url)}
                      className={s.applicationContainer}
                    >
                      <Grid item>
                        <Icon_v2 iconName={app.icon} iconType="Subcategory" />
                      </Grid>
                      <Grid item className={s.applicationName}>
                        <span>{app.name}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  )
}

export default ServiceDomain
