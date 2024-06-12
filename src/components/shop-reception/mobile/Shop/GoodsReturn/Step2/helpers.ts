import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    supportType: Yup.string().required(),
    supportNumber: Yup.number().min(1, 'Cantitatea trebuie să fie mai mare ca zero!'),
    currentSupportTypeId: Yup.string(),
    returnable: Yup.boolean()
  })

export const initialValues = {
  supportType: "",
  supportNumber: "",
  currentSupportTypeId: "",
  returnable: true,
}
