import { Grid, Container } from "@mui/material"
import { Button, Checkbox, Input, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./RecordReturn.modules.scss"
import useRoles from "../../useRoles"
import { useMemo } from "react"
import { getValidationSchema, initialValues } from "./helpers"
import { useFormik } from "formik"
import { formatErrorMessage } from "../../../../utils/formatting"
import { useNotification } from "../../../../hooks"

const RecordReturn = () => {
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
            ÎNREGISTRARE RETUR
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                type="select"
                label="Destinație"
                variant="standard"
                width="100%"
                value={formik.values.destination}
                onChange={event => formik.setFieldValue("destination", (event.target as HTMLInputElement).value)}
                error={!!formik.errors.destination}
                helperText={formik.errors.destination as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="text"
                label="Numǎr înmatriculare"
                variant="standard"
                width="100%"
                value={formik.values.registrationNumber}
                onChange={event => formik.setFieldValue("registrationNumber", (event.target as HTMLInputElement).value)}
                error={!!formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="text"
                label="Șofer"
                variant="standard"
                width="100%"
                value={formik.values.driver}
                onChange={event => formik.setFieldValue("driver", (event.target as HTMLInputElement).value)}
                error={!!formik.errors.driver}
                helperText={formik.errors.driver as string}
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox
                checked={formik.values.isPackingReturn}
                onChange={event => formik.setFieldValue("isPackingReturn", (event.target as HTMLInputElement).checked)}
                label="Retur ambalaje"
              />
            </Grid>
            <Grid container alignItems="center" justifyContent="center" style={{ marginTop: "20px" }}>
              <Button
                type="button"
                variant="contained"
                label="TRANSMITERE COMANDA"
                onClick={() => formik.handleSubmit()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RecordReturn
