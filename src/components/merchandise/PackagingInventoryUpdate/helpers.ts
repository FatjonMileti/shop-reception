import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    supportType: Yup.string().required("Tipul de suport este un câmp obligatoriu"),
    quality: Yup.number().required("calitatea este un domeniu obligatoriu"),
    defective: Yup.number().required("defect este un câmp obligatoriu")
  })

export const initialValues = {
  supportType: "",
  quality: 0,
  defective: 0
}