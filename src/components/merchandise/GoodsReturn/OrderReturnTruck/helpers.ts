import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    location: Yup.string().required(),
    stacks: Yup.number().required()
  })

export const initialValues = {
  location: '',
  stacks: 25
}