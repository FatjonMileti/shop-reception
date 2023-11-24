import { Grid, Container, Paper } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./GoodsReception.modules.scss"
import { URLS } from '../constants'
import useRoles from "../useRoles"
import { useNavigate } from "react-router-dom"

const GoodsReception = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles();
  const navigate = useNavigate();

  const getTitle = () => {
    if (isShopUser) {
      return "Hyper Oradea";
    } else if (isHubUser) {
      return "HUB CLUJ";
    } else if (isWareHouseUser) {
      return "DEPOZIT CEFIN AMBIENT";
    }
    return "Nu";
  }

  return (
    <Paper className={s.paper}>
      <Container component="main" maxWidth="xs" className={s.container}>
        <Typography component="h3" variant="regular" style={{ textAlign: "center", textTransform: "uppercase" }}>Carrefour Operațional</Typography>
        <Typography component="h2" variant="medium" style={{ textAlign: "center", textTransform: "uppercase" }}>
          {getTitle()}
        </Typography>
        <form>
          <Grid container spacing={2} className={s.wrapper}>
            {isShopUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="LISTǍ CAMIOANE"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_LIST_TRUCKS);
                }}
              />
            </Grid>}
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ÎN PROCESARE RECEPȚIE"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_RECEPTION_PROCESSING);
                }}
              />
            </Grid>}
            {isShopUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="VALIDARE LIVRARE"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_DELIVERY);
                }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="CAMIOANE AȘTEPTATE"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_EXPECTED_TRUCKS);
                }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ÎNREGISTREAZǍ CAMION"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_REGISTER_TRUCK);
                }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ÎN PROCESARE EXPEDIȚIE"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_PROCESSING_SHIPMENT);
                }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="CAMIOANE EXPEDIATE"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate(URLS.AUTH_SHIPPED_TRUCKS);
                }}
              />
            </Grid>}
          </Grid>
        </form>
      </Container>
    </Paper>
  );
}

export default GoodsReception
