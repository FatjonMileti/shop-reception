import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminHub) =>
  Yup.object().shape({
    hubCode: Yup.string().required(),
    name: Yup.string().required(),
    hubType: Yup.string().required(),
    address: Yup.string().required(),
    active: Yup.boolean().required(),
    users: Yup.string().required(),
  })

export const getInitialValues = (editItem: AdminHub) => {
  return {
    id: editItem?.id || null,
    hubCode: editItem?.hubCode || null,
    name: editItem?.name || null,
    hubType: editItem?.hubType || null,
    address: editItem?.address || null,
    hourlyIntervals: editItem?.hourlyIntervals || null,
    active: editItem?.active || false
  }
}
