import { useState } from 'react'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import Favicon from 'react-favicon'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { ErrorBoundary } from 'components/core-ui'
import { isAuthenticated } from 'utils/authService'
import s from './Layout.scss'

const drawerWidth = 300

const Layout = ({ children, setGeneralPages, setSubdomainId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  const handleOpenMenu = () => {
    setIsMenuOpen(true)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <Typography variant="light" component="div">
      <Favicon url="images/favicon.ico" />
      {isAuthenticated() ? (
        <div style={{ display: 'flex' }}>
          <Header
            isMenuOpen={isMenuOpen}
            handleOpenMenu={handleOpenMenu}
            drawerWidth={drawerWidth}
          />
          <Sidebar
            isMenuOpen={isMenuOpen}
            handleCloseMenu={handleCloseMenu}
            drawerWidth={drawerWidth}
            setGeneralPages={setGeneralPages}
            setSubdomainId={setSubdomainId}
          />
          <div
            className={s.contentWrapper}
            style={{
              ...(isMenuOpen ? { marginRight: `${drawerWidth}px` } : { marginRight: 0 })
            }}
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </div>
      ) : (
        <ErrorBoundary>{children}</ErrorBoundary>
      )}
    </Typography>
  )
}

export default Layout
