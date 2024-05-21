import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    supportList: Yup.array().of(
      Yup.object().shape({
        supportId: Yup.string(),
        supportNumber: Yup.number().required()
      })
    )
  })

export const initialValues = {
  supportList: []
}
