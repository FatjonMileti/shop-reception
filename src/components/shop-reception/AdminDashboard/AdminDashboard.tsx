import { Grid, Container, Paper, Box } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./AdminDashboard.modules.scss"
import { URLS } from "../constants"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../core-ui/Icon"
import { IconBox } from "../IconBox"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Toolbar from "@mui/material/Toolbar"

const links = [
  {
    icon: <Icon iconName="Storage" fill="white" />,
    title: "Administrare depozite"
  },
  {
    icon: <Icon iconName="DeviceHub" fill="white" />,
    title: "Administrare huburi"
  },
  {
    icon: <Icon iconName="ShoppingBasket" fill="white" />,
    title: "Administrare magazine"
  },
  {
    icon: <Icon iconName="Public" fill="white" />,
    title: "Administrare regiuni"
  },
  {
    icon: <Icon iconName="VerticalAlignBottom" fill="white" />,
    title: "Centralizare magazine şi huburi"
  },
  {
    icon: <Icon iconName="AdfScanner" fill="white" />,
    title: "Administrare tipuri de scanare"
  },
  {
    icon: <Icon iconName="RuleFolder" fill="white" />,
    title: "Prag valabilitate subfamilii"
  },
  {
    icon: <Icon iconName="Inventory" fill="white" />,
    title: "Listă produse METI"
  },
  {
    icon: <Icon iconName="Favorite" fill="white" />,
    title: "Administrare produse sensibile"
  },
  {
    icon: <Icon iconName="Recycling" fill="white" />,
    title: "Administrare tipuri de ambalaje"
  },
  {
    icon: <Icon iconName="AccessAlarm" fill="white" />,
    title: "Administrare produse cu DLC scurt"
  },
  {
    icon: <Icon iconName="DocumentScanner" fill="white" />,
    title: "Fişiere recepţie Infolog"
  }
]

const AdminDashboard = () => {
  const navigate = useNavigate()

  const getTitle = () => {
    return "Nu"
  }

  return (
    <Paper className={s.paper}>
      <Typography component="h2" variant="regular"
                  style={{ textAlign: "center", textTransform: "uppercase" }}>Tabloul de bord administrativ</Typography>

      <Toolbar className={s.toolbar}>
        <Button
          label="Back"
          size="small"
          variant="contained"
          onClick={() => navigate(URLS.AUTH_HOME)}
        >
          <ArrowBackIcon />
        </Button>
      </Toolbar>

      <Box className={s.container}>
        {links.map((link, index) => (
          <IconBox
            icon={link.icon ?? <Icon iconName="Admin" fill="white" />}
            onClick={() => null}
            title={link.title}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default AdminDashboard
