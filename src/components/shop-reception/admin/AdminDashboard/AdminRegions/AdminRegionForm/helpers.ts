import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminRegion) =>
  Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    responsible: Yup.string().required(),
    active: Yup.boolean().required(),
    shopIds: Yup.array().optional()
  })

export const getInitialValues = (editItem: AdminRegion) => {
  return {
    id: editItem?.id || null,
    code: editItem?.code || null,
    name: editItem?.name || null,
    responsible: editItem?.responsible || null,
    active: editItem?.active || null,
    shopIds: editItem?.shopIds || null
  }
}
