import * as Yup from 'yup'

export const getValidationSchema = (editItem: PackingType) =>
  Yup.object().shape({
    externalCode: Yup.string().required(),
    alternativeCodes: Yup.array().of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string()
      })
    ),

    code: Yup.string().nullable(),
    name: Yup.string().required(),
    main: Yup.boolean().required(),
    combined: Yup.boolean(),
    active: Yup.boolean().required(),
    returnable: Yup.boolean().required(),
    childrenIds: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string(),
          label: Yup.string()
        })
      )
      .nullable()
  })

export const getInitialValues = (editItem: PackingType) => {
  return {
    externalCode: editItem?.externalCode || null,
    alternativeCodes:
      editItem?.alternativeCodes
        .split(';')
        .map(alternativeCode => ({ label: alternativeCode, value: alternativeCode })) || [],
    code: editItem?.code || null,
    name: editItem?.name || null,
    main: editItem?.main || false,
    combined: editItem?.combined || false,
    active: editItem?.returnable || false,
    returnable: editItem?.returnable || false,
    childrenIds: editItem?.childrenIds || []
  }
}
