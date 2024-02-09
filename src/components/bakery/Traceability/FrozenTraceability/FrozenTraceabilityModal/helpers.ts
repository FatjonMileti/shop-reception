import * as Yup from 'yup'
import { formatBakeryPayloadDate } from 'utils/helpers'

export const getInitialValues = (selectedProduct, selectedRows, editItem) => {
  return {
    productId: editItem?.product?.id || selectedProduct?.id || '',
    storeId: editItem?.store?.id || null,
    productionDate: editItem?.productionDate || null,
    chargeNumber: editItem?.chargeNumber || null,
    productionOperator: editItem?.productionOperator || null,
    quantity: editItem?.quantity || null,
    thermalCondition: editItem?.thermalCondition || 'UNBAKED',
    conform: editItem?.conform || true,
    nonComplianceReason: editItem?.nonComplianceReason || null,
    productDestination: editItem?.productDestination || null,
    isVerified: editItem?.verified || null,
    verifiedBy: editItem?.verifiedBy || null,
    verifiedDate: editItem?.verifiedDate || null,
    dlc: editItem?.dlc || null,
    isFrozen: editItem?.frozen || null,
    metiCode: editItem?.product?.metiCode || selectedProduct?.metiCode,
    productName: editItem?.product?.name || selectedProduct?.name,
    traceabilityFrozenList: editItem
      ? toBatchFormat(editItem?.traceabilityFrozenList, true)
      : selectedRows
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

    traceabilityFrozenList: Yup.array().of(
      Yup.object().shape({
        batchId: Yup.string(),
        quantity: Yup.number(),
        openingDate: Yup.date(),
        dlc: Yup.string()
      })
    )
  })

export const toBatchFormat = (batches, isEdit = false) => {
  console.log('debug item', batches)
  return batches.map(item => ({
    batchId: isEdit ? item.batch.batchName : item.batchName,
    quantity: isEdit ? item.batch.batchQuantity : item.batchQuantity,
    openingDate: isEdit ? formatBakeryPayloadDate(item.openingDate) : item.entryDate,
    dlc: isEdit ? item.batch.dlcDays : item.dlcDays
  }))
}

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
    width: '100px'
  },
  {
    title: 'Nr. zile DLC',
    field: 'dlcDays',
    align: 'left',
    type: 'string',
    width: '110px'
  }
]
