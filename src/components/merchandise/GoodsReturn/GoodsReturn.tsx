import { Grid, Container, Paper } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./GoodsReturn.modules.scss"
import { URLS } from "../constants"
import useRoles from "../useRoles"
import { useNavigate } from "react-router-dom"

const GoodsReturn = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const navigate = useNavigate()

  const getTitle = () => {
    if (isShopUser) {
      return "Hyper Oradea"
    } else if (isHubUser) {
      return "HUB CLUJ"
    } else if (isWareHouseUser) {
      return "DEPOZIT CEFIN AMBIENT"
    }
    return "Nu"
  }

  return (
    <Paper className={s.paper}>
      <Container component="main" maxWidth="xs" className={s.container}>
        <Typography component="h3" variant="regular" style={{ textAlign: "center", textTransform: "uppercase" }}>Carrefour
          Operațional</Typography>
        <Typography component="h2" variant="medium" style={{ textAlign: "center", textTransform: "uppercase" }}>
          {getTitle()}
        </Typography>
        <form>
          <Grid container spacing={2} className={s.wrapper}>
            {isShopUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="COMANDA CAMION RETUR"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_ORDER_RETURN_TRUCK)
                }}
              />
            </Grid>}
            {isShopUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="CAMIOANE RETUR CONFIRMATE"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_CONFIRM_RETURN_TRUCKS)
                }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="RETURURI AȘTEPTATE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="RETUR ÎN CURS DE RECEPȚIE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ÎNREGISTRARE RETUR"
                style={{ width: "100%" }}
              />
            </Grid>}
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="CONTINUARE RETUR"
                style={{ width: "100%" }}
              />
            </Grid>}
          </Grid>
        </form>
      </Container>
    </Paper>
  )
}

export default GoodsReturn
