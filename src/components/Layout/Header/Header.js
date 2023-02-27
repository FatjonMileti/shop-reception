import { useContext } from 'react'
import { AppBar } from '@fullscreendigital/carrefour-dex-fe'
import { NotificationsNoneOutlined } from '@mui/icons-material'
import { DrawerContext } from 'contexts'
import { Logo } from './Logo'
import s from './Header.scss'

const Header = ({ isMenuOpen }) => {
  const drawerContext = useContext(DrawerContext)

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
                width: `calc(100% - ${drawerContext.drawerWidth}px)`,
                marginRight: `${drawerContext.drawerWidth}px`
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
