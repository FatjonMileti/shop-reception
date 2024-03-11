import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  conform: Yup.boolean(),
  nonComplianceReason: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
          .required('Non compliance reason is required')
          .max(250, 'must be at most 250 characters')
  ),
  productDestination: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
          .required('Product destination is required')
          .max(250, 'must be at most 250 characters')
  ),
  isVerified: Yup.boolean()
})
