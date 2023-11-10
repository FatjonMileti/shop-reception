import { useContext } from "react"
import { AppBar, Typography } from "@fullscreendigital/carrefour-dex-fe"
import { ArrowBackIos, Menu } from "@mui/icons-material"
import { DrawerContext } from "contexts"
import s from "./Header.scss"
import { Grid, useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

const DesktopAppBar = ({ handleOpenMenu }) => {
  const { isMenuOpen } = useContext(DrawerContext)
  return <AppBar
    id="back-to-top-anchor"
    style={{
      zIndex: "1201",
      transition: "all 0.3s ease"
    }}
    mainItem={{
      content: <img src="images/carrefour.png" style={{ width: "100%" }} />,
      style: {
        position: "absolute",
        display: "flex",
        width: "60px",
        left: `calc(50% - 30px)`
      }
    }}
    position="relative"
    menuIcon={
      <span className={s.notificationsContainer}>{/* <NotificationsNoneOutlined /> */}</span>
    }
    rightItems={
      isMenuOpen
        ? []
        : [
          {
            onClick: x => handleOpenMenu(x),
            iconProps: {
              icon: <Menu />,
              iconButtonProps: { size: "large" }
            }
          }
        ]
    }
  />
}
const MobileAppBar = ({ handleOpenMenu }) => {
  const { isMenuOpen } = useContext(DrawerContext)
  const navigate = useNavigate()
  const location = useLocation()
  return <AppBar
    hideMenuIcon={location.pathname.includes("/merchandise/home") || !location.pathname.includes("merchandise")}
    menuIcon={<Grid container>
      <Grid item xs={6} style={{ marginRight: "-7px" }}>
        <ArrowBackIos />
      </Grid>
      <Grid item xs={6}>
        <Typography component="p" style={{ fontSize: "16px", paddingTop: "4px" }} variant="medium">
          Înapoi
        </Typography>
      </Grid>
    </Grid>}
    iconButtonProps={{
      onClick: (x) => {
        console.log("go back")
        navigate(-1)
      },
      size: "large",
      style: {
        marginRight: "2rem"
      }
    }}
    mainItem={{
      content: <img src="images/carrefour.png" style={{ width: "100%" }} />,
      style: {
        position: "absolute",
        display: "flex",
        width: "60px",
        left: `calc(50% - 30px)`
      }
    }}
    position="static"
    rightItems={
      isMenuOpen
        ? []
        : [
          {
            onClick: x => handleOpenMenu(x),
            iconProps: {
              icon: <Menu />,
              iconButtonProps: { size: "large" }
            }
          }
        ]
    }
  />
}

const Header = ({ handleOpenMenu }) => {
  const isMobile = useMediaQuery("(max-width:600px)")

  return (
    <>
      {isMobile ?
        <MobileAppBar handleOpenMenu={handleOpenMenu} /> :
        <DesktopAppBar handleOpenMenu={handleOpenMenu} />
      }
    </>
  )
}

export default Header
