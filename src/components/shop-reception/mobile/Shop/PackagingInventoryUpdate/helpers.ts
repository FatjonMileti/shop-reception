import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    shopId: Yup.number(),
    supportId: Yup.string().required('Tipul de suport este un câmp obligatoriu'),
    conform: Yup.number().min(0),
    defect: Yup.number().min(0),
    defectPictureId: Yup.number().nullable()
  })

export const initialValues = {
  shopId: null,
  supportId: null,
  conform: 0,
  defect: 0,
  defectPictureId: null
}
