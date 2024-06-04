import * as Yup from 'yup'

export const getValidationSchema = (editItem: SubFamilyValidityThreshold) =>
  Yup.object().shape({
    validityLimit: Yup.number().required()
  })

export const getInitialValues = (editItem: SubFamilyValidityThreshold) => {
  return {
    validityLimit: editItem?.validityLimit || null
  }
}
