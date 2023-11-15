import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    registrationNumber: Yup.string().required("numărul de înregistrare este un câmp obligatoriu"),
    driver: Yup.string().required("driverul este un câmp obligatoriu"),
    sealNumber: Yup.string().required("Numărul sigiliului este un câmp obligatoriu")
  })

export const initialValues = {
  registrationNumber: "",
  driver: "",
  sealNumber: ""
}