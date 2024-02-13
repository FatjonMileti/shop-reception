import * as Yup from 'yup'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'

export const getValidationSchema = () =>
  Yup.object().shape({
    opinion: Yup.string().required('Aviz este un câmp obligatoriu')
  })

export const initialValues = {
  opinion: 'none'
}

export const columns: Array<TableHeaderType> = [
  {
    title: 'Numar aviz',
    field: 'warehouseName',
    align: 'left'
  },
  {
    title: 'Magazin',
    field: 'store',
    align: 'left'
  },
  {
    title: 'Numar stive',
    field: 'deliverySlip',
    align: 'left'
  }
]