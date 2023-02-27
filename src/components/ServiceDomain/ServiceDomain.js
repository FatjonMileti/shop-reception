import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { Icon } from 'components/core-ui/Icon'
import { DrawerContext } from 'contexts'
import s from './ServiceDomain.scss'

const ServiceDomain = ({ applicationPages }) => {
  const navigate = useNavigate()

  const { drawerWidth } = useContext(DrawerContext)

  return (
    <Box
      className={s.applicationsContainer}
      style={{ margin: `24px`, marginRight: `calc(24px + ${drawerWidth}px)` }}
    >
      {applicationPages.map(app => (
        <div
          key={app.id}
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
  )
}

export default ServiceDomain
