import * as Yup from 'yup'

export const getValidationSchema = (editItem: AdminDeposit) =>
  Yup.object().shape({
    code: Yup.string().required('Campul este obligatoriu.'),
    name: Yup.string().required('Campul este obligatoriu.'),
    type: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string()
      })
      .required('Campul este obligatoriu.'),
    address: Yup.string().required('Campul este obligatoriu.'),
    validityPercentage: Yup.string().required('Campul este obligatoriu.'),
    emails: Yup.string().required('Campul este obligatoriu.'),
    packagingResponsibleEmail: Yup.string(),
    cif: Yup.string().required('Campul este obligatoriu.'),
    office: Yup.string().required('Campul este obligatoriu.'),
    bankAccount: Yup.string().required('Campul este obligatoriu.'),
    bankName: Yup.string().required('Campul este obligatoriu.'),
    workingPoint: Yup.string().required('Campul este obligatoriu.'),
    capital: Yup.string().required('Campul este obligatoriu.'),
    active: Yup.boolean().required('Campul este obligatoriu.'),
    acceptReturn: Yup.boolean().required('Campul este obligatoriu.'),
    depositUsers: Yup.array()
      .of(
        Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string()
          })
          .required('Campul este obligatoriu.')
      )
      .test({
        message: 'Campul este obligatoriu.',
        test: arr => arr.length !== 0
      })
  })

export const getInitialValues = (editItem, depositUsersOptions, depositsOptions) => {
  return {
    code: editItem?.code || '',
    name: editItem?.name || '',
    type: editItem ? depositsOptions.filter(item => item.label === editItem.type)[0] : null,
    address: editItem?.address || '',
    validityPercentage: editItem?.validityPercentage || 0,
    emails: editItem ? editItem?.emails?.toString() || '' : '',
    packagingResponsibleEmail: editItem?.packagingResponsibleEmail || '',
    cif: editItem?.cif || '',
    office: editItem?.office || '',
    bankAccount: editItem?.bankAccount || '',
    bankName: editItem?.bankName || '',
    workingPoint: editItem?.workingPoint || '',
    capital: editItem?.capital || '',
    active: editItem?.active || false,
    acceptReturn: editItem?.acceptReturn || false,
    depositUsers: editItem ? depositUsersOptions || [] : []
  }
}
