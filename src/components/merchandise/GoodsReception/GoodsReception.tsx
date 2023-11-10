import { Grid, Container, Paper } from "@mui/material"
import { Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./GoodsReception.modules.scss"
import { URLS } from '../constants'

const GoodsReception = () => {
  var isShopUser = false;
  var isHubUser = true;
  var isWareHouseUser = false;

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
              />
            </Grid>}
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ÎN PROCESARE RECEPȚIE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isShopUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="VALIDATE LIVRARE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="CAMIOANE ASTEPTATE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ÎNREGISTREAZǍ CAMION"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ÎN PROCESARE EXPENDIȚIE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isHubUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="CAMIOANE EXPEDIATE"
                style={{ width: "100%" }}
              />
            </Grid>}
          </Grid>
        </form>
      </Container>
    </Paper>
  );
}

export default GoodsReception
