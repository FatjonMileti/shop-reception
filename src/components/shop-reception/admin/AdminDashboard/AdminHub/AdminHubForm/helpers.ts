import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    code: Yup.string().required('Campul este obligatoriu.'),
    name: Yup.string().required('Campul este obligatoriu.'),
    type: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string()
      })
      .required('Campul este obligatoriu.'),
    active: Yup.boolean().required('Campul este obligatoriu.'),
    address: Yup.string().required('Campul este obligatoriu.'),
    users: Yup.array().of(Yup.string()),
    packagingResponsibleEmails: Yup.string().required('Campul este obligatoriu.')
  })

export const getInitialValues = (editItem, hubTypes, assignedUsers) => {
  return {
    ...(editItem?.id && { id: editItem?.id }),
    code: editItem?.code || '',
    name: editItem?.name || '',
    type: editItem ? hubTypes.filter(item => item.label === editItem.type)[0] : '',
    active: editItem?.active || false,
    address: editItem?.address || '',
    users: editItem ? (assignedUsers || []) : [],
    packagingResponsibleEmails: editItem?.packagingResponsibleEmails || ''
  }
}
