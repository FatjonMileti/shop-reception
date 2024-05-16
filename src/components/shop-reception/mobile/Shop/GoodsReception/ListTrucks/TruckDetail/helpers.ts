import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    temperature: Yup.number().nullable(),
    thermodiagramConform: Yup.boolean().nullable(),
    sealList: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().nullable(),
        code: Yup.string().nullable(),
        integral: Yup.boolean(),
      })
    ),
    documentList: Yup.array().of(
      Yup.object().shape({
        depositId: Yup.string().nullable(),
        depositName: Yup.string(),
        hasNotice: Yup.boolean().nullable(),
        hasTransportNote: Yup.boolean().nullable(),
      })
    ),
  })

export const initialValues = {
    temperature: null,
    thermodiagramConform: true,
    sealList: [{ id: '', code: '', integral: true }],
    documentList: [{ depositId: null, depositName: '', hasNotice: true, hasTransportNote: true }],
};
