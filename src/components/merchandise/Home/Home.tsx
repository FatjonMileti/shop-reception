import { Grid, Container, Paper } from "@mui/material"
import { Input, Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./Home.modules.scss"
import { boolean } from "yup"

const Home = () => {
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
        <Typography component="h2" variant="medium" style={{ textAlign: "center", textTransform: "uppercase" }}>
          {getTitle()}
        </Typography>
        <form>
          <Grid container spacing={2} className={s.wrapper}>
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="RECEPȚIE MARFǍ"
                style={{ width: "100%" }}
              />
            </Grid>}
            {(isShopUser || isHubUser) && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="RETUR AMBALAJE/MARFǍ"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isShopUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="ACTUALIZARE INVENTAR AMBALAJE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isWareHouseUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="RETURURI AŞTEPTATE"
                style={{ width: "100%" }}
              />
            </Grid>}
            {isWareHouseUser && <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="RETUR ÎN CURS DE RECEPȚIE"
                style={{ width: "100%" }}
              />
            </Grid>}
          </Grid>
        </form>
      </Container>
    </Paper>
  );
}

export default Home
