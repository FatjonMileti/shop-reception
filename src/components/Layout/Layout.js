import { useEffect, useState } from "react"
import { Typography } from "@fullscreendigital/carrefour-dex-fe"
import Favicon from "react-favicon"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { ErrorBoundary } from "components/core-ui"
import { DrawerContext } from "contexts"
import { DRAWER_WIDTH } from "utils/constants"
import { useAuth } from "oidc-react"
import s from "./Layout.scss"
import { setToken, isAuthenticated } from "utils/authService"
import { Notification } from "components/Notification"
import { AdminHeader } from "./AdminHeader"

const Layout = ({ children, modules, setSubdomainId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(DRAWER_WIDTH)
  const isAdminPannel = window.location.pathname.includes("shop-reception")

  const auth = useAuth()

  useEffect(() => {
    setDrawerWidth(isMenuOpen ? DRAWER_WIDTH : 0)
  }, [isMenuOpen])

  useEffect(() => {
    if (auth?.userData) {
      setToken(auth.userData.id_token)
      console.log("new token set!!!!!!!!!!!!")
    }
  }, [auth.userData])

  const handleOpenMenu = () => {
    setIsMenuOpen(true)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (<DrawerContext.Provider
    value={{
      drawerWidth, isMenuOpen
    }}
  >
    <Typography variant="light" component="div">
      <Favicon url="images/favicon.ico" />
      <div>
        <Notification />
        {(!isAdminPannel ? (
          <>
            <Header handleOpenMenu={handleOpenMenu} />
            {isAuthenticated() && <Sidebar
              isMenuOpen={isMenuOpen}
              handleCloseMenu={handleCloseMenu}
              modules={modules}
              setSubdomainId={setSubdomainId}
            />}
          </>
        ) : <AdminHeader />)}
        <div className={s.contentWrapper}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </Typography>
  </DrawerContext.Provider>)
}

export default Layout
