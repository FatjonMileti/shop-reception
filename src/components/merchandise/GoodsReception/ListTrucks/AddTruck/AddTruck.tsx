import { Grid, Container } from "@mui/material"
import { Button, Input, Typography } from "@fullscreendigital/carrefour-dex-fe"
import s from "./AddTruck.modules.scss"
import { useMemo } from "react"
import { getValidationSchema, initialValues } from "./helpers"
import { useFormik } from "formik"
import { formatErrorMessage } from "../../../../../utils/formatting"
import { useNotification } from "../../../../../hooks"
import TitleHeader from '../../../TitleHeader/TitleHeader'

const AddTruck = () => {
  const { showNotification } = useNotification()

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {

        const payload = {
          registrationNumber: formik.values.registrationNumber,
          driver: formik.values.driver,
          sealNumber: formik.values.sealNumber,
        }

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
      <TitleHeader />
      <Grid container spacing={2} className={s.wrapper}>
        <Grid item xs={12}>
          <Typography component="h4" variant="medium"
                      style={{ textAlign: "center", textTransform: "uppercase", color: "black" }}>
            ADAUGǍ CAMION
          </Typography>
          <Grid container spacing={2}>
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
              <Input
                type="text"
                label="Numǎr Sigiliu"
                variant="standard"
                width="100%"
                value={formik.values.sealNumber}
                onChange={event => formik.setFieldValue("sealNumber", (event.target as HTMLInputElement).value)}
                error={!!formik.errors.sealNumber}
                helperText={formik.errors.sealNumber as string}
              />
            </Grid>
            <Grid item xs={12} style={{textAlign: 'right'}}>
              <Button
                type="button"
                variant="outlined"
                label="+ ADAUGǍ ALT SIGILIU"
              />
            </Grid>

            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid item xs={12} style={{textAlign: 'center'}}>
                <Button
                  type="button"
                  variant="contained"
                  label="PASUL URMǍTOR"
                  onClick={() => formik.handleSubmit()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddTruck
