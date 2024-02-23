import * as Yup from 'yup'
import { formatBakeryPayloadDate } from 'utils/helpers'
import dayjs from 'dayjs'

export const getInitialValues = (selectedProduct, selectedRows, editItem) => {
  const batchItems = []
  const childItems = []

  if (editItem?.traceabilityProductionList) {
    editItem.traceabilityProductionList?.forEach(item => {
      if (item.batch) {
        batchItems.push(item.batch)
      } else if (item.childTraceability) {
        childItems.push(item.childTraceability)
      }
    })
  }

  const formattedProductionList = [...toBatchFormat(batchItems), ...toChargeFormat(childItems)]

  return {
    productId: editItem?.product?.id || selectedProduct?.id || '',
    productionDate: editItem?.productionDate || dayjs(),
    chargeNumber: editItem?.chargeNumber || null,
    productionOperator: editItem?.productionOperator || null,
    quantity: editItem?.quantity || null,
    thermalCondition: editItem?.thermalCondition || null,
    dlc: editItem?.dlc || null,

    conform: editItem?.conform || true,
    nonComplianceReason: editItem?.nonComplianceReason || null,
    productDestination: editItem?.productDestination || null,

    metiCode: editItem?.product?.metiCode || selectedProduct?.metiCode,
    productName: editItem?.product?.name || selectedProduct?.name,
    traceabilityProductionList: editItem ? formattedProductionList : selectedRows
  }
}

export const getValidationSchema = () =>
  Yup.object().shape({
    productionDate: Yup.date().required('Campul data productie trebuie completat'),
    chargeNumber: Yup.string().required('Campul sarja trebuie completat.'),
    productionOperator: Yup.string().required('Campul operator productie trebuie completat.'),
    quantity: Yup.string().required('Campul cantitate trebuie completat'),
    thermalCondition: Yup.string().required('Campul stare termica trebuie completat.'),
    conform: Yup.boolean(),

    traceabilityProductionList: Yup.array().of(
      Yup.object().shape({
        batchId: Yup.string(),
        childTraceabilityId: Yup.string(),
        componentCode: Yup.number(),
        componentQuantity: Yup.number(),
        quantity: Yup.number(),
        openingDate: Yup.date(),
        dlc: Yup.string()
      })
    )
  })

export const toBatchFormat = (batches, isEdit = false) => {
  return typeof batches === 'undefined'
    ? {
        batchId: '',
        componentCode: '',
        componentQuantity: '',
        quantity: 0,
        openingDate: dayjs(),
        dlc: 5
      }
    : batches?.map(item => ({
        batchId: isEdit ? item.batch?.id : item?.id,
        componentCode: isEdit ? item?.componentCode : item.product.metiCode,
        componentQuantity: isEdit ? item.batch?.componentQuantity : item.batchQuantity,
        componentName: isEdit ? item.batch?.componentName : item.batchName,

        quantity: isEdit ? item.batch?.batchQuantity : item.batchQuantity,
        openingDate: isEdit ? formatBakeryPayloadDate(item.openingDate) : item.entryDate,
        dlc: isEdit ? item?.batch?.dlcDays : item?.dlcDays
      }))
}

export const toChargeFormat = (charges, isEdit = false) => {
  return typeof charges === 'undefined'
    ? {
        childTraceabilityId: '',
        componentCode: '',
        componentQuantity: '',
        quantity: 0,
        openingDate: dayjs(),
        dlc: 5
      }
    : charges?.map(item => ({
        childTraceabilityId: isEdit ? item.childTraceabilityId.id : item.id,
        componentCode: isEdit ? item.componentCode : item.product.metiCode,
        componentQuantity: isEdit ? item.batch.componentQuantity : item.quantity,
        componentName: isEdit ? item.batch.componentName : item.chargeNumber,

        quantity: isEdit ? item.batch.batchQuantity : item.quantity,
        openingDate: isEdit ? formatBakeryPayloadDate(item.openingDate) : dayjs(),
        dlc: isEdit ? item?.batch?.dlcDays : item.dlc
      }))
}

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
    width: '80px'
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
    width: '50px'
  },
  {
    title: 'DLC Secundar',
    field: 'dlcDays',
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
    width: '110px'
  }
]
