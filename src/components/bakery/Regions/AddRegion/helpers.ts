import * as Yup from 'yup'

export const validationSchema = Yup.object({
    id: Yup.string().nonNullable(),
    name: Yup.string().nonNullable(),
    responsible: Yup.string().nonNullable(),
})
