import { formatBakeryPayloadDate } from 'utils/helpers'
import { BodyItem } from '../ProductManagementTraceability/AccordionTable'

export const columns: any[] = [
  {
    title: 'Data intrare lot',
    field: 'entryDate'
  },
  {
    title: 'Operator productie',
    field: 'productionOperator'
  },
  {
    title: 'Operator trasabilitate',
    field: '-'
  },
  {
    title: 'Ultima modificare',
    field: '-'
  },
  {
    title: 'Furnizor',
    field: 'supplierName',
    render: row => <BodyItem name="Furnizor" value={row.batch.supplier.supplierName} />
  },
  {
    title: 'Stare termica',
    field: 'thermalCondition'
  },
  {
    title: 'Data introducere',
    field: 'openingDate',
    render: row => (
      <BodyItem name="Data introducere" value={formatBakeryPayloadDate(row.openingDate)} />
    )
  },
  {
    title: 'Data ultimei modificari',
    field: 'modifiedDate',
    render: row => (
      <BodyItem
        name="Data ultimei modificari"
        value={formatBakeryPayloadDate(row.batch.modifiedDate)}
      />
    )
  },
  {
    title: 'DLC sec. lot',
    field: '-'
  },
  {
    title: 'Conform',
    field: 'conform'
  },
  {
    title: 'Verificare de catre validator trasabilitate',
    field: 'verified'
  },
  {
    title: 'DLC MP',
    field: 'dlc',
    render: row => <BodyItem name="DLC MP" value={formatBakeryPayloadDate(row.dlc)} />
  },
  {
    title: 'Motiv neconformitate',
    field: 'closeReason'
  },
  {
    title: 'Validator trasabilitate',
    field: 'verifiedBy'
  },
  {
    title: 'Destinatia prod. neconform',
    field: 'productDestination'
  },
  {
    title: 'Data verificare trasabilitate',
    field: 'verifiedDate'
  }
]
