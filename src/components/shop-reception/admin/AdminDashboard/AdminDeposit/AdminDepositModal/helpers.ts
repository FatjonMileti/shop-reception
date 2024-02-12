import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminDeposit) =>
  Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    type: Yup.object().shape({
      label: Yup.string().required('Tip depozit este obligatoriu'),
      value: Yup.string().required('Tip depozit este obligatoriu')
    }),
    address: Yup.string().required(),
    validityPercentage: Yup.string(),
    emails: Yup.string().required(),
    active: Yup.boolean().required()
  })

export const getInitialValues = (editItem) => {
  return {
    id: editItem?.id ?? null,
    code: editItem?.code ?? '',
    name: editItem?.name ?? null,
    type: editItem?.type ?? null,
    address: editItem?.address ?? null,
    validityPercentage: editItem?.validityPercentage ?? null,
    emails: editItem?.emails?.join(';') || null,
    active: editItem?.active ?? false
  }
}
