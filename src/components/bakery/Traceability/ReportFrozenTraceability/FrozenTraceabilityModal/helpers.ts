import { formatBakeryPayloadDate } from 'utils/helpers'

export const getInitialValues = (selectedProduct, selectedRows, editItem) => ({
  productId: editItem?.product?.id || selectedProduct?.id || '',
  storeId: editItem?.store?.id || null,
  productionDate: formatBakeryPayloadDate(editItem?.productionDate) || null,
  chargeNumber: editItem?.chargeNumber || null,
  productionOperator: editItem?.productionOperator || null,
  quantity: editItem?.quantity || null,
  thermalCondition: 'UNBAKED',
  conform: editItem?.conform || null,
  nonComplianceReason: editItem?.nonComplianceReason || null,
  productDestination: editItem?.productDestination || null,
  isVerified: editItem?.verified || null,
  verifiedBy: null,
  verifiedDate: null,
  dlc: editItem?.dlc || null,
  isFrozen: editItem?.frozen || null,
  traceabilityFrozenList: editItem?.traceabilityFrozenList || selectedRows,
  metiCode: editItem?.product?.metiCode || null,
  productName: editItem?.product?.name || null
})

export const toBatchFormat = batches => {
  return batches.map(batch => ({
    batchId: batch.id,
    quantity: batch.batchQuantity,
    openingDate: batch.entryDate,
    dlc: batch.dlcDays
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
