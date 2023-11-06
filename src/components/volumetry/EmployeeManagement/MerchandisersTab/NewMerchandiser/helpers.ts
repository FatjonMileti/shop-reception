import * as yup from 'yup'

export const validationSchema = yup.object({
  name: yup.string().nonNullable(),
  departmentName: yup.string().nonNullable(),
  position: yup.string().nonNullable()
})
