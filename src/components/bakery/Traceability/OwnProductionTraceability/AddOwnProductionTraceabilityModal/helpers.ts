import * as Yup from 'yup'
import { formatBakeryPayloadDate, formatPayloadDate } from 'utils/helpers'
import dayjs from 'dayjs'

export const getInitialValues = () => {
  return {
    productionDate: dayjs(),
    chargeNumber: null,
    productionOperator: null,
    quantity: null,
    thermalCondition: null,
    dlc: null,
    conform: true,
    nonComplianceReason: null,
    productDestination: null,
    traceabilityProductionList: []
  }
}

export const validationSchema = Yup.object().shape({
  productionDate: Yup.date()
    .max(dayjs().endOf('day'), 'Data de productie nu poate fi in viitor.')
    .required('Campul data productie trebuie completat.'),

  chargeNumber: Yup.number().required('Campul sarja trebuie completat.'),
  productionOperator: Yup.string().nullable(), //.required('Campul operator productie trebuie completat.'),
  quantity: Yup.number().required('Campul cantitate trebuie completat'),
  thermalCondition: Yup.string().required('Campul stare termica trebuie selectat.'),
  conform: Yup.boolean(),

  traceabilityProductionList: Yup.array().of(
    Yup.object().shape({
      batchId: Yup.string(),
      childTraceabilityId: Yup.string(),
      componentCode: Yup.number(),
      componentQuantity: Yup.number(),
      quantity: Yup.number(),
      openingDate: Yup.date().when('hasSecondaryDlc', ([hasSecondaryDlc], schema) => {
        if (hasSecondaryDlc) {
          return schema.required('Data obligatorie')
        } else {
          return schema.nullable()
        }
      }),
      hasSecondaryDlc: Yup.boolean(),
    })
  )
})

export const toBatchFormat = (item, quantity) => ({
  batchId: item?.id,
  componentCode: item.product.metiCode,
  componentQuantity: quantity,
  componentName: item.batchName,
  quantity: item.batchQuantity,
  hasSecondaryDlc: item.hasSecondaryDlc,
  openingDate: formatPayloadDate(item.entryDate),
  dlcDays: item.dlcDays
})

export const toChargeFormat = (item, quantity) => ({
  childTraceabilityId: item.id,
  componentCode: item.product.metiCode,
  componentQuantity: quantity, //item.quantity,
  componentName: item.chargeNumber,
  quantity: item.quantity,
  openingDate: dayjs(),
  dlc: item.dlc
})

export const columns: any[] = [
  {
    title: 'Data intrare',
    field: 'entryDate',
    align: 'left',
    type: 'string',
    width: '90px',
    render: (row: any) => formatBakeryPayloadDate(row.entryDate)
  },
  {
    title: 'Nr. lot',
    field: 'batchName',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Furnizor',
    field: 'supplier.supplierName',
    align: 'left',
    render: (row: any) => row.supplier.supplierName,
    type: 'string',
    width: '90px'
  },
  {
    title: 'Data expirare',
    field: 'expireDate',
    align: 'left',
    type: 'string',
    width: '90px',
    render: (row: any) => formatBakeryPayloadDate(row.expireDate)
  },
  {
    title: 'Cantitate intrata',
    field: 'batchQuantity',
    align: 'left',
    type: 'string',
    width: '70px'
  },
  {
    title: 'Cantitate consumata',
    field: 'consumedAmount',
    align: 'left',
    type: 'string',
    width: '80px',
    render: (row: any) => row.consumedAmount || ''
  },
  {
    title: 'Data deschidere',
    field: 'consumedAmount',
    align: 'left',
    type: 'string',
    width: '90px',
    render: (row: any) => formatBakeryPayloadDate(row.verifiedDate)
  },
  {
    title: 'Nr. zile DLC',
    field: 'dlcDays',
    align: 'left',
    type: 'string',
    width: '50px',
    render: (row: any) => row?.dlcDays || ''
  },
  {
    title: 'DLC Secundar',
    field: 'secondaryDlc',
    align: 'left',
    type: 'string',
    width: '80px',
    render: (row: any) => formatBakeryPayloadDate(row.secondaryDlc)
  }
]

export const chargeColumns: any[] = [
  {
    title: 'Data productie',
    field: 'productionDate',
    align: 'left',
    type: 'string',
    width: '100px',
    render: (row: any) => formatBakeryPayloadDate(row.productionDate)
  },
  {
    title: 'Nr. sarja',
    field: 'chargeNumber',
    align: 'left',
    type: 'string',
    width: '100px'
  },

  {
    title: 'Cantitate sarja',
    field: 'quantity',
    align: 'left',
    type: 'string',
    width: '100px'
  },

  {
    title: 'Nr. zile DLC',
    field: 'dlc',
    align: 'left',
    type: 'string',
    width: '110px',
    render: (row: any) => row.dlc || ''
  }
]

export const quantityCalculation = (chargeQuantity, composedArticleQuantity, recipeQuantity) => {
  return (chargeQuantity * composedArticleQuantity) / recipeQuantity
}
