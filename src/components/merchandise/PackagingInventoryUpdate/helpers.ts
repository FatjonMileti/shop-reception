import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    supportType: Yup.string().required("Tipul de suport este un câmp obligatoriu"),
    quality: Yup.number().required("Calitativi este un câmp obligatoriu"),
    defective: Yup.number().required("Defecți este un câmp obligatoriu")
  })

export const initialValues = {
  supportType: "",
  quality: 0,
  defective: 0
}