import { AppBar } from '@fullscreendigital/carrefour-dex-fe'
import { NotificationsNoneOutlined } from '@mui/icons-material'
import { Logo } from './Logo'
import s from './Header.scss'

const Header = ({ isMenuOpen, drawerWidth }) => {
  return (
    <>
      <AppBar
        id="back-to-top-anchor"
        position="fixed"
        style={{
          zIndex: '1201',
          right: '1px',
          ...(isMenuOpen
            ? {
                width: `calc(100% - ${drawerWidth}px)`,
                marginRight: `${drawerWidth}px`
              }
            : {})
        }}
        mainItem={{
          content: <Logo />,
          style: {
            position: 'absolute',
            left: `calc(50% - 24px)`
          }
        }}
        hasBackground
        menuIcon={
          <span className={s.notificationsContainer}>
            <NotificationsNoneOutlined />
          </span>
        }
      />
    </>
  )
}

export default Header
