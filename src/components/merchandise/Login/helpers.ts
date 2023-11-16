import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    language: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required()
  })