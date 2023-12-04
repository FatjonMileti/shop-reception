import * as Yup from 'yup'

export const getValidationSchema = (editItem: PackingType) =>
  Yup.object().shape({
    region: Yup.string().required(),
    scanType: Yup.string().required(),
    startDate: Yup.string().required(),
    lastDate: Yup.string().required(),
    active: Yup.boolean().required(),
  })

export const getInitialValues = (editItem: PackingType) => {
  return {
    id: editItem?.id || null,
  }
}
