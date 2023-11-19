import { Paper, Box } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./ReceptionDashboard.modules.scss"
import { URLS } from "../constants"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../core-ui/Icon"
import { IconBox } from "../IconBox"
import Toolbar from "@mui/material/Toolbar"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const links = [
  {
    icon: <Icon iconName="Admin" fill="white" />,
    title: "Bonuri de livrare"
  },
  {
    icon: <Icon iconName="Admin" fill="white" />,
    title: "Listă camioane marfă"
  },
  {
    icon: <Icon iconName="Admin" fill="white" />,
    title: "Suporţi cu destinaţie eronată"
  },
  {
    icon: <Icon iconName="Admin" fill="white" />,
    title: "Produse necomandate"
  },
  {
    icon: <Icon iconName="Admin" fill="white" />,
    title: "Fişiere Meti"
  },
  {
    icon: <Icon iconName="Admin" fill="white" />,
    title: "Produse cu diferenţe"
  },
  {
    icon: <Icon iconName="Admin" fill="white" />,
    title: "Transabilitate suport"
  }
]

const ReceptionDashboard = () => {
  const navigate = useNavigate()

  const getTitle = () => {
    return "Nu"
  }

  return (
    <Paper className={s.paper}>
      <Typography component="h2" variant="regular"
                  style={{ textAlign: "center", textTransform: "uppercase" }}>Tabloul de bord de recepție</Typography>

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
            icon={link.icon}
            onClick={() => null}
            title={link.title}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default ReceptionDashboard
