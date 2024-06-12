import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    shopCode: Yup.number(),
    supportId: Yup.string().required('Tipul de suport este un câmp obligatoriu'),
    quality: Yup.number().min(0),
    defective: Yup.number().min(0),
    defectPictureId: Yup.number().nullable()
  })

export const initialValues = {
  shopCode: null,
  supportId: null,
  quality: 0,
  defective: 0,
  defectPictureId: null
}
