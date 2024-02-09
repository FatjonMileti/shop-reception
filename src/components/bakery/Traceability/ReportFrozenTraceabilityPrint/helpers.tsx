import { formatBakeryPayloadDate } from '../../../../utils/helpers'

export const productPrintColumns = [
  {
    field: 'productionDate',
    title: 'Data productiei',
    defaultPrintSelected: true,
    render: row => formatBakeryPayloadDate(row.productionDate)
  },
    {
    title: 'Produs Trasabilitate',
    field: 'product.name',
    defaultPrintSelected: true,
    render: row => row.product.name
  },
  {
    title: 'Denumire Produs fabricat',
    field: 'product.name',
    defaultPrintSelected: true,
    render: row => row.product.name
  },
  {
    title: 'Sarja',
    field: 'chargeNumber',
    defaultPrintSelected: true
  },
  {
    title: 'Cant. Fab.',
    field: 'quantity',
    defaultPrintSelected: true
  },
  {
    title: 'DLC prod. Fab.',
    field: 'productionDate',
    defaultPrintSelected: true
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
