import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    destination: Yup.string().required("câmpul destinație este obligatoriu"),
    registrationNumber: Yup.string().required("câmpul Număr de înregistrare este obligatoriu"),
    driver: Yup.string().required("câmpul șoferului este obligatoriu"),
    isPackingReturn: Yup.boolean()
  })

export const initialValues = {
  destination: "",
  registrationNumber: "",
  driver: "",
  isPackingReturn: false
}