import * as Yup from 'yup'

export const getValidationSchema = (editItem: SubFamilyValidityThreshold) =>
  Yup.object().shape({
    id: Yup.number().required(),
    subfamilyCode: Yup.string().required(),
    familyCode: Yup.string().required(),
    subfamily: Yup.string().required(),
    family: Yup.string().required(),
    districtCode: Yup.string().required(),
    district: Yup.string().required(),
    validityThreshold: Yup.number().required()
  })

export const getInitialValues = (editItem: SubFamilyValidityThreshold) => {
  return {
    id: editItem?.id || null,
    subfamilyCode: editItem?.subfamilyCode || null,
    familyCode: editItem?.familyCode || null,
    subfamily: editItem?.subfamily || null,
    family: editItem?.family || null,
    districtCode: editItem?.districtCode || null,
    district: editItem?.district || null,
    validityThreshold: editItem?.validityThreshold || null
  }
}
