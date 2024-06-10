import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'
import * as Yup from "yup";

export const  rows = [
  { packageType: 'Suport inexistent', amount: 0 },
  { packageType: 'PALET EURO', amount: 0 },
  { packageType: 'PALET TIP EURO', amount: 0 },
  { packageType: 'PALET INDUSTRIAL/ATIPIC 100x120', amount: 0 },
  { packageType: 'PALET CHEP', amount: 0 },
  { packageType: 'ROLLS CHEP', amount: 0 },
  { packageType: 'ROLLS CU GRATAR', amount: 0 },
  { packageType: 'PALET DUSSELDORF', amount: 0 },
  { packageType: 'ROLLS FLORI', amount: 0 },
  { packageType: 'BOX LEMN', amount: 0 },
  { packageType: 'PALET CHEP PLASTIC 80x120', amount: 0 },
  { packageType: 'PALET PLASTIC', amount: 0 },
  { packageType: 'PALET CHEP JUMATATE 80x60', amount: 0 },
  { packageType: 'BOX PLASTIC', amount: 0 },
  { packageType: 'BOX METALIC', amount: 0 }
]
export const columns: Array<TableHeaderType> = [
  {
    title: 'TIP AMBALAJ',
    field: 'packageType',
    align: 'left'
  },
  {
    title: 'CANTITATE',
    field: 'amount',
    align: 'center'
  }
]

export const getValidationSchema = () =>
  Yup.object().shape({
    supportType: Yup.array().of(
      Yup.object().shape({
          id: Yup.number(),
          name: Yup.string(),
          conform: Yup.number().min(0),
          defect: Yup.number().min(0),
          reason: Yup.string().nullable(),
          received: Yup.number().nullable(),
        }
      )
    )
  })

export const initialValues = {
  supportType: []
}
