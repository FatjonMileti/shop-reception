import { Grid, Container, Paper, Box } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./Home.modules.scss"
import { URLS } from "../constants"
import { useNavigate } from "react-router-dom"
import { Icon } from "../../core-ui/Icon"

const Home = () => {
  const navigate = useNavigate()

  const getTitle = () => {
    return "Nu"
  }

  return (
    <Paper className={s.paper}>
      <Typography component="h2" variant="regular" style={{ textAlign: "center", textTransform: "uppercase" }}>Home</Typography>
      <Box className={s.container}>
        <Box className={s.applicationsWrapper}>
          <div
            onClick={() => null}
            className={s.applicationContainer}
          >
            <div className={s.iconContainer}>
              <Icon iconName="Admin" fill="white" />
            </div>
            <span className={s.applicationName}>Administration</span>
          </div>
        </Box>
        <Box className={s.applicationsWrapper}>
          <div
            onClick={() => null}
            className={s.applicationContainer}
          >
            <div className={s.iconContainer}>
              <Icon iconName="StoreManager" fill="white" />
            </div>
            <span className={s.applicationName}>Shop reception</span>
          </div>
        </Box>
        <Box className={s.applicationsWrapper}>
          <div
            onClick={() => null}
            className={s.applicationContainer}
          >
            <div className={s.iconContainer}>
              <Icon iconName="ClustersManagement" fill="white" />
            </div>
            <span className={s.applicationName}>Packages</span>
          </div>
        </Box>
      </Box>
    </Paper>
  )
}

export default Home
