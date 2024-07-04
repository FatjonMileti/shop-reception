import { Salutation, WeatherWidget } from '@fullscreendigital/carrefour-dex-fe'
import { Chip, CircularProgress, Grid } from '@mui/material'
import { Icon_v2 } from 'components/core-ui/Icon_v2'
import { useGetLocation } from 'hooks'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserFirstName } from '../../utils/authService'
import s from '../ServiceDomain/ServiceDomain.scss'

const Home = ({ modules, setSubdomainId }) => {
  const navigate = useNavigate()

  const [selectedModule, setSelectedModule] = useState(modules[0])
  const { location, loading: isLocationLoading, error: isErrorGettingLocation } = useGetLocation()
  const username = getUserFirstName()

  return (
    <div className={s.modulePaper}>
      <Salutation name={username} />
      {isLocationLoading ? (
        <></>
      ) : (
        <WeatherWidget location={isErrorGettingLocation ? 'Bucuresti' : location} />
      )}

      {modules.length ? (
        <Grid container direction="column">
          <Grid item style={{ marginTop: '16px' }}>
            <div>
              <span className={s.homeHeader}>Aplicatii</span>
              <span style={{ marginLeft: '8px' }}>
                <Icon_v2 iconName="Folder" iconType="Icon"></Icon_v2>
              </span>
            </div>
          </Grid>
          <Grid item style={{ marginTop: '16px' }}>
            <Grid container direction="row" spacing={2}>
              {modules.map((module, index) => (
                <Grid item key={module.id}>
                  <Chip
                    color={selectedModule?.id === module.id ? 'primary' : 'default'}
                    key={index}
                    label={module.name}
                    onClick={() => setSelectedModule(module)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '16px' }}>
            <Grid container direction="row" spacing={4}>
              {selectedModule?.submodules.map(app => (
                <Grid item key={app.routeURL}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => {
                      localStorage.setItem('selectedSubdomainId', app.id)
                      setSubdomainId(app.id)
                      navigate(app.routeURL)
                    }}
                    className={s.applicationContainer}
                  >
                    <Grid item>
                      <Icon_v2 iconName={app.icon} iconType="Home" />
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
      ) : (
        <div className={s.emptyWarning}>Nu aveti nici un modul asignat.</div>
      )}
    </div>
  )
}

export default Home
