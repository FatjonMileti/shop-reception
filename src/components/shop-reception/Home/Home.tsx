import { Grid, Container, Paper, Box } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./Home.modules.scss"
import { URLS } from "../constants"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../core-ui/Icon"
import { IconBox } from "../IconBox"

const Home = () => {
  const navigate = useNavigate()

  const getTitle = () => {
    return "Nu"
  }

  return (
    <Paper className={s.paper}>
      <Typography component="h2" variant="regular"
                  style={{ textAlign: "center", textTransform: "uppercase" }}>ACASĂ</Typography>
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
