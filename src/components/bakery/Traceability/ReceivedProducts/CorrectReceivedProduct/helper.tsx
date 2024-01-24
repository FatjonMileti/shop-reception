import * as Yup from 'yup'
import dayjs from 'dayjs'
import { ReceivedProductToCorrect } from './CorrectReceivedProduct'
import { Product, Supplier } from '../interfaces'

export const correctReceivedProductSchema: Yup.ObjectSchema<ReceivedProductToCorrect> =
  Yup.object().shape({

    selectedProduct: Yup.mixed<Product>().required('Selected product is required'),
    selectedSupplier: Yup.mixed<Supplier>().required('Selected supplier is required'),

    entryDate: Yup.mixed<dayjs.Dayjs>().required('Entry date is required'),

    hasExpirationDate: Yup.boolean().required('This field is required'),

    expirationDate: Yup.mixed<dayjs.Dayjs>().when(
      'hasExpirationDate',
      ([hasExpirationDate], schema) => {
        return hasExpirationDate
          ? schema.required('Expiration date is required')
          : schema.nullable()
      }
    ),

    hasSecondaryDLC: Yup.boolean().required('This field is required'),

    secondaryDLC: Yup.string()
      .when('hasSecondaryDLC', ([hasSecondaryDLC], schema) =>
        hasSecondaryDLC ? schema.required('Secondary DLC is required') : schema.nullable()
      )
      .nullable(),

    amount: Yup.string().required('amount is required'),

    lot: Yup.string().required('lot is required').max(30),

    picture: Yup.mixed<File>().test('required', 'The picture must be a file', (value: File) => {
      return !!value
    })
  })
