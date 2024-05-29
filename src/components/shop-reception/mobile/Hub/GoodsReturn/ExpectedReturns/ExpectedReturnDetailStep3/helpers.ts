import * as Yup from "yup";

export const getValidationSchema = () =>
  Yup.object().shape({
    supportList: Yup.array().of(
      Yup.object().shape({
        id: Yup.number(),
        supportCode: Yup.string(),
        supportTypeName: Yup.string(),
        supportTypeNameAndCode: Yup.string().nullable(),
        supportNumber: Yup.number(),
        hasPhoto: Yup.boolean(),
        confirmedSupportNumber: Yup.number(),
        }
      )
    )
  })

export const initialValues = {
  supportList: []
}