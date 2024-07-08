import * as Yup from "yup";

export const getValidationSchema = () =>
  Yup.object().shape({
    supportType: Yup.array().of(
      Yup.object().shape({
        id: Yup.number(),
        name: Yup.string(),
        conform: Yup.number().min(0),
        defect: Yup.number().min(0),
        reason: Yup.string().nullable(),
        received: Yup.number().nullable(),
        imageUploaded: Yup.boolean().default(false)
      })
    )
  })

export const initialValues = {
  supportType: []
}
