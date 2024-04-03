import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  conform: Yup.boolean(),
  nonComplianceReason: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
        .required('Camp obligatoriu')
        .max(250, 'must be at most 250 characters')
  ),
  productDestination: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
        .required('Camp obligatoriu')
        .max(250, 'must be at most 250 characters')
  ),
  isVerified: Yup.boolean()
})
