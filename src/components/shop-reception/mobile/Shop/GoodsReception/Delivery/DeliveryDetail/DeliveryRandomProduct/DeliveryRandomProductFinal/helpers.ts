import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    productCode: Yup.string(),
    productName: Yup.string(),
    productEans: Yup.string(),
    productId: Yup.number().nullable(),
    productDlc: Yup.date().nullable(),
    bulkProductCode: Yup.string(),
    eanReceived: Yup.string().nullable(),
    conform: Yup.number(),
    defect: Yup.number(),
    dlc: Yup.date().nullable(),
    shortDlc: Yup.boolean(),
    defectReason: Yup.string(),
    mark: Yup.string(),
    currentConformQuantity: Yup.number().required('Calitativ este un câmp obligatoriu'),
    currentDefectQuantity: Yup.number().required('Defect este un câmp obligatoriu'),
    showDlc: Yup.boolean(),
    quantity: Yup.number(),
    shopReceptionDeviation: Yup.number(),
    alreadyScanned: Yup.boolean()
  })

export const initialValues = {
  productCode: '',
  productName: '',
  productEans: '',
  productId: null,
  productDlc: null,
  bulkProductCode: '',
  eanReceived: '',
  conform: 0,
  defect: 0,
  dlc: null,
  shortDlc: false,
  defectReason: '',
  mark: '',
  currentConformQuantity: 0,
  currentDefectQuantity: 0,
  showDlc: false,
  quantity: 0,
  shopReceptionDeviation: 0,
  alreadyScanned: false
}
