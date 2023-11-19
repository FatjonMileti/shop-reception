import { Grid, Container, Paper, Box } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./ReceptionDashboard.modules.scss"
import { URLS } from "../constants"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../core-ui/Icon"
import { IconBox } from "../IconBox"
import DownloadIcon from "@mui/icons-material/Download"
import Toolbar from "@mui/material/Toolbar"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const links = [
  {
    title: "Bonuri de livrare"
  },
  {
    title: "Listă camioane marfă"
  },
  {
    title: "Suporţi cu destinaţie eronată"
  },
  {
    title: "Produse necomandate"
  },
  {
    title: "Fişiere Meti"
  },
  {
    title: "Produse cu diferenţe"
  },
  {
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
            icon={<Icon iconName="Admin" fill="white" />}
            onClick={() => null}
            title={link.title}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default ReceptionDashboard
