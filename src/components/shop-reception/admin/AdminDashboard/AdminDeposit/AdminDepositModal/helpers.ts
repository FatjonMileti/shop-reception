import * as Yup from 'yup'
import { DEPOSIT_TYPES } from './constants'

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
    active: Yup.boolean().required(),
    depositUsers: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required('Tip depozit este obligatoriu'),
        value: Yup.string().required('Tip depozit este obligatoriu')
      })
    )
  })

export const getInitialValues = editItem => {
  return {
    id: editItem?.id ?? null,
    code: editItem?.code ?? '',
    name: editItem?.name ?? null,
    type: editItem
      ? {
          value: Object.keys(DEPOSIT_TYPES).find(key => DEPOSIT_TYPES[key] === editItem.type),
          label: editItem.type
        }
      : null,
    address: editItem?.address ?? null,
    validityPercentage: editItem?.validityPercentage ?? null,
    emails: editItem?.emails?.join(';') || null,
    active: editItem?.active ?? false,
    depositUsers: editItem ? editItem.depositUsers.map(user => ({ value: user, label: user })) : []
  }
}
