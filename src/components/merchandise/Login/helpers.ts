import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  })