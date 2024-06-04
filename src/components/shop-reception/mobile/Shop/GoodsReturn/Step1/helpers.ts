import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    destination: Yup.string().required("Destinație este un câmp necesar"),
    returnHub: Yup.string(),
    registrationNumber: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, "Numărul camionului poate conţine doar litere şi cifre! Exemplu: IF01ABC")
      .required("Numărul de înmatriculare este un câmp necesar"),
    driver: Yup.string().required("Șoferul este un câmp necesar"),
    isPackingReturn: Yup.boolean(),
    isProductReturn: Yup.boolean()
  })

export const initialValues = {
  destination: "",
  returnHub: "",
  registrationNumber: "",
  driver: "",
  isPackingReturn: true,
  isProductReturn: false
}
