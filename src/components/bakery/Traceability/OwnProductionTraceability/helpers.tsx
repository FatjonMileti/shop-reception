import { formatBakeryPayloadDate } from 'utils/helpers'
import { BodyItem } from '../ProductManagementTraceability/AccordionTable'
import { IconCell } from 'components/core-ui/IconCell'
import { thermalContiotionOptions } from '../interfaces'

export const columns: any[] = [
  {
    title: 'Articol compozant din reteta',
    field: 'componentCode',
    // width: '100px',
    align: 'left'
  },
  {
    title: 'MP/ baze/ ambalaje',
    field: 'componentName',
    // width: '120px',
    align: 'left'
  },
  {
    title: 'Cant. articol compozant din reteta',
    field: 'componentQuantity',
    // width: '100px',
    align: 'left',
    render: row => row.componentQuantity?.toFixed(2)
  },
  {
    title: 'Lot MP/ baze/ ambalaje',
    field: '',
    render: row => row?.childTraceability?.chargeNumber || row?.batchName || '',
    // width: '100px',
    align: 'left'
  },
  {
    title: 'Cant. MP/ baze/ ambalaje',
    field: 'quantity',
    // width: '100px',
    align: 'left'
  },
  {
    title: 'Data intrare lot/Data productie sarja',
    field: 'productionDate',
    render: row =>
      (row?.childTraceability?.productionDate &&
        formatBakeryPayloadDate(row?.childTraceability?.productionDate)) ||
      (row?.productionDate && formatBakeryPayloadDate(row?.productionDate)) ||
      '',
    // width: '100px',
    align: 'left'
  },
  {
    title: 'Furnizor',
    field: 'storeName',
    // width: '100px',
    align: 'left'
  },
  {
    title: 'DLC MP / baze',
    field: 'dlc',
    // width: '100px',
    align: 'left'
  },
  {
    title: 'Data deschidere lot',
    field: 'openingDate',
    // width: '100px',
    align: 'left'
  }
]

export const toTableRowItems = (items: any[]) => {
  return items.map(item => ({
    id: item?.id,
    componentCode: item.componentCode || '',
    componentName: item.componentName || '',
    componentQuantity: item.componentQuantity || '',

    batchName: item.batch?.batchName || '',
    batchQuantity: item.batch?.batchQuantity || '',
    quantity: item.quantity || '',
    productionDate: formatBakeryPayloadDate(item.batch?.entryDate) || '',

    storeName: item?.batch?.supplier?.supplierName || '',
    dlc: formatBakeryPayloadDate(item.dlc) || '',
    openingDate: formatBakeryPayloadDate(item.openingDate) || '',

    childTraceability: item.childTraceability
  }))
}

export const infoColumns: any[] = [
  {
    title: 'Operator productie',
    field: 'productionOperator'
  },
  {
    title: 'Stare termica',
    field: 'thermalCondition',
    render: row => (
      <BodyItem
        name="Stare termica"
        value={
          thermalContiotionOptions.find(thC => thC.value === row.thermalCondition)?.label || ''
        }
      />
    )
  },
  {
    title: 'Conform',
    field: 'conform',
    render: row => (
      <BodyItem name="Conform" value={<IconCell value={row.conform ? 'active' : 'inactive'} />} />
    )
  },
  {
    title: 'Motiv neconformitate',
    field: 'nonComplianceReason'
  },
  {
    title: 'Destinatia prod. neconform',
    field: 'productDestination'
  },
  {
    title: 'Operator trasabilitate',
    field: 'createdBy'
  },
  {
    title: 'Data introducere',
    field: 'createdDate',
    render: row => <BodyItem name="Data introducere" value={formatBakeryPayloadDate(row.createdDate)} />
  },
  {
    title: 'Verificare de catre validator trasabilitate',
    field: 'verified'
  },
  {
    title: 'Validator trasabilitate',
    field: 'verifiedBy'
  },
  {
    title: 'Data verificare trasabilitate',
    field: 'verifiedDate'
  },
  {
    title: 'Ultima modificare',
    field: 'modifiedBy'
  },
  {
    title: 'Data ultimei modificari',
    field: 'modifiedDate'
  },
  {
    title: 'Sarja',
    field: 'chargeNumber'
  },
  {
    title: 'Data productiei',
    field: 'productionDate',
    render: row => <BodyItem name="Data productiei" value={formatBakeryPayloadDate(row.productionDate)} />
  },
  {
    title: 'DLC Prod. Fab.',
    field: 'dlc',
    render: row => <BodyItem name="DLC Prod. Fab." value={formatBakeryPayloadDate(row.dlc)} />
  }
]
