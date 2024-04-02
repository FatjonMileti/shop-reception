import * as Yup from 'yup'
import { formatBakeryPayloadDate, formatPayloadDate } from 'utils/helpers'
import dayjs from 'dayjs'

export const getInitialValues = editItem => {
  const traceabilityProductionList =
    editItem?.traceabilityProductionList?.reduce((acc, item) => {
      if (item.batch) acc.push(toBatchFormatEdit(item))
      else if (item.childTraceability) acc.push(toChargeFormatEdit(item))
      else acc.push(toOtherFormatEdit(item))
      return acc
    }, []) || []

  return {
    productId: editItem?.product?.id || '',
    productionDate: editItem?.productionDate || dayjs(),
    chargeNumber: editItem?.chargeNumber || null,
    productionOperator: editItem?.productionOperator || null,
    quantity: editItem?.quantity || null,
    thermalCondition: editItem?.thermalCondition || null,
    dlc: editItem?.dlc || null,

    conform: editItem?.conform || true,
    nonComplianceReason: editItem?.nonComplianceReason || null,
    productDestination: editItem?.productDestination || null,

    metiCode: editItem?.product?.metiCode,
    productName: editItem?.product?.name,
    traceabilityProductionList,
    product: editItem?.product
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
  product: Yup.object().required(),

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
                  'notBeforeProductionDate',
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

export const toBatchFormatEdit = item => ({
  batchId: item.batch?.id,
  componentCode: item?.componentCode,
  componentQuantity: item?.componentQuantity,
  componentName: item?.componentName,

  quantity: item.quantity,
  hasSecondaryDlc: item.batch?.hasSecondaryDlc,
  openingDate: formatPayloadDate(item.openingDate),
  dlcDays: item.batch?.dlcDays
})

export const toChargeFormatEdit = item => ({
  childTraceabilityId: item.childTraceability?.id,
  componentCode: item?.componentCode,
  componentQuantity: item.componentQuantity,
  componentName: item?.componentName,
  quantity: item.quantity,
  productionDate: formatPayloadDate(item?.childTraceability?.productionDate),
  dlcDays: item?.childTraceability?.product?.dlcDays
})

export const toOtherFormatEdit = ({
  componentCode,
  componentName,
  componentQuantity,
  quantity
}) => ({
  componentCode,
  componentName,
  componentQuantity,
  quantity
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
    width: '50px'
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
    render: (row: any) => row.dlcDays || ''
  }
]

export const quantityCalculation = (chargeQuantity, composedArticleQuantity, recipeQuantity) => {
  return (chargeQuantity * composedArticleQuantity) / recipeQuantity
}
