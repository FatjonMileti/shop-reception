import {
  Accordion,
  Salutation,
  Typography,
  WeatherWidget
} from '@fullscreendigital/carrefour-dex-fe'
import { Box, CircularProgress } from '@mui/material'
import { Icon } from 'components/core-ui/Icon'
import { useGetLocation } from 'hooks'
import { useNavigate } from 'react-router-dom'
import { getUserFirstName } from '../../utils/authService'
import s from '../ServiceDomain/ServiceDomain.scss'

const Home = ({ modules, setSubdomainId }) => {
  const navigate = useNavigate()
  const { location, loading: isLocationLoading, error: isErrorGettingLocation } = useGetLocation()
  const username = getUserFirstName()

  return (
    <div className={s.modulePaper}>
      <Salutation name={username} />
      {isLocationLoading ? (
        <div style={{ display: 'flex' }}>
          <CircularProgress color="primary" style={{ margin: '40px auto' }} disableShrink />
        </div>
      ) : (
        <WeatherWidget location={isErrorGettingLocation ? 'Bucuresti' : location} />
      )}

      {modules.length ? (
        modules.map((module, index) => {
          return (
            <Accordion
              key={module.id}
              summary={
                <Typography variant="medium">
                  <span className={s.moduleSummary}>
                    <Icon iconName={module.icon} tiny={true} />
                    {module.name}
                  </span>
                </Typography>
              }
              details={
                <Box className={s.applicationsWrapper} style={{ justifyContent: 'center' }}>
                  {module.submodules.map(app => (
                    <div
                      key={app.id}
                      onClick={() => {
                        localStorage.setItem('selectedSubdomainId', app.id)
                        setSubdomainId(app.id)
                        navigate(app.routeURL)
                      }}
                      className={s.applicationContainer}
                    >
                      <div className={s.iconContainer}>
                        <Icon iconName={app.icon} fill="white" />
                      </div>
                      <span className={s.applicationName}>{app.name}</span>
                    </div>
                  ))}
                </Box>
              }
              // disableGutters
              defaultExpanded={index == 0}
              id={module.id}
              onChange={function noRefCheck() {}}
            />
          )
        })
      ) : (
        <div className={s.emptyWarning}>Nu aveti nici un modul asignat.</div>
      )}
    </div>
  )
}

export default Home
