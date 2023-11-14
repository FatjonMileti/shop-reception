import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    supportType: Yup.string().required(),
    quality: Yup.number().required(),
    defective: Yup.number().required()
  })

export const initialValues = {
  supportType: "",
  quality: 0,
  defective: 0
}