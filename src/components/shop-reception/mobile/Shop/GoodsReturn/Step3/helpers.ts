import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'
import * as Yup from "yup"

export const getValidationSchema = () =>
  Yup.object().shape({
    supportList: Yup.array().of(
      Yup.object().shape({
        supportId: Yup.string(),
        supportNumber: Yup.number().required()
      })
    )
  })

export const initialValues = {
  supportId: "",
  supportNumber: 0
}

export const columns: Array<TableHeaderType> = [
  {
    title: 'TIP AMBALAJ',
    field: 'packagingType',
    align: 'left'
  },
  {
    title: 'CANTITATE',
    field: 'amount',
    align: 'center'
  }
]
