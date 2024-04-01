import { formatBakeryPayloadDate } from '../../../../utils/helpers'

export const batchPrintColumns = [
  {
    field: 'product.metiCode',
    title: 'Cod Meti reteta',
    render: row => row.product.metiCode
  },
  {
    field: 'product.name',
    title: 'Denimire produs cu reteta',
    render: row => row.product.name
  },
  {
    field: 'productionOperator',
    title: 'Operator productie',
    render: row => row.productionOperator
  },
  {
    field: 'thermalCondition',
    title: 'Stare termica',
    render: row => row.thermalCondition
  },
  {
    field: 'conform',
    title: 'Conform',
    render: row => (row.conform ? 'Da' : 'Nu')
  },
  {
    field: 'nonComplianceReason',
    title: 'Motiv neconformitate',
    render: row => row.nonComplianceReason
  },
  {
    field: 'productDestination',
    title: 'Destinatia prod. neconform',
    render: row => row.productDestination
  },
  {
    field: 'createdBy',
    title: 'Operator trasabilitate',
    render: row => row.createdBy || '',
    defaultPrintSelected: true
  },
  {
    field: 'createdDate',
    title: 'Data introducere',
    render: row => formatBakeryPayloadDate(row.createdDate)
  },
  {
    field: 'verified',
    title: 'Verificare de catre validator trasabilitate',
    render: row => (row.verified ? 'Da' : 'Nu')
  },
  {
    field: 'verifiedBy',
    title: 'Validator trasabilitate',
    render: row => row.verifiedBy
  },
  {
    field: 'verifiedDate',
    title: 'Data verificare trasabilitate',
    render: row => formatBakeryPayloadDate(row.verifiedDate)
  },
  {
    field: 'modifiedBy',
    title: 'Ultima modificare',
    render: row => row.modifiedBy
  },
  {
    field: 'modifiedDate',
    title: 'Data ultimei verificari',
    render: row => formatBakeryPayloadDate(row.modifiedDate)
  }
]

export const chargePrintColumns = [
  {
    field: 'componentCode',
    title: 'Articol compozant din reteta',
    render: row => row.componentCode
  },
  {
    field: 'componentName',
    title: 'MP/baze/ambalaje',
    render: row => row.componentName,
    defaultPrintSelected: true
  },
  {
    field: 'componentQuantity',
    title: 'Cant. articol compozant din reteta',
    render: row => row.componentQuantity
  },
  {
    field: 'chargeNumber',
    title: 'Lot MP /baze /amb',
    render: row =>
      row.batch
        ? row.batch.batchName
        : row.childTraceability
        ? row.childTraceability.chargeNumber
        : '',
    defaultPrintSelected: true
  },
  {
    field: 'quantity',
    title: 'Cant. MP /baze /ambalaje',
    render: row => row.quantity
  },
  {
    field: 'entryDate',
    title: 'Data intrare lot / Data productie sarja',
    render: row =>
      formatBakeryPayloadDate(
        row.batch
          ? row.batch.entryDate
          : row.childTraceability
          ? row.childTraceability.productionDate
          : ''
      )
  },
  {
    field: 'batch.supplier.supplierName',
    title: 'Furnizor',
    render: row => row.batch.supplier.supplierName || '',
    defaultPrintSelected: true
  },
  {
    field: 'expireDate',
    title: 'DLC MP /  baze',
    render: row =>
      formatBakeryPayloadDate(
        row.batch ? row.batch.expireDate : row.childTraceability ? row.childTraceability.dlc : ''
      ),
    defaultPrintSelected: true
  },
  {
    field: 'dlc',
    title: 'DLC sec MP / baze',
    render: row => formatBakeryPayloadDate(row.dlc),
    defaultPrintSelected: true
  },
  {
    field: 'openingDate',
    title: 'Data deschidere lot',
    render: row => formatBakeryPayloadDate(row.openingDate)
  }
]
