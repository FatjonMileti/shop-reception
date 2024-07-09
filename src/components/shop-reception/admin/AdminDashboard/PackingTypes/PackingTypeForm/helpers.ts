import * as Yup from 'yup'

export const getValidationSchema = (editItem: PackingType) =>
  Yup.object().shape({
    externalCode: Yup.string()
      .test('notOnlySpaces', 'Campul trebuie sa contina caractere.', value => {
        return /\S/.test(value)
      })
      .required('Campul este obligatoriu.'),
    alternativeCodes: Yup.array().of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string()
      })
    ),
    code: Yup.string().required('Campul este obligatoriu.'),
    name: Yup.string()
      .test('notOnlySpaces', 'Campul trebuie sa contina caractere.', value => {
        return /\S/.test(value)
      })
      .required('Campul este obligatoriu.'),
    main: Yup.boolean().required('Campul este obligatoriu.'),
    combined: Yup.boolean(),
    active: Yup.boolean().required('Campul este obligatoriu.'),
    returnable: Yup.boolean().required('Campul este obligatoriu.'),
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
