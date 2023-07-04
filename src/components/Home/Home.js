import { useNavigate } from 'react-router-dom'
import { Accordion, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Icon } from 'components/core-ui/Icon'
import { Box } from '@mui/material'
import s from '../ServiceDomain/ServiceDomain.scss'

const Home = ({ modules, setSubdomainId }) => {
  const navigate = useNavigate()

  return (
    <div className={s.modulePaper}>
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
                        <Icon iconName={app.icon} />
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
