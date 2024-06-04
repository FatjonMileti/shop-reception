import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    truckNumber: Yup.string().required("Numărul de înmatriculare este un câmp necesar"),
    driverName: Yup.string().required("Șoferul este un câmp necesar"),
    sealList: Yup.array().of(
      Yup.object().shape({
        code: Yup.string().required('Număr Sigiliu este obligatoriu')
      })
    ).min(1, 'Cel puțin un Număr Sigiliu este necesar')
  })

export const initialValues = {
  truckNumber: "",
  driverName: "",
  sealList: [{ id: 1, code: '' }]
}
