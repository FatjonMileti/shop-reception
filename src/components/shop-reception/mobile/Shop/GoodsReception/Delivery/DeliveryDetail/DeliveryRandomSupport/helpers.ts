import * as Yup from 'yup'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'

export const getValidationSchema = () =>
  Yup.object().shape({
    supportCode: Yup.string().required('Cod suport este un câmp obligatoriu')
  })

export const initialValues = {
  supportCode: ''
}