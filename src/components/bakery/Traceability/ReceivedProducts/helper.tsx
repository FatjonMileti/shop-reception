import { BodyItem, Column } from '../ProductManagementTraceability/AccordionTable'
import { BooleanIcon } from '../../../core-ui/BooleanIcon'
import React from 'react'
import * as Yup from 'yup'
import { ProductDetails } from './AddReceivedProduct/ProductDetails'
import dayjs from 'dayjs'
import { ReceivedProduct } from './interfaces'
import { formatPayloadDate } from '../../../../utils/helpers'
import { ImageCell } from '../../../core-ui/ImageCell'

export const toTableRowItem = (item: Partial<ReceivedProduct>): ReceivedProduct => ({
  id: item.id || '',
  product: {
    id: item.product?.id || '',
    name: item.product?.name || '',
    metiCode: item.product?.metiCode || 0,
    familyName: item.product?.familyName || '',
    familyCode: item.product?.familyCode || 0,
    subfamily: item.product?.subfamily || '',
    unitBusiness: item.product?.unitBusiness || '',
    metricUnit: item.product?.metricUnit || '',
    dlcDays: item.product?.dlcDays || 0,
    enable: item.product?.enable || false,
    batch: item.product?.batch || false,
    divisiontype: item.product?.divisiontype || '',
    imageUrl: item.product?.imageUrl || ''
  },
  supplier: {
    id: item.supplier?.id || '',
    productCode: item.supplier?.productCode || 0,
    supplierCode: item.supplier?.supplierCode || 0,
    supplierName: item.supplier?.supplierName || '',
    enable: item.supplier?.enable || false
  },
  entryDate: item.entryDate || '',
  expireDate: item.expireDate || '',
  batchName: item.batchName || '',
  hasExpireDate: item.hasExpireDate || false,
  hasSecondaryDlc: item.hasSecondaryDlc || false,
  batchQuantity: item.batchQuantity || 0,
  batchStatus: item.batchStatus || '',
  closeReason: item.closeReason || '',
  dlcDays: item.dlcDays || 0,
  verifiedBy: item.verifiedBy || '',
  verifiedDate: item.verifiedDate || '',
  consumedAmount: item.consumedAmount || 0,
  modifiedDate: item.modifiedDate || '',
  modifiedBy: item.modifiedBy || '',
  verified: item.verified || false,
  imageUrl: item.imageUrl || '',
  createdBy: item.createdBy || '',
  createdUser: item.createdUser || false
})

export const columns: Column[] = [
  {
    title: 'Data intrare in raion',
    field: 'entryDate'
  },
  {
    title: 'Cod Meti',
    field: 'product.metiCode'
  },
  {
    title: 'Produs',
    field: 'product.name'
  },
  {
    title: 'Familie produs',
    field: 'product.familyName'
  },
  {
    title: 'Subfamilie',
    field: 'product.subfamily'
  },
  {
    title: 'Furnizor (Cod Meti)',
    field: 'supplier.supplierCode'
  },
  {
    title: 'Furnizor',
    field: 'supplier.supplierName'
  },
  {
    title: 'Lot',
    field: 'batchQuantity'
  },
  {
    field: 'hasExpireDate',
    render: row => (
      <BodyItem
        name="Expira (Bifa)"
        value={
          <BooleanIcon
            value={row.hasExpireDate}
            icon="Flag"
            onFailure="#FFFFFF"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'expireDate',
    render: row => (
      <BodyItem name="Data expirare" value={<>{formatPayloadDate(row.expireDate)}</>} />
    )
  },
  {
    field: 'hasSecondaryDlc',
    render: row => (
      <BodyItem
        name="DLC Secundar (Bifa)"
        value={
          <BooleanIcon
            value={row.hasSecondaryDlc}
            icon="Flag"
            onFailure="#FFFFFF"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    title: 'Cantitate intrata',
    field: 'consumedAmount'
  },
  {
    title: 'UM (Meti)',
    field: 'product.metricUnit'
  },
  {
    title: 'Poza eticheta',
    field: 'imageUrl',
    render: row => (
      <BodyItem
        name="Poza eticheta"
        value={
          <ImageCell value={''} imageUrl={row?.imageUrl} />
        }
      />
    )
  },
  {
    title: 'User creare linie receptie',
    field: 'createdBy'
  },
  {
    field: 'entryDate',
    render: row => (
      <BodyItem name="Data creare linie receptie" value={<>{formatPayloadDate(row.entryDate)}</>} />
    )
  },
  {
    title: 'Cantitate consumata',
    field: 'consumedAmount'
  },

  {
    title: 'Nr. zile valabilitate DLC secundar',
    field: 'dlcDays'
  },
  {
    title: 'Status lot',
    field: 'batchStatus'
  },
  {
    title: 'Motiv inchidere lot',
    field: 'closeReason'
  },
  {
    render: data => (
      <BodyItem
        name="Verificare de catre validator trasabilitate ( bifa )"
        value={
          <BooleanIcon
            value={data.verified}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    ),
    field: 'newProduct'
  },
  {
    title: 'Validator trasabilitate',
    field: 'verifiedBy'
  },
  {
    title: 'Data verificare trasabilitate',
    field: 'verifiedDate',
    render: row => (
      <BodyItem
        name="Data verificare trasabilitate"
        value={<>{formatPayloadDate(row.verifiedDate)}</>}
      />
    )
  },
  {
    title: 'Ultima modificare',
    field: 'modifiedBy'
  },
  {
    title: 'Data ultimei modificari',
    field: 'modifiedDate',
    render: row => (
      <BodyItem name="Data ultimei modificari" value={<>{formatPayloadDate(row.modifiedDate)}</>} />
    )
  }
]

export const headerItems: Column[] = [
  {
    title: 'Cod METI',
    field: 'product.metiCode'
  },
  {
    title: 'Furnizor',
    field: 'supplier.supplierName'
  },
  {
    title: 'Furnizor (Cod Meti)',
    field: 'supplier.supplierCode'
  },

  {
    title: 'Familie',
    field: 'product.familyName'
  },
  {
    title: 'Subfamilie',
    field: 'product.subfamily'
  }
]

export const productDetailsSchema: Yup.ObjectSchema<ProductDetails> = Yup.object().shape({
  entryDate: Yup.mixed<dayjs.Dayjs>().required('Entry date is required'),

  hasExpirationDate: Yup.boolean().required('This field is required'),

  expirationDate: Yup.mixed<dayjs.Dayjs>().when(
    'hasExpirationDate',
    ([hasExpirationDate], schema) => {
      return hasExpirationDate ? schema.required('Expiration date is required') : schema.nullable()
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
