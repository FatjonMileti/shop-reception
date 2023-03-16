import { useEffect, useState } from 'react'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import Favicon from 'react-favicon'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { ErrorBoundary } from 'components/core-ui'
import { DrawerContext } from 'contexts'
import { DRAWER_WIDTH } from 'utils/constants'
import { useAuth } from 'oidc-react'
import s from './Layout.scss'
import { setToken } from 'utils/authService'

const Layout = ({ children, setModules, setApplicationModulesPages, setSubdomainId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(DRAWER_WIDTH)

  const auth = useAuth()

  useEffect(() => {
    setDrawerWidth(isMenuOpen ? DRAWER_WIDTH : 0)
  }, [isMenuOpen])

  useEffect(() => {
    if (auth?.userData) {
      setToken(auth.userData.id_token)
      console.log('new token set!!!!!!!!!!!!')
    }
  }, [auth.userData])

  const handleOpenMenu = () => {
    setIsMenuOpen(true)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <DrawerContext.Provider
      value={{
        drawerWidth,
        isMenuOpen
      }}
    >
      <Typography variant="light" component="div">
        <Favicon url="images/favicon.ico" />
        <div>
          <Header handleOpenMenu={handleOpenMenu} />
          <Sidebar
            isMenuOpen={isMenuOpen}
            handleCloseMenu={handleCloseMenu}
            setModules={setModules}
            setApplicationModulesPages={setApplicationModulesPages}
            setSubdomainId={setSubdomainId}
          />
          <div className={s.contentWrapper}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </div>
      </Typography>
    </DrawerContext.Provider>
  )
}

export default Layout
