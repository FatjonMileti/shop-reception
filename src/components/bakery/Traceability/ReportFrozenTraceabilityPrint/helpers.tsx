import { formatBakeryPayloadDate } from '../../../../utils/helpers'

export const productPrintColumns = [
  {
    field: 'productionDate',
    title: 'Data productiei',
    defaultPrintSelected: true,
    render: row => formatBakeryPayloadDate(row.productionDate)
  },
  {
    field: 'product.familyName',
    title: 'Familie',
    render: row => row.product.familyName
  },
  {
    field: 'product.subfamily',
    title: 'Subfamilie',
    render: row => row.product.subfamily
  },
  {
    field: 'product.metricUnit',
    title: 'UM',
    render: row => row.product.metricUnit,
    defaultPrintSelected: true
  }
]

export const batchPrintColumns = [
  {
    field: 'product.batch.supplier.supplierName',
    title: 'Furnizor',
    render: row => row.batch.supplier.supplierName,
    defaultPrintSelected: true
  }
]
