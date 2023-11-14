import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    registrationNumber: Yup.string().required(),
    driver: Yup.string().required(),
    sealNumber: Yup.string().required()
  })

export const initialValues = {
  registrationNumber: "",
  driver: "",
  sealNumber: ""
}