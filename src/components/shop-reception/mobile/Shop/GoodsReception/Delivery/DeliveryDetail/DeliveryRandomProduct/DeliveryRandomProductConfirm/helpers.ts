import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    productCode: Yup.string(),
    productName: Yup.string(),
    productEans: Yup.string(),
    productId: Yup.number().nullable(),
    productDlc: Yup.date().nullable(),
    eanReceived: Yup.string(),
    conform: Yup.number(),
    defect: Yup.number(),
    dlc: Yup.date().nullable(),
    shortDlc: Yup.boolean(),
    defectReason: Yup.string(),
    mark: Yup.string(),
    currentConformQuantity: Yup.number(),
    currentDefectQuantity: Yup.number(),
    showDlc: Yup.boolean(),
    quantity: Yup.number(),
    shopReceptionDeviation: Yup.number(),
    alreadyScanned: Yup.boolean()
  })

export const initialValues = {
  truckId: 0,
  truckNumber: '',
  deliveryTicketId: 0,
  ticketNumber: '',
  supportId: 0,
  supportCode: '',
  productEan: '',
  conformQuantity: null,
  defectQuantity: 0,
  defectReason: '',
  mark: '',
  shopReceptionDeviation: 0,
  productName: '',
  productEans: '',
  productId: null,
  conform: 0,
  defect: 0,
  dlc: ''
}
