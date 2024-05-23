import * as Yup from 'yup'
import { TableHeaderType } from '@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table'

export const getValidationSchema = () =>
  Yup.object().shape({
    blList: Yup.array().of(
        Yup.object().shape({
          id: Yup.string(),
          externalTicketId: Yup.string(),
          depositName: Yup.string(),
          transportCode: Yup.string(),
          date: Yup.string()
        })
    )
  })

export const initialValues = {
  blList: []
}

export const columns: Array<TableHeaderType> = [
  {
    title: 'BL',
    field: 'externalTicketId',
    align: 'left'
  },
  {
    title: 'Depozit',
    field: 'depositName',
    align: 'left'
  }
]
