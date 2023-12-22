import * as yup from 'yup'

export const validationSchema = yup.object({
  id: yup.number().nonNullable(),
  name: yup.string().nonNullable(),
  departmentName: yup.string().nonNullable(),
  position: yup.string().nonNullable(),
  employer: yup.string().nonNullable()
})
