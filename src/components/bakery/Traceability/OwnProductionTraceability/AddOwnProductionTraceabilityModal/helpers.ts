import * as Yup from 'yup'
import { formatBakeryPayloadDate } from 'utils/helpers'
import dayjs from 'dayjs'

export const getInitialValues = recipeQuery => {
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
    traceabilityProductionList:
      recipeQuery?.data?.others?.map(({ componentCode, componentName, componentQuantity }) => ({
        componentCode,
        componentName,
        componentQuantity,
        quantity: undefined
      })) || []
  }
}

export const validationSchema = Yup.object().shape({
  productionDate: Yup.date()
    .max(dayjs().endOf('day'), 'Data de productie nu poate fi in viitor.')
    .required('Campul data productie trebuie completat.'),

  chargeNumber: Yup.number().required('Campul sarja trebuie completat.'),
  productionOperator: Yup.string().nullable(), //.required('Campul operator productie trebuie completat.'),
  quantity: Yup.number().required('Campul cantitate trebuie completat'),
  thermalCondition: Yup.string().nullable(), //.required('Campul stare termica trebuie selectat.'),
  conform: Yup.boolean(),
  nonComplianceReason: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
        .required('Camp obligatoriu')
        .max(250, 'must be at most 250 characters')
  ),
  productDestination: Yup.string().when('conform', ([conform], schema) =>
    conform
      ? schema.nullable()
      : schema
        .required('Camp obligatoriu')
        .max(250, 'must be at most 250 characters')
  ),
  traceabilityProductionList: Yup.array().of(
    Yup.object().shape({
      batchId: Yup.string(),
      childTraceabilityId: Yup.string(),
      componentCode: Yup.number(),
      componentQuantity: Yup.number(),
      quantity: Yup.number().required('Cantitate obligatorie'),

      openingDate: Yup.date().when(
        ['hasSecondaryDlc', 'batchId', '$productionDate'],
        ([hasSecondaryDlc, batchId, productionDate], schema) => {
          if (hasSecondaryDlc && batchId) {
            if (productionDate) {
              return schema
                .required('Data obligatorie')
                .test(
                  'notAfterProductionDate',
                  'Data deschiderii mai mica sau egala cu data productiei',
                  openingDate => {
                    return !dayjs(openingDate).isAfter(productionDate, 'date')
                  }
                )
            } else {
              return schema.required('Data obligatorie')
            }
          } else {
            return schema.nullable()
          }
        }
      ),

      hasSecondaryDlc: Yup.boolean()
    })
  )
})

export const toBatchFormat = (item, calculatedQuantity) => ({
  batchId: item?.id,
  componentCode: item.product.metiCode,
  componentQuantity: calculatedQuantity,
  componentName: item.batchName,
  quantity: calculatedQuantity,
  hasSecondaryDlc: item.hasSecondaryDlc,
  openingDate: null,
  dlcDays: item.dlcDays
})

export const toChargeFormat = (item, calculatedQuantity) => ({
  childTraceabilityId: item.id,
  componentCode: item.product.metiCode,
  componentQuantity: calculatedQuantity,
  componentName: item.chargeNumber,
  quantity: calculatedQuantity,
  productionDate: item.productionDate,
  hasSecondaryDlc: !!item?.product?.dlcDays,
  dlcDays: item?.product?.dlcDays
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
    title: 'Nr. zile DLC',
    field: 'dlcDays',
    align: 'left',
    type: 'string',
    width: '50px',
    render: (row: any) => row?.dlcDays || ''
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
    field: 'dlcDays',
    align: 'left',
    type: 'string',
    width: '110px',
    render: (row: any) => row?.product?.dlcDays
  }
]

export const quantityCalculation = (chargeQuantity, composedArticleQuantity, recipeQuantity) => {
  return (chargeQuantity * composedArticleQuantity) / recipeQuantity
}
