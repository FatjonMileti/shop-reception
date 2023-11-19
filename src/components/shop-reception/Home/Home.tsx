import { Grid, Container, Paper, Box } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./Home.modules.scss"
import { URLS } from "../constants"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../core-ui/Icon"
import { IconBox } from "../IconBox"
import DownloadIcon from '@mui/icons-material/Download';
import Toolbar from "@mui/material/Toolbar"

const Home = () => {
  const navigate = useNavigate()

  const getTitle = () => {
    return "Nu"
  }

  return (
    <Paper className={s.paper}>
      <Typography component="h2" variant="regular"
                  style={{ textAlign: "center", textTransform: "uppercase" }}>ACASĂ</Typography>

      <Toolbar className={s.toolbar}>
        <Button label="Manual utilizare aplicaţie mobil" size="small" variant="outlined">
          <DownloadIcon />
        </Button>
        <Button label="Manual utilizare aplicaţie administrare" size="small" variant="outlined">
          <DownloadIcon />
        </Button>
        <Button label="APK Receptie Marfa V0.7.4" size="small" variant="outlined">
          <DownloadIcon />
        </Button>
        <Button label="APK Receptie Marfa V0.7.5" size="small" variant="outlined">
          <DownloadIcon />
        </Button>
      </Toolbar>

      <Box className={s.container}>
        <IconBox
          icon={<Icon iconName="Admin" fill="white" />}
          onClick={() => null}
          title="Administrare"
        />
        <IconBox
          icon={<Icon iconName="StoreManager" fill="white" />}
          onClick={() => null}
          title="Recepţie marfă"
        />
        <IconBox
          icon={<Icon iconName="ClustersManagement" fill="white" />}
          onClick={() => null}
          title="Ambalaje"
        />
      </Box>
    </Paper>
  )
}

export default Home
