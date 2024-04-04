import * as Yup from 'yup'

export const getValidationSchema = (editItem: PackingType) =>
  Yup.object().shape({
    externalCode: Yup.string().required(),
    alternativeCodes: Yup.array().of(Yup.string()).required(),

    code: Yup.string().required(),
    name: Yup.string().required(),
    main: Yup.boolean().required(),
    combined: Yup.boolean().required(),
    active: Yup.boolean().required(),
    returnable: Yup.boolean().required(),
    childrenIds: Yup.array().of(Yup.number()).required()
  })

export const getInitialValues = (editItem: PackingType) => {
  return {
    externalCode: editItem?.externalCode || null,
    alternativeCodes: editItem?.alternativeCodes || [],
    code: editItem?.code || null,
    name: editItem?.name || null,
    main: editItem?.main || false,
    combined: editItem?.combined || false,
    active: editItem?.returnable || false,
    returnable: editItem?.returnable || false,
    childrenIds: editItem?.childrenIds || null
  }
}
