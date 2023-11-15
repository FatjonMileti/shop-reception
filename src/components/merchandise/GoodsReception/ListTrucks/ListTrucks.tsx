import { Grid, Container, Paper } from "@mui/material"
import { Button, Divider, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./ListTrucks.modules.scss"
import { URLS } from "../../constants"
import useRoles from "../../useRoles"
import { useNavigate } from "react-router-dom"

const ListTrucks = () => {
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

  const list: Truck[] = [
    { name: "Camion 1", description: "Descriere camion 1" },
    { name: "Camion 2", description: "Descriere camion 2" },
    { name: "Camion 3", description: "Descriere camion 3" }
  ]

  return (
    <Container component="main" maxWidth="xs" className={s.container}>
      <Typography component="h3" variant="regular" style={{ textAlign: "center", textTransform: "uppercase" }}>Carrefour
        Operațional</Typography>
      <Typography component="h2" variant="medium" style={{ textAlign: "center", textTransform: "uppercase" }}>
        {getTitle()}
      </Typography>
      <form>
        <Grid container spacing={2} className={s.wrapper}>
          <Grid item xs={12}>
            <Typography component="h4" variant="medium"
                        style={{ textAlign: "center", textTransform: "uppercase", color: "black" }}>
              Selecteazǎ Camion
            </Typography>
            {list.map((item: Truck, index) => (
              <Paper key={index} elevation={3} style={{ margin: "10px", padding: "20px" }}>
                <Typography variant="medium" component="h5">{item.name}</Typography>
                <Typography variant="medium" component="p">{item.description}</Typography>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Divider>SAU</Divider>
          </Grid>
          {(isShopUser || isHubUser) && <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              label="ADAUGǍ CAMION"
              style={{ width: "100%" }}
              onClick={() => {
                navigate(URLS.AUTH_ADD_TRUCK)
              }}
            />
          </Grid>}
        </Grid>
      </form>
    </Container>
  )
}

export default ListTrucks
