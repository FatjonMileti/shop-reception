import { formatBakeryPayloadDate } from 'utils/helpers'
import { BodyItem } from '../ProductManagementTraceability/AccordionTable'
import { IconCell } from 'components/core-ui/IconCell'
import { thermalContiotionOptions } from '../interfaces'
import dayjs from 'dayjs'

export const columns: any[] = [
  {
    title: 'Articol compozant din reteta',
    field: 'componentCode',
    align: 'left'
  },
  {
    title: 'MP/ baze/ ambalaje',
    field: 'componentName',
    align: 'left'
  },
  {
    title: 'Cant. articol compozant din reteta',
    field: 'componentQuantity',
    align: 'left',
    render: row => row.componentQuantity?.toFixed(2),
    collapsible: 'true'
  },
  {
    title: 'Lot MP/ baze/ ambalaje',
    field: '',
    render: row => row?.childTraceability?.chargeNumber || row?.batchName || '',
    align: 'left',
    collapsible: 'true'
  },
  {
    title: 'Cant. MP/ baze/ ambalaje',
    field: 'quantity',
    align: 'left',
    collapsible: 'true'
  },
  {
    title: 'Data intrare lot/Data productie sarja',
    field: 'productionDate',
    render: row =>
      (row?.childTraceability && formatBakeryPayloadDate(row?.childTraceability?.productionDate)) ||
      (row?.openingDate && formatBakeryPayloadDate(row?.openingDate)) ||
      '',
    align: 'left',
    collapsible: 'true'
  },
  {
    title: 'Furnizor',
    field: 'storeName',
    align: 'left',
    collapsible: 'true'
  },
  {
    title: 'DLC MP / baze',
    align: 'left',
    render: row => (row.batch?.hasExpireDate ? formatBakeryPayloadDate(row.batch?.expireDate) : ''),
    collapsible: 'true'
  },
  {
    title: 'DLC sec MP/ baze',
    align: 'left',
    render: row =>
      formatBakeryPayloadDate(
        (row?.childTraceability?.productionDate &&
          row.childTraceability?.product?.dlcDays &&
          dayjs(row.childTraceability?.productionDate).add(
            row.childTraceability?.product?.dlcDays,
            'days'
          )) ||
          (row.batch?.hasSecondaryDlc && dayjs(row.openingDate).add(row.batch?.dlcDays, 'days'))
      ) || '',
    collapsible: 'true'
  },

  {
    title: 'Data deschidere lot',
    field: 'openingDate',
    align: 'left',
    render: row => (row?.openingDate && formatBakeryPayloadDate(row?.openingDate)) || '',
    collapsible: 'true'
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

    batch: item.batch || {},

    storeName: item?.batch?.supplier?.supplierName || '',
    dlc: formatBakeryPayloadDate(item.dlc) || '',
    openingDate: item.openingDate || '',

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
          thermalContiotionOptions.find(thC => thC.value === row?.thermalCondition)?.label || ''
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
    render: row => (
      <BodyItem name="Data introducere" value={formatBakeryPayloadDate(row.createdDate)} />
    )
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
    field: 'modifiedDate',
    render: row => (
      <BodyItem name="Data ultimei modificari" value={formatBakeryPayloadDate(row.modifiedDate)} />
    )
  },
  {
    title: 'Sarja',
    field: 'chargeNumber'
  },
  {
    title: 'Data productiei',
    field: 'productionDate',
    render: row => (
      <BodyItem name="Data productiei" value={formatBakeryPayloadDate(row.productionDate)} />
    )
  },
  {
    title: 'DLC Prod. Fab.',
    field: 'dlc',
    render: row => (
      <BodyItem
        name="DLC Prod. Fab."
        value={
          row.product?.dlcDays
            ? formatBakeryPayloadDate(dayjs(row.productionDate).add(row.product?.dlcDays, 'days'))
            : ''
        }
      />
    )
  },
  { title: 'Cant.fab', field: 'quantity' }
]
