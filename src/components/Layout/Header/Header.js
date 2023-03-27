import { useContext } from 'react'
import { AppBar } from '@fullscreendigital/carrefour-dex-fe'
import { NotificationsNoneOutlined, DragHandleOutlined } from '@mui/icons-material'
import { DrawerContext } from 'contexts'
import { Logo } from './Logo'
import s from './Header.scss'

const Header = ({ handleOpenMenu }) => {
  const { isMenuOpen } = useContext(DrawerContext)

  return (
    <>
      <AppBar
        id="back-to-top-anchor"
        position="fixed"
        style={{
          zIndex: '1201',
          transition: 'all 0.3s ease'
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
        rightItems={
          isMenuOpen
            ? []
            : [
                {
                  onClick: x => handleOpenMenu(x),
                  iconProps: {
                    icon: (<DragHandleOutlined />),
                    iconButtonProps: { size: 'large' }
                  }
                }
              ]
        }
      />
    </>
  )
}

export default Header
