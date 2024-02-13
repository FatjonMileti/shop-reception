import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminRegion) =>
  Yup.object().shape({
    regionCode: Yup.string().required(),
    name: Yup.string().required(),
    regionManager: Yup.string().required(),
    store: Yup.string().required(),
    active: Yup.boolean().required(),
  })

export const getInitialValues = (editItem: AdminRegion) => {
  return {
    id: editItem?.id || null,
    name: editItem?.name || null,
    regionManager: editItem?.regionManager || null,
    store: editItem?.regionCode || null,
    active: editItem?.active || null,
  }
}
