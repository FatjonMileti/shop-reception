import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminDeposit) =>
  Yup.object().shape({
    depositCode: Yup.string().required(),
    name: Yup.string().required(),
    depositType: Yup.string().required(),
    address: Yup.string().required(),
    validityPercentage: Yup.string().required(),
    emails: Yup.string().required(),
    active: Yup.boolean().required()
  })

export const getInitialValues = (editItem: AdminDeposit) => {
  return {
    id: editItem?.id || null,
    depositCode: editItem?.depositCode || null,
    name: editItem?.name || null,
    depositType: editItem?.depositType || null,
    address: editItem?.address || null,
    validityPercentage: editItem?.validityPercentage || null,
    emails: editItem?.emails || null,
    active: editItem?.active || false
  }
}
