import * as Yup from 'yup'

export const getValidationSchema = (editItem: PackingType) =>
  Yup.object().shape({
    region: Yup.string().required(),
    packagingCode: Yup.string().required(),
    name: Yup.string().required(),
    main: Yup.string().required(),
    combination: Yup.boolean().required(),
    active: Yup.boolean().required(),
    return: Yup.boolean().required(),
    generatedBarcode: Yup.string().required(),
  })

export const getInitialValues = (editItem: PackingType) => {
  return {
    id: editItem?.id || null,
    packagingCode: editItem?.packagingCode || null,
    name: editItem?.name || null,
    main: editItem?.main || null,
    combination: editItem?.combination || false,
    active: editItem?.active || false,
    return: editItem?.return || false,
    generatedBarcode: editItem?.generatedBarcode || null
  }
}
