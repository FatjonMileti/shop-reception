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
  let data = {
    id: editItem?.id ?? '',
    code: editItem?.code ?? '',
    name: editItem?.name ?? '',
    type: editItem
      ? {
          value: Object.keys(DEPOSIT_TYPES).find(key => key === editItem.type),
          label: editItem.type
        }
      : null,
    address: "Address",
    validityPercentage: editItem?.validityPercentage ?? '',
    emails: "test@example.com",
    active: editItem?.active ?? false,
    depositUsers: editItem?.depositUsers ? editItem.depositUsers.map(user => ({ value: user, label: user })) : []
  }
  console.log(data);
  
  return data
}
