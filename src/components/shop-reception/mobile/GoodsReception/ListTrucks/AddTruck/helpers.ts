import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    registrationNumber: Yup.string().required("Numărul de înmatriculare este un câmp necesar"),
    driver: Yup.string().required("Șoferul este un câmp necesar"),
    sealNumbers: Yup.array().of(
      Yup.object().shape({
          value: Yup.string().required('Număr Sigiliu este obligatoriu')
      })
    ).min(1, 'Cel puțin un Număr Sigiliu este necesar')
  })

export const initialValues = {
  registrationNumber: "",
  driver: "",
  sealNumbers: [{ id: 1, value: '' }]
}
