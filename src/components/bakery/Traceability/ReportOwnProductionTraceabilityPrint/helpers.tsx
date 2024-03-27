import { formatBakeryPayloadDate } from 'utils/helpers'
import { ThermalCondition } from '../interfaces'
import dayjs from 'dayjs'

export const productPrintColumns = [
  {
    field: 'productionDate',
    title: 'Data productiei',
    render: row => formatBakeryPayloadDate(row.productionDate),
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    title: 'Produs trasabilitate',
    field: 'product.metiCode',
    render: row => row?.product?.metiCode || '',
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    title: 'Familie',
    field: 'product.familyName',
    render: row => row?.product?.familyName,
    width: '100px'
  },
  {
    title: 'Subfamilie',
    field: 'subfamily',
    render: row => row?.product?.subfamily,
    width: '100px'
  },
  {
    title: 'Sarja',
    field: 'chargeNumber',
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    title: 'Cant. fabricata',
    field: 'quantity',
    defaultPrintSelected: true,
    width: '50px'
  },
  {
    title: 'UM',
    field: 'product.metricUnit',
    render: row => row?.product?.metricUnit,
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    title: 'DLC prod. fab.',
    field: 'dlc',
    render: row =>
      (row.product.dlcDays &&
        formatBakeryPayloadDate(dayjs(row.productionDate).add(row.product.dlcDays, 'days'))) ??
      '',
    defaultPrintSelected: true,
    width: '100px'
  }
]

export const batchPrintColumns = [
  {
    field: 'product.metiCode',
    title: 'Cod Meti reteta',
    render: row => row.product.metiCode,
    width: '100px'
  },
  {
    field: 'product.name',
    title: 'Denimire produs cu reteta',
    render: row => row.product.name,
    width: '150px'
  },
  {
    field: 'productionOperator',
    title: 'Operator productie',
    render: row => row.productionOperator,
    width: '100px'
  },
  {
    field: 'thermalCondition',
    title: 'Stare termica',
    render: row => ThermalCondition[row.thermalCondition] ?? '',
    width: '50px'
  },
  {
    field: 'conform',
    title: 'Conform',
    render: row => (row.conform ? 'Da' : 'Nu'),
    width: '50px'
  },
  {
    field: 'nonComplianceReason',
    title: 'Motiv neconformitate',
    render: row => row.nonComplianceReason,
    width: '100px'
  },
  {
    field: 'productDestination',
    title: 'Destinatia prod. neconform',
    render: row => row.productDestination,
    width: '100px'
  },
  {
    field: 'createdBy',
    title: 'Operator trasabilitate',
    render: row => row.createdBy,
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    field: 'createdDate',
    title: 'Data introducere',
    render: row => formatBakeryPayloadDate(row.createdDate),
    width: '100px'
  },
  {
    field: 'verified',
    title: 'Verificare de catre validator trasabilitate',
    render: row => (row.verified ? 'Da' : 'Nu'),
    width: '100px'
  },
  {
    field: 'verifiedBy',
    title: 'Validator trasabilitate',
    render: row => row.verifiedBy,
    width: '100px'
  },
  {
    field: 'verifiedDate',
    title: 'Data verificare trasabilitate',
    render: row => formatBakeryPayloadDate(row.verifiedDate),
    width: '100px'
  },
  {
    field: 'modifiedBy',
    title: 'Ultima modificare',
    render: row => row.modifiedBy,
    width: '100px'
  },
  {
    field: 'modifiedDate',
    title: 'Data ultimei verificari',
    render: row => formatBakeryPayloadDate(row.modifiedDate),
    width: '100px'
  }
]

export const chargePrintColumns = [
  {
    field: 'componentCode',
    title: 'Articol compozant din reteta',
    render: row => row.componentCode,
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    field: 'componentName',
    title: 'MP/baze/ambalaje',
    render: row => row.componentName,
    width: '100px'
  },
  {
    field: 'componentQuantity',
    title: 'Cant. articol compozant din reteta',
    render: row => row.componentQuantity,
    width: '50px'
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
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    field: 'quantity',
    title: 'Cant. MP /baze /ambalaje',
    render: row => row.quantity,
    width: '50px'
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
      ),
    width: '100px'
  },
  {
    field: 'batch.supplier.supplierName',
    title: 'Furnizor',
    render: row => row?.batch?.supplier?.supplierName || '',
    defaultPrintSelected: true,
    width: '100px'
  },
  {
    field: 'expireDate',
    title: 'DLC MP /  baze',
    render: row =>
      formatBakeryPayloadDate(
        row.batch ? row.batch.expireDate : row.childTraceability ? row.childTraceability.dlc : ''
      ),
    defaultPrintSelected: true,
    width: '80px'
  },
  {
    field: 'dlc',
    title: 'DLC sec MP / baze',
    render: row => formatBakeryPayloadDate(row.dlc),
    defaultPrintSelected: true,
    width: '80px'
  },
  {
    field: 'openingDate',
    title: 'Data deschidere lot',
    render: row => formatBakeryPayloadDate(row.openingDate),
    width: '80px'
  }
]
