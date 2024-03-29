import { formatBakeryPayloadDate } from '../../../../utils/helpers'
import { ThermalCondition } from '../interfaces'

export const productPrintColumns = [
  {
    field: 'productionDate',
    title: 'Data productiei',
    render: row => formatBakeryPayloadDate(row.productionDate),
    defaultPrintSelected: true
  },
  {
    title: 'Cod METI',
    field: 'product.metiCode',
    render: row => row.product.metiCode,
  },
  {
    title: 'Cod PLU',
    field: 'product.pluCode',
    render: row => row.product.pluCode
  },
  {
    title: 'Denumire Produs finit & Ambalaje',
    field: 'product.name',
    render: row => row.product.name,
    defaultPrintSelected: true
  },
  {
    field: 'product.familyName',
    title: 'Familie produs',
    render: row => row.product.familyName
  },
  {
    field: 'product.subfamily',
    title: 'Subfamilie produs',
    render: row => row.product.subfamily
  },
  {
    title: 'Sarja',
    field: 'chargeNumber',
    defaultPrintSelected: true,
    width: '150px'
  },
  {
    title: 'Cant. Sarja',
    field: 'quantity',
    defaultPrintSelected: true
  },
  {
    title: 'DLC prod. finit',
    field: 'dlc',
    render: row => formatBakeryPayloadDate(row.dlc),
    defaultPrintSelected: true
  },
  {
    title: 'UM',
    field: 'product.metricUnit',
    render: row => row.product.metricUnit,
    defaultPrintSelected: true,
  },
  {
    title: 'Stare termica',
    field: 'thermalCondition',
    render: row => ThermalCondition[row.thermalCondition] ?? '',
  },
  {
    title: 'Conform',
    field: 'conform'
  },
  {
    title: 'Motiv neconformitate',
    field: 'nonComplianceReason'
  },
  {
    title: 'Destinatia produsului neconform',
    field: 'productDestination'
  },
  {
    title: 'Operator productie',
    field: 'productionOperator'
  },
  {
    title: 'Verificare de catre validator trasabilitate',
    field: 'isVerified'
  },
  {
    title: 'Validator trasabilitate',
    field: 'verifiedBy'
  },
  {
    title: 'Data verificare trasabilitate',
    field: 'verifiedDate',
    render: row => formatBakeryPayloadDate(row.verifiedDate)
  }
]

export const batchPrintColumns = [
  {
    field: 'batch.batchName',
    title: 'Lot MP/amb.',
    render: row => row.batch?.batchName,
    defaultPrintSelected: true
  },
  {
    field: 'batch.entryDate',
    title: 'Data intrare MP',
    render: row => formatBakeryPayloadDate(row.batch?.entryDate),
    width: '100px'
  },
  {
    field: 'batch.supplier.supplierName',
    title: 'Furnizor MP',
    render: row => row.batch?.supplier?.supplierName,
    defaultPrintSelected: true
  },
  {
    field: 'quantity',
    title: 'Cant. fab./lot',
    render: row => row.quantity,
    defaultPrintSelected: true
  },
  {
    field: 'dlc',
    title: 'DLC sec. MP',
    render: row => formatBakeryPayloadDate(row.dlc)
  },
  {
    field: 'dlc.batch',
    title: 'DLC MP',
    render: row => formatBakeryPayloadDate(row.batch?.expireDate),
    defaultPrintSelected: true
  },
  {
    field: 'dlc.createdBy',
    title: 'Operator trasab.',
    render: row => row.createdBy,
    defaultPrintSelected: true
  },
  {
    field: 'batch.entryDate',
    title: 'Data introducere Trasabilitate',
    render: row => (row.batch?.entryDate && formatBakeryPayloadDate(row.batch?.entryDate)) ?? '',
    width: '100px'
  },
  {
    field: 'modifiedBy',
    title: 'Ultima modificare',
    render: row => row.modifiedBy
  },
  {
    field: 'modifiedDate',
    title: 'Data ultimei modificari',
    render: row => formatBakeryPayloadDate(row.modifiedDate),
    width: '100px'
  }
]
