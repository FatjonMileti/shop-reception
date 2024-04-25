import * as Yup from 'yup'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'

export const getValidationSchema = () =>
  Yup.object().shape({
    productCode: Yup.string().required('Cod Produse este un câmp obligatoriu')
  })

export const initialValues = {
  productCode: ''
}

export const columns: Array<TableHeaderType> = [
  {
    title: 'Produs',
    field: 'product',
    align: 'left'
  },
  {
    title: 'Calitativ',
    field: 'qualitative',
    align: 'left'
  },
  {
    title: 'Defect',
    field: 'defective',
    align: 'left'
  }
]