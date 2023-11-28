import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    registrationNumber: Yup.string().required("Numărul de înmatriculare este un câmp necesar"),
    driver: Yup.string().required("Șoferul este un câmp necesar"),
    sealNumber: Yup.string().required("Număr sigiliu este un câmp necesar")
  })

export const initialValues = {
  registrationNumber: "",
  driver: "",
  sealNumber: ""
}