import { BodyItem, Column } from '../ProductManagementTraceability/AccordionTable'
import { BooleanIcon } from '../../../core-ui/BooleanIcon'
import { DescriptionText } from '../../../core-ui/DescriptionText'
import React from 'react'
import * as Yup from 'yup'
import { ObjectSchema } from 'yup'
import { ProductDetails } from './AddReceivedProduct/ProductDetails'
import dayjs from 'dayjs'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id || '',
    productName: item.productName || '',
    metiCode: item.metiCode || '',
    eanCodes: item.eanCodes || '',
    pluCode: item.pluCode || '',
    appelCodes: item.appelCodes || '',
    familyModuleName: item.familyModuleName || '',
    familyName: item.familyName || '',
    subfamily: item.subfamily || '',
    unitBusiness: item.unitBusiness || '',
    enable: item.enable,
    status: item.status || '',
    provider: item.provider || '',
    fabricationMethod: item.fabricationMethod || '',
    clusterName: item.clusterName || '',
    clusterMandatory: item.clusterMandatory,
    scheduleProduct: item.scheduleProduct,
    minStock: item.minStock || 0,
    newProduct: item.newProduct || '',
    imageUrl: item.imageUrl || '',
    suppliers: item.suppliers || '',
    batch: item.batch || false
  }))

export const columns: Column[] = [
  {
    title: 'Cod EAN',
    field: 'eanCodes'
  },
  {
    title: 'Cod PLU',
    field: 'pluCode'
  },
  {
    title: 'Cod APPEL PRIX',
    field: 'appelCodes'
  },
  {
    title: 'Raion',
    field: 'familyModuleName'
  },
  {
    title: 'UB',
    field: 'unitBusiness'
  },
  {
    title: 'Status',
    field: 'status'
  },
  {
    title: 'Furnizor',
    field: 'suppliers'
  },
  {
    title: 'Lot',
    field: 'batch',
    render: row => (
      <BodyItem
        name="Metoda fabricatie"
        value={
          <BooleanIcon value={row.batch} icon="Flag" onFailure="#FFFFFF" onSuccess="#33691E" />
        }
      />
    )
  },
  {
    title: 'Metoda fabricatie',
    field: 'fabricationMethod',
    render: row => (
      <BodyItem
        name="Metoda fabricatie"
        value={<DescriptionText value={row.fabricationMethod} />}
      />
    )
  },
  {
    field: 'clusterName',
    render: data => <BodyItem name="Cluster" value={data.clusterName} />
  },
  {
    field: 'clusterMandatory',
    render: data => (
      <BodyItem
        name="Obligatoriu"
        value={
          <BooleanIcon
            value={data.clusterMandatory}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'scheduleProduct',
    render: data => (
      <BodyItem
        name="Produs cadentier"
        value={
          <BooleanIcon
            value={data.scheduleProduct}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    )
  },
  {
    field: 'minStock',
    title: 'Stoc minim prezentare'
  },
  {
    render: data => (
      <BodyItem
        name="Produs nou"
        value={
          <BooleanIcon
            value={data.newProduct}
            icon="CheckCircleOutline"
            onFailure="#E5E5E5"
            onSuccess="#33691E"
          />
        }
      />
    ),
    field: 'newProduct'
  }
]

export const headerItems: Column[] = [
  {
    title: 'Cod METI',
    field: 'metiCode'
  },
  {
    title: 'Familie',
    field: 'familyName'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily'
  }
]

export const productDetailsSchema: Yup.ObjectSchema<ProductDetails> = Yup.object().shape({
  entryDate: Yup.mixed<dayjs.Dayjs>().required('Entry date is required'),

  hasExpirationDate: Yup.boolean().required('This field is required'),

  expirationDate: Yup.mixed<dayjs.Dayjs>()

    .when('hasExpirationDate',
    ([hasExpirationDate], schema) =>
    {
      console.log("hasExpirationDate: ",hasExpirationDate)
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

  lot: Yup.string().required('lot is required'),

  picture: Yup.mixed<File>().test('required', 'The picture must be a file', (value: File) => {
    return !!value
  })
})
