import { Grid, Container, Paper } from "@mui/material"
import { Input, Button, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./Home.modules.scss"

const Home = () => {
  return (
    <Paper className={s.paper}>
      <Container component="main" maxWidth="xs" className={s.container}>
        <Typography component="h1" variant="medium" style={{ textAlign: "center", textTransform: "uppercase" }}>
          Hyper Oradea
        </Typography>
        <form>
          <Grid container spacing={2} className={s.wrapper}>
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="Goods Receptions"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="Return Receptions"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                label="Add Inventory"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
}

export default Home
