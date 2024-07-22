import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    truckNumber: Yup.string().required('Număr înmatriculare este un câmp obligatoriu.'),
    driverName: Yup.string().required('Numele soferului este un câmp obligatoriu.'),
    sealList: Yup.array().of(
      Yup.object().shape({
        code: Yup.string().required('Numar sigiliu este un câmp obligatoriu.')
      })
    )
  })

export const initialValues = {
  truckNumber: null,
  driverName: null,
  sealList: [{ code: null }]
}

export const isEmpty = value => value === null || value.length === 0
