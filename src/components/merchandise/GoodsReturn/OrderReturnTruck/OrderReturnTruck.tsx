import { Grid, Container, Paper, Box } from "@mui/material"
import { Button, Input, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./OrderReturnTruck.modules.scss"
import useRoles from "../../useRoles"
import { useMemo } from "react"
import { getValidationSchema, initialValues } from "./helpers"
import { useFormik } from "formik"
import { formatErrorMessage } from "../../../../utils/formatting"
import { useNotification } from "../../../../hooks"

const OrderReturnTruck = () => {
  const { isShopUser, isHubUser, isWareHouseUser } = useRoles()
  const { showNotification } = useNotification()

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

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = {
          username: formik.values.username,
          password: formik.values.password
        }

        console.log(payload)

      } catch (error) {
        showNotification({
          message: `Error while submitting. ${formatErrorMessage(error)}`,
          type: "error"
        })
      }
    }
  })

  return (
    <Container component="main" maxWidth="xs" className={s.container}>
      <Typography component="h3" variant="regular" style={{ textAlign: "center", textTransform: "uppercase" }}>Carrefour
        Operațional</Typography>
      <Typography component="h2" variant="medium" style={{ textAlign: "center", textTransform: "uppercase" }}>
        {getTitle()}
      </Typography>
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Typography component="h4" variant="medium"
                      style={{ textAlign: "center", textTransform: "uppercase", color: "black" }}>
            COMANDǍ CAMION RETUR
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type="select"
                label="Locație descǎrcare"
                variant="standard"
                width="100%"
                value={formik.values.location}
                onChange={event => formik.setFieldValue("location", (event.target as HTMLInputElement).value)}
                error={!!formik.errors.location}
                helperText={formik.errors.location as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="number"
                label="Numǎr stive"
                variant="standard"
                width="100%"
                value={formik.values.stacks}
                onChange={event => formik.setFieldValue("stacks", (event.target as HTMLInputElement).value)}
                error={!!formik.errors.stacks}
                helperText={formik.errors.stacks as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" variant="regular">
                Pot fi inițiate comenzi de minim 25 stive și maxim 33.
              </Typography>
            </Grid>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: "20px" }}>
              <Button
                type="button"
                variant="contained"
                label="TRANSMITERE COMANDǍ"
                onClick={() => formik.handleSubmit()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default OrderReturnTruck
