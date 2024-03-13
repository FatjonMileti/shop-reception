import * as Yup from 'yup'

export const getValidationSchema = (editItem: DLCProducts) =>
  Yup.object().shape({
    shopCode: Yup.string().required(),
    rayCode: Yup.string().required(),
    famCode: Yup.string().required(),
    sfaCode: Yup.string().required(),
    ubCode: Yup.string().required(),
    prodCode: Yup.string().required()
  })

export const getInitialValues = (editItem: DLCProducts) => {
  return {
    shopCode: editItem?.shopCode || null,
    rayCode: editItem?.rayName || null,
    famCode: editItem?.famName || null,
    sfaCode: editItem?.sfaName || null,
    ubCode: editItem?.ubName || null,
    prodCode: editItem?.prodName || null
  }
}
