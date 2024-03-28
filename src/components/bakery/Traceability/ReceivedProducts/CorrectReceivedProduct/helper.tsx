import * as Yup from 'yup'
import dayjs from 'dayjs'
import { ReceivedProductToCorrect } from './CorrectReceivedProduct'
import { Product, ReceivedProduct, Supplier } from '../interfaces'

export const getInitialValues = (receivedProduct?: ReceivedProduct): ReceivedProductToCorrect => {
  return {
    selectedProduct: receivedProduct?.product,
    selectedSupplier: receivedProduct?.supplier,

    entryDate: receivedProduct?.entryDate ? dayjs(receivedProduct?.entryDate) : dayjs(),
    hasExpirationDate: receivedProduct?.hasExpireDate ?? false,
    expirationDate: receivedProduct?.expireDate ? dayjs(receivedProduct?.expireDate) : null,
    hasSecondaryDLC: receivedProduct?.hasSecondaryDlc,
    secondaryDLC: receivedProduct?.dlcDays,
    amount: receivedProduct?.batchQuantity ?? undefined,
    lot: receivedProduct?.batchName || '',
    picture: undefined
  }
}

export const correctReceivedProductSchema: Yup.ObjectSchema<ReceivedProductToCorrect> =
  Yup.object().shape({
    selectedProduct: Yup.mixed<Product>().required('Selected product is required'),
    selectedSupplier: Yup.mixed<Supplier>().required('Selected supplier is required'),

    entryDate: Yup.mixed<dayjs.Dayjs>()
      .required('Entry date is required')
      .test('future', 'Data intrare nu poate fi in viitor', value => {
        return value?.isBefore(dayjs())
      }),

    hasExpirationDate: Yup.boolean().required('This field is required'),

    expirationDate: Yup.mixed().when('hasExpirationDate', ([hasExpirationDate], schema) => {
      return hasExpirationDate
        ? Yup.date()
            .min(dayjs().startOf('day'), 'Data de expirare nu poate fi în trecut.')
            .required('Câmpul data expirare trebuie completat.')
        : schema.nullable()
    }),

    hasSecondaryDLC: Yup.boolean().required('This field is required'),

    secondaryDLC: Yup.number()
      .when('hasSecondaryDLC', ([hasSecondaryDLC], schema) =>
        hasSecondaryDLC ?
          schema.required('Campul Numar zile DLC trebuie completat').positive()
          : schema.nullable()
      )
      .nullable(),

    amount: Yup.number().positive().required('Campul cantitate intrata trebuie completat'),

    lot: Yup.string().required('Campul lot trebuie completat').max(30),

    picture: Yup.mixed<File>()
    //   .test('required', 'The picture must be a file', (value: File) => {
    //   return !!value
    // })
  })
