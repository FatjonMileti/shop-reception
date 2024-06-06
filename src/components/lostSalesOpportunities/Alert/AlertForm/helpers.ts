import * as yup from 'yup'

export const validationSchema = yup.object({
  feedbackReasonId: yup.string().nonNullable().required(),
  comment: yup.string()
})
