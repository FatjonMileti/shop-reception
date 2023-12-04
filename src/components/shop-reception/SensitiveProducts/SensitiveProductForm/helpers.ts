import * as Yup from 'yup'

export const getValidationSchema = (editItem: SensitiveProduct) =>
  Yup.object().shape({
    store: Yup.string().required(),
    district: Yup.string().required(),
    family: Yup.string().required(),
    subfamily: Yup.string().required(),
    UbCode: Yup.string().required(),
    productCode: Yup.string().required(),
  })

export const getInitialValues = (editItem: SensitiveProduct) => {
  return {
    id: editItem?.id || null,
    store: editItem?.storeCode || null,
    district: editItem?.district || null,
    family: editItem?.family || null,
    subfamily: editItem?.subfamily || null,
    UbCode: editItem?.UbCode || null,
    productCode: editItem?.productCode || null,
  }
}
