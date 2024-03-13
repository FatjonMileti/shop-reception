import * as Yup from 'yup'

export const getValidationSchema = (editItem: DLCProducts) =>
  Yup.object().shape({
    id: Yup.number().required(),
    storeName: Yup.string().required(),
    district: Yup.string().required(),
    family: Yup.string().required(),
    subfamily: Yup.string().required(),
    UbCode: Yup.string().required(),
    productCode: Yup.string().required()
  })

export const getInitialValues = (editItem: any) => {
  return {
    id: editItem?.id || null,
    shopCode: editItem?.shopCode || null,
    shopName: editItem?.shopName || null,
    prodName: editItem?.prodName || null,
    ubName: editItem?.ubName || null,
    sfaName: editItem?.sfaName || null,
    famName: editItem?.famName || null,
    rayName: editItem?.rayName || null
  }
}
