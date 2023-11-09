import { Grid, Container } from "@mui/material"
import { Input, Button, Typography } from "@fullscreendigital/carrefour-dex-fe"

const Login = () => {
  return (
    <Container component="main" maxWidth="xs" style={{ margin: "auto", marginTop: "20px" }}>
      <Typography component="h1" variant="medium">
        Login
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              type="text"
              label="Username"
              variant="standard"
              width="100%"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="password"
              label="Password"
              variant="standard"
              width="100%"
              required
            />
          </Grid>
          <Grid container xs={12} alignItems="center" justifyContent="center" style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              label="Sign In"
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login
