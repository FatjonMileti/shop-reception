import { Grid, Container, Paper, Box } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./AdminDashboard.modules.scss"
import { URLS } from "../constants"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../core-ui/Icon"
import { IconBox } from "../IconBox"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Toolbar from "@mui/material/Toolbar"

const links = [
  {
    title: "Administrare depozite"
  },
  {
    title: "Administrare huburi"
  },
  {
    title: "Administrare magazine"
  },
  {
    title: "Administrare regiuni"
  },
  {
    title: "Centralizare magazine şi huburi"
  },
  {
    title: "Administrare tipuri de scanare"
  },
  {
    title: "Prag valabilitate subfamilii"
  },
  {
    title: "Listă produse METI"
  },
  {
    title: "Administrare produse sensibile"
  },
  {
    title: "Administrare tipuri de ambalaje"
  },
  {
    title: "Administrare produse cu DLC scurt"
  },
  {
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
            icon={<Icon iconName="Admin" fill="white" />}
            onClick={() => null}
            title={link.title}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default AdminDashboard
