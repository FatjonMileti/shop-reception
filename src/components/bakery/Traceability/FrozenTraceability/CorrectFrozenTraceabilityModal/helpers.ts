import * as Yup from 'yup'
import { formatBakeryPayloadDate, formatPayloadDate, getCurrentDate } from 'utils/helpers'

export const getInitialValues = editItem => {
  return {
    productionDate: editItem?.productionDate,
    chargeNumber: editItem?.chargeNumber || null,
    productionOperator: editItem?.productionOperator || null,
    quantity: editItem?.quantity || null,
    thermalCondition: editItem?.thermalCondition || null,
    conform: editItem?.conform || true,
    nonComplianceReason: editItem?.nonComplianceReason || null,
    productDestination: editItem?.productDestination || null,
    dlc: editItem?.dlc || null,
    product: editItem?.product,
    traceabilityFrozenList: editItem?.traceabilityFrozenList?.map(toBatchFormatEdit) || []
  }
}

export const validationSchema = Yup.object().shape({
  productionDate: Yup.date()
    .max(new Date(), 'Data de productie nu poate fi in viitor.')
    .required('Campul data productie trebuie completat.'),
  chargeNumber: Yup.number().required('Campul sarja trebuie completat.'),
  productionOperator: Yup.string().nullable(), //.required('Campul operator productie trebuie completat.'),
  quantity: Yup.string().required('Campul cantitate trebuie completat'),
  thermalCondition: Yup.string().required('Campul stare termica trebuie completat.'),
  conform: Yup.boolean(),
  product: Yup.object().required(),

  traceabilityFrozenList: Yup.array().of(
    Yup.object().shape({
      batchId: Yup.string(),
      quantity: Yup.number(),
      // openingDate: Yup.date(),
      dlc: Yup.string()
    })
  )
})

export const toBatchFormat = (item, quantity) => ({
  batchName: item.batchName,
  batchId: item.id,
  quantity: quantity, //item.batchQuantity,
  openingDate: item.entryDate,
  dlc: item.dlcDays
})

export const toBatchFormatEdit = item => ({
  batchName: item.batch?.batchName,
  batchId: item.batch?.id,
  quantity: item.batch?.batchQuantity,
  openingDate: formatPayloadDate(item.openingDate),
  dlc: item.batch?.dlcDays
})

export const columns: any[] = [
  {
    title: 'Data intrare',
    field: 'entryDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: (row: any) => formatBakeryPayloadDate(row.entryDate)
  },
  {
    title: 'Nr. lot',
    field: 'batchName',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Furnizor',
    field: 'supplier.supplierName',
    align: 'left',
    render: (row: any) => row.supplier.supplierName,
    type: 'string',
    width: '250px'
  },
  {
    title: 'Data expirare',
    field: 'expireDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: (row: any) => formatBakeryPayloadDate(row.expireDate)
  },
  {
    title: 'Cantitate intrata',
    field: 'batchQuantity',
    align: 'left',
    type: 'string',
    width: '100px'
  },
  {
    title: 'Cantitate consumata',
    field: 'consumedAmount',
    align: 'left',
    type: 'string',
    width: '100px',
    render: (row: any) => row.consumedAmount || ''
  },
  {
    title: 'Nr. zile DLC',
    field: 'dlcDays',
    align: 'left',
    type: 'string',
    width: '110px'
  }
]
