import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  parentSocietyName: Yup.string().required('Campul este obligatoriu.'),
  businessName: Yup.string().required('Campul este obligatoriu.'),
  regNumber: Yup.string().required('Campul este obligatoriu.'),
  vatId: Yup.string().required('Campul este obligatoriu.'),
  fiscalAddress: Yup.string().required('Campul este obligatoriu.'),
  bankAccount: Yup.string().required('Campul este obligatoriu.'),
  bankName: Yup.string().required('Campul este obligatoriu.'),
  socialCap: Yup.string().required('Campul este obligatoriu.')
})

export const getInitialValues = editItem => {
  return {
    parentSocietyName: editItem?.parentSocietyName || '',
    businessName: editItem?.businessName || '',
    regNumber: editItem?.regNumber || '',
    vatId: editItem?.vatId || '',
    fiscalAddress: editItem?.fiscalAddress || '',
    bankAccount: editItem?.bankAccount || '',
    bankName: editItem?.bankName || '',
    socialCap: editItem?.socialCap || ''
  }
}
