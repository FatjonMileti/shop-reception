import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminHub) =>
  Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    type: Yup.string().required(),
    address: Yup.string().required(),
    active: Yup.boolean().required()
  })

export const getInitialValues = (editItem: AdminHub) => {
  return {
    ...(editItem?.id && { id: editItem?.id }),
    code: editItem?.code || null,
    name: editItem?.name || null,
    type: editItem?.type || null,
    address: editItem?.address || null,
    active: editItem?.active || false,
    users: editItem?.users || [],
    packagingResponsibleEmails: editItem?.packagingResponsibleEmails || []
  }
}
