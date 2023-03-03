import { useEffect, useState } from 'react'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import Favicon from 'react-favicon'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { ErrorBoundary } from 'components/core-ui'
import { isAuthenticated } from 'utils/authService'
import { DrawerContext } from 'contexts'
import { DRAWER_WIDTH } from 'utils/constants'
import s from './Layout.scss'

const Layout = ({ children, setApplicationModulesPages, setSubdomainId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(DRAWER_WIDTH)

  useEffect(() => {
    setDrawerWidth(isMenuOpen ? DRAWER_WIDTH : 0)
  }, [isMenuOpen])

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
        {isAuthenticated() ? (
          <div>
            <Header handleOpenMenu={handleOpenMenu} />
            <Sidebar
              isMenuOpen={isMenuOpen}
              handleCloseMenu={handleCloseMenu}
              setApplicationModulesPages={setApplicationModulesPages}
              setSubdomainId={setSubdomainId}
            />
            <div className={s.contentWrapper}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </div>
        ) : (
          <ErrorBoundary>{children}</ErrorBoundary>
        )}
      </Typography>
    </DrawerContext.Provider>
  )
}

export default Layout
