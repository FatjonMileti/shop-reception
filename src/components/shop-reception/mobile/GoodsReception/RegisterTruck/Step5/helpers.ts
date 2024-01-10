import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    destination: Yup.string().required("Destinație este un câmp necesar"),
    registrationNumber: Yup.string().required("Numărul de înmatriculare este un câmp necesar"),
    driver: Yup.string().required("Șoferul este un câmp necesar"),
    isPackingReturn: Yup.boolean()
  })

export const initialValues = {
  destination: "",
  registrationNumber: "",
  driver: "",
  isPackingReturn: false
}