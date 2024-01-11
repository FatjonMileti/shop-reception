import * as Yup from 'yup'

export const getValidationSchema = (editItem: DLCProducts) =>
  Yup.object().shape({
    id: Yup.number().required(),
    storeName: Yup.string().required(),
    district: Yup.string().required(),
    family: Yup.string().required(),
    subfamily: Yup.string().required(),
    UbCode: Yup.string().required(),
    productCode: Yup.string().required(),
  })

export const getInitialValues = (editItem: DLCProducts) => {
  return {
    id: editItem?.id || null,
    storeName: editItem?.storeName || null,
    district: editItem?.district || null,
    family: editItem?.family || null,
    subfamily: editItem?.subfamily || null,
    UbCode: editItem?.UbCode || null,
    productCode: editItem?.productCode || null,
  }
}
