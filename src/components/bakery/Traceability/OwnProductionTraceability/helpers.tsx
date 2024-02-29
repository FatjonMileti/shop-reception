import { formatBakeryPayloadDate } from 'utils/helpers'
import { BodyItem } from '../ProductManagementTraceability/AccordionTable'
import { IconCell } from 'components/core-ui/IconCell'

export const columns: any[] = [
  {
    title: 'Articol compozant din reteta',
    field: 'componentCode',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'MP/ baze/ ambalaje',
    field: 'componentName',
    // width: '120px',
    align: 'left',
  },
  {
    title: 'Cant. articol compozant din reteta',
    field: 'componentQuantity',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'Lot MP/ baze/ ambalaje',
    field: 'batchName',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'Cant. MP/ baze/ ambalaje',
    field: 'batchQuantity',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'Data intrare lot/Data productie sarja',
    field: 'productionDate',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'Furnizor',
    field: 'storeName',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'DLC MP / baze',
    field: 'dlc',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'DLC sec MP / baze',
    field: 'dlcSec',
    // width: '100px',
    align: 'left',
  },
  {
    title: 'Data deschidere lot',
    field: 'openingDate',
    // width: '100px',
    align: 'left',
  }
]

export const toTableRowItems = (items: any[], parent: any) => {
  return items.map(item => ({
    id: item?.id,
    componentCode: item.componentCode || '',
    componentName: item.componentName || '',
    componentQuantity: item.componentQuantity || '',

    batchName: item.batch?.batchName || '',
    batchQuantity: item.batch?.batchQuantity || '',
    productionDate: formatBakeryPayloadDate(item.batch?.entryDate) || '',

    storeName: parent.store.name || '',
    dlc: formatBakeryPayloadDate(item.dlc) || '',
    dlcSec: formatBakeryPayloadDate(item.dlc) || '',
    openingDate: formatBakeryPayloadDate(item.openingDate) || ''
  }))
}

export const infoColumns: any[] = [
  {
    title: 'Operator productie',
    field: 'createdBy'
  },
  {
    title: 'Stare termica',
    field: 'thermalCondition'
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
    field: 'createdDate'
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
    field: 'productionDate'
  },
  {
    title: 'DLC Prod. Fab.',
    field: 'dlc'
  }
]
